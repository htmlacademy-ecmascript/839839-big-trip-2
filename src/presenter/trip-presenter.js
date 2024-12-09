import RouteView from '../view/route-view.js';
import SortView from '../view/sort-view.js';
import { remove, render, RenderPosition } from '../framework/render.js';
import ListPointsView from '../view/list-points-view.js';
import MessageView from '../view/message-view.js';
import LoadingView from '../view/loading-view.js';
import { SortType, UserAction, UpdateType, FilterType } from '../const.js';
import PointPresenter from './point-presenter.js';
import NewEventPresenter from './new-event-presenter.js';
import { sortPointByPrice, sortPointByDay, sortPointByDuration } from '../utils/sort.js';
import { filter } from '../utils/filter.js';

export default class TripPresenter {
  #tripContainer = null;
  #pointModel = null;
  #offerModel = null;
  #destinationModel = null;
  #routeContainer = null;
  #sortContainer = null;
  #filterModel = null;

  #listPointsComponent = new ListPointsView();
  #routeComponent = new RouteView();
  #loadingComponent = new LoadingView();
  #sortComponent = null;
  #messageComponent = null;

  #pointPresenters = new Map();
  #newEventPresenter = null;
  #currentSortType = SortType.DAY;
  #filterType = FilterType.EVERYTHING;
  #isLoading = true;

  constructor({ tripContainer, pointModel, offerModel, destinationModel, tripMainElement,tripEventsElement, filterModel, onNewEventDestroy }) {
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

  /**
   * Рендеринг маршрута.
   */
  #renderRoute = () => {
    render(this.#routeComponent, this.#routeContainer, RenderPosition.AFTERBEGIN);
  };

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }

    this.#currentSortType = sortType;
    this.#clearTrip();
    this.#renderTrip();
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

  #handleViewAction = (actionType, updateType, update) => {
    switch (actionType) {
      case UserAction.UPDATE_POIN:
        this.#pointModel.updatePoint(updateType, update);
        break;
      case UserAction.ADD_POINT:
        this.#pointModel.addPoint(updateType, update);
        break;
      case UserAction.DELETE_POINT:
        this.#pointModel.deletePoint(updateType, update);
        break;
    }
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
    }
  };

  #clearTrip = ({ resetSortType = false } = {}) => {
    this.#newEventPresenter.destroy();
    this.#pointPresenters.forEach((presenter) => presenter.removePoint());
    this.#pointPresenters.clear();

    remove(this.#sortComponent);
    remove(this.#loadingComponent);

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

  /**
   * Изменяет представление точек путешествия.
   */
  #handleModeChange = () => {
    this.#newEventPresenter.destroy();
    this.#pointPresenters.forEach((presenter) => presenter.resetView());
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

  #renderLoading() {
    render(this.#loadingComponent, this.#tripContainer);
  }

  /**
   * Рендеринг всего списка поездок.
   */
  #renderTrip = () => {
    render(this.#listPointsComponent, this.#tripContainer);

    if (this.#isLoading) {
      this.#renderLoading();
      return;
    }

    if (!this.points.length) {
      this.#renderMessage();
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
}
