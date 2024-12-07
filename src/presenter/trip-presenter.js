import RouteView from '../view/route-view.js';
import FiltersView from '../view/filters-view.js';
import SortView from '../view/sort-view.js';
import { remove, render, RenderPosition } from '../framework/render.js';
import ListPointsView from '../view/list-points-view.js';
import MessageView from '../view/message-view.js';
import { Message, SortType, UserAction, UpdateType } from '../const.js';
import PointPresenter from './point-presenter.js';
import { generateFilter } from '../utils/filter.js';
import { sortPointByPrice, sortPointByDay, sortPointByDuration } from '../utils/sort.js';
import ButtonNewEvent from '../view/button-new-event.js';

export default class TripPresenter {
  #tripContainer = null;
  #pointModel = null;
  #offerModel = null;
  #destinationModel = null;
  #routeContainer = null;
  #filterContainer = null;
  #sortContainer = null;

  #listPointsComponent = new ListPointsView();
  #routeComponent = new RouteView();
  #sortComponent = null;

  #pointPresenters = new Map();

  #currentSortType = SortType.DAY;

  constructor({ tripContainer, pointModel, offerModel, destinationModel, tripMainElement, filtersElement,
    tripEventsElement }) {
    this.#tripContainer = tripContainer;
    this.#pointModel = pointModel;
    this.#offerModel = offerModel;
    this.#destinationModel = destinationModel;
    this.#routeContainer = tripMainElement;
    this.#filterContainer = filtersElement;
    this.#sortContainer = tripEventsElement;

    this.#pointModel.addObserver(this.#handelModeEvent);
  }

  get points() {
    switch (this.#currentSortType) {
      case SortType.DAY:
        return [...this.#pointModel.points].sort(sortPointByDay);
      case SortType.TIME:
        return [...this.#pointModel.points].sort(sortPointByDuration);
      case SortType.PRICE:
        return [...this.#pointModel.points].sort(sortPointByPrice);
    }
    return [...this.#pointModel.points].sort(sortPointByDay);
  }

  init() {
    this.#renderPage();
  }

  /**
   * Рендеринг маршрута.
   */
  #renderRoute = () => {
    render(this.#routeComponent, this.#routeContainer, RenderPosition.AFTERBEGIN);
  };

  /**
   * Рендеринг кнопки New event.
   */
  #renderButtonNewEvent = () => {
    render(new ButtonNewEvent(), this.#routeContainer);
  };

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }

    this.#currentSortType = sortType;
    // this.#renderListPoint();
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

  /**
   * Рендеринг фильтров.
   */
  #renderFilter() {
    const filters = generateFilter(this.#pointModel.points);
    render(new FiltersView({filters}), this.#filterContainer);
  }

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
    }
  };

  #clearTrip = ({ resetSortType = false } = {}) => {
    this.#pointPresenters.forEach((presenter) => presenter.removePoint());
    this.#pointPresenters.clear();

    remove(this.#sortComponent);

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
    this.#pointPresenters.forEach((presenter) => presenter.resetView());
  };

  #renderListPoint = () => {
    this.points.forEach((point) => {
      this.#renderPoint(point);
    });
  };

  /**
   * Рендеринг всего списка поездок.
   */
  #renderTrip = () => {
    render(this.#listPointsComponent, this.#tripContainer);

    if (!this.points.length) {
      render(new MessageView(Message.NEW_EVENT), this.#listPointsComponent.element);
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
    this.#renderButtonNewEvent();
    this.#renderFilter();

    this.#renderTrip();
  };
}
