import { remove, render, RenderPosition } from '../framework/render.js';
import UiBlocker from '../framework/ui-blocker/ui-blocker.js';
import SortView from '../view/sort-view.js';
import ListPointsView from '../view/list-points-view.js';
import MessageView from '../view/message-view.js';
import LoadingView from '../view/loading-view.js';
import PointPresenter from './point-presenter.js';
import NewEventPresenter from './new-event-presenter.js';
import { sortPointByPrice, sortPointByDay, sortPointByDuration } from '../utils/sort.js';
import { filter } from '../utils/filter.js';
import { SortType, UserAction, UpdateType, FilterType } from '../const.js';
import RoutePresenter from './route-presenter.js';

const TimeLimit = {
  LOWER_LIMIT: 350,
  UPPER_LIMIT: 1000,
};

export default class TripPresenter {
  #tripContainer = null;
  #pointModel = null;
  #offerModel = null;
  #destinationModel = null;
  #filterModel = null;
  #routeContainer = null;
  #sortContainer = null;

  #listPointsComponent = new ListPointsView();
  #loadingComponent = null;
  #sortComponent = null;
  #messageComponent = null;

  #pointPresenters = new Map();
  #newEventPresenter = null;
  #routePresenter = null;
  #currentSortType = SortType.DAY;
  #filterType = FilterType.EVERYTHING;
  #isLoading = true;
  #isError = false;
  #uiBlocker = new UiBlocker({
    lowerLimit: TimeLimit.LOWER_LIMIT,
    upperLimit: TimeLimit.UPPER_LIMIT
  });

  constructor({ tripContainer, pointModel, offerModel, destinationModel, tripMainElement, tripEventsElement, filterModel, onNewEventDestroy }) {
    this.#tripContainer = tripContainer;
    this.#pointModel = pointModel;
    this.#offerModel = offerModel;
    this.#destinationModel = destinationModel;
    this.#routeContainer = tripMainElement;
    this.#sortContainer = tripEventsElement;
    this.#filterModel = filterModel;

    this.#newEventPresenter = new NewEventPresenter({
      pointListContainer: this.#listPointsComponent.element,
      destinationModel: this.#destinationModel,
      offerModel: this.#offerModel,
      onDataChange: this.#handleViewAction,
      onDestroy: onNewEventDestroy,
    });

    this.#pointModel.addObserver(this.#handelModeEvent);
    this.#filterModel.addObserver(this.#handelModeEvent);
  }

  get points() {
    this.#filterType = this.#filterModel.filter;
    const points = this.#pointModel.points;
    const filteredPoint = filter[this.#filterType](points);

    switch (this.#currentSortType) {
      case SortType.DAY:
        return filteredPoint.sort(sortPointByDay);
      case SortType.TIME:
        return filteredPoint.sort(sortPointByDuration);
      case SortType.PRICE:
        return filteredPoint.sort(sortPointByPrice);
    }
    return filteredPoint.sort(sortPointByDay);
  }

  init() {
    this.#renderPage();
  }

  createPoint() {
    this.#filterModel.setFilter(UpdateType.MAJOR, FilterType.EVERYTHING);
    this.#newEventPresenter.init();
  }

  messageUpdate(isOpen) {
    if (this.#messageComponent) {
      remove(this.#messageComponent);
    }
    if(!this.#isError && isOpen) {
      if(this.points.length === 0) {
        this.#renderMessage();
      }
    }
  }

  /**
   * Рендеринг маршрута.
   */
  #renderRoute = () => {
    this.#routePresenter = new RoutePresenter({
      routeContainer: this.#routeContainer,
      pointModel: this.#pointModel,
      offerModel: this.#offerModel,
      destinationModel: this.#destinationModel,
    });
    this.#routePresenter.init();
  };

  /**
   * Рендеринг сортировки.
   */
  #renderSort = () => {
    this.#sortComponent = new SortView({
      onSortTypeChange: this.#handleSortTypeChange,
      currentType: this.#currentSortType
    });
    render(this.#sortComponent, this.#sortContainer, RenderPosition.AFTERBEGIN);
  };

  #clearTrip = ({ resetSortType = false } = {}) => {
    this.#newEventPresenter.destroy();
    this.#pointPresenters.forEach((presenter) => presenter.removePoint());
    this.#pointPresenters.clear();

    if (this.#sortComponent) {
      remove(this.#sortComponent);
    }
    if (this.#loadingComponent) {
      remove(this.#loadingComponent);
    }

    if (this.#messageComponent) {
      remove(this.#messageComponent);
    }

    if (resetSortType) {
      this.#currentSortType = SortType.DAY;
    }
  };

  /**
   * Рендеринг отдельной точки поездки.
   * @param {Object} point - Данные точки.
   */
  #renderPoint = (point) => {
    const pointPresenter = new PointPresenter({
      listPointsContainer: this.#listPointsComponent.element,
      allOffers: this.#offerModel.offers,
      allDestinations: this.#destinationModel.destinations,
      onModeChange: this.#handleModeChange,
      onDataChange: this.#handleViewAction
    });
    pointPresenter.init(point);
    this.#pointPresenters.set(point.id, pointPresenter);
  };

  #renderListPoint = () => {
    this.points.forEach((point) => {
      this.#renderPoint(point);
    });
  };

  #renderMessage() {
    this.#messageComponent = new MessageView({
      filterType: this.#filterType
    });
    render(this.#messageComponent, this.#tripContainer);
  }

  #renderLoading({isError}) {
    this.#loadingComponent = new LoadingView(isError);
    render(this.#loadingComponent, this.#tripContainer);
  }

  /**
   * Рендеринг всего списка поездок.
   */
  #renderTrip = () => {
    if (this.#isLoading) {
      this.#renderLoading({ isError: false});
      return;
    }

    if (this.#isError) {
      this.#renderLoading({ isError: true});
      return;
    }

    render(this.#listPointsComponent, this.#tripContainer);

    if (!this.points.length) {
      this.#renderMessage();
      this.#routePresenter.destroy();
      return;
    }

    this.#renderSort();
    this.#renderListPoint();
  };

  /**
   * Рендеринг всей страницы.
   */
  #renderPage = () => {
    this.#renderRoute();
    this.#renderTrip();
  };

  #handleViewAction = async (actionType, updateType, update) => {
    this.#uiBlocker.block();
    switch (actionType) {
      case UserAction.UPDATE_POIN:
        this.#pointPresenters.get(update.id).setSaving();
        try {
          await this.#pointModel.updatePoint(updateType, update);
        } catch(err) {
          this.#pointPresenters.get(update.id).setAborting();
        }
        break;
      case UserAction.ADD_POINT:
        this.#newEventPresenter.setSaving();
        try {
          await this.#pointModel.addPoint(updateType, update);
        } catch(err) {
          this.#newEventPresenter.setAborting();
        }
        break;
      case UserAction.DELETE_POINT:
        this.#pointPresenters.get(update.id).setDeleting();
        try {
          await this.#pointModel.deletePoint(updateType, update);
        } catch(err) {
          this.#pointPresenters.get(update.id).setAborting();
        }
        break;
    }

    this.#uiBlocker.unblock();
  };

  #handelModeEvent = (updateType, data) => {
    switch (updateType) {
      case UpdateType.PATCH:
        this.#pointPresenters.get(data.id).init(data);
        break;
      case UpdateType.MINOR:
        this.#clearTrip();
        this.#renderTrip();
        break;
      case UpdateType.MAJOR:
        this.#clearTrip({ resetSortType: true });
        this.#renderTrip();
        break;
      case UpdateType.INIT:
        this.#isLoading = false;
        remove(this.#loadingComponent);
        this.#renderTrip();
        break;
      case UpdateType.ERROR:
        this.#isLoading = false;
        this.#isError = true;
        remove(this.#loadingComponent);
        this.#renderTrip();
        break;
    }
  };

  /**
   * Изменяет представление точек путешествия.
   */
  #handleModeChange = () => {
    this.#newEventPresenter.destroy();
    this.#pointPresenters.forEach((presenter) => presenter.resetView());
  };

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }

    this.#currentSortType = sortType;
    this.#clearTrip();
    this.#renderTrip();
  };
}
