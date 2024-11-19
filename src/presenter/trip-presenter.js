import RouteView from '../view/route-view.js';
import FiltersView from '../view/filters-view.js';
import SortView from '../view/sort-view.js';
import { render, RenderPosition } from '../framework/render.js';
import ListPointsView from '../view/list-points-view.js';
import MessageView from '../view/message-view.js';
import { Message } from '../const.js';
import PointPresenter from './point-presenter.js';
import { generateFilter } from '../utils/filter.js';


export default class TripPresenter {
  #tripContainer = null;
  #pointModel = null;
  #routeContainer = null;
  #filterContainer = null;
  #sortContainer = null;

  #listPointsComponent = new ListPointsView();
  #routeComponent = new RouteView();
  #sortComponent = new SortView();

  #tripPoints = [];
  #tripDestinations = [];
  #tripOffers = [];

  constructor({ tripContainer, pointModel, tripMainElement, filtersElement,
    tripEventsElement }) {
    this.#tripContainer = tripContainer;
    this.#pointModel = pointModel;
    this.#routeContainer = tripMainElement;
    this.#filterContainer = filtersElement;
    this.#sortContainer = tripEventsElement;
  }

  init() {
    /**
     * Копия данных модели(временная)
     */
    this.#tripPoints = [...this.#pointModel.point];
    this.#tripDestinations = [...this.#pointModel.destination];
    this.#tripOffers = [...this.#pointModel.offer];

    this.#renderTrip();
  }

  /**
   * Рендеринг маршрута.
   */
  #renderRoute() {
    render(this.#routeComponent, this.#routeContainer, RenderPosition.AFTERBEGIN);
  }

  /**
   * Рендеринг сортировки.
   */
  #renderSort() {
    render(this.#sortComponent, this.#sortContainer, RenderPosition.AFTERBEGIN);
  }

  /**
   * Рендеринг фильтров.
   */
  #renderFilter() {
    const filters = generateFilter(this.#pointModel.point);
    render(new FiltersView({filters}), this.#filterContainer);
  }

  /**
   * Рендеринг отдельной точки поездки.
   *
   * @param {Object} point - Данные точки.
   * @param {Array} allOffers - Все предложения.
   * @param {Array} allDestinations - Все направления.
   */
  #renderPoint(point) {
    const pointPresenter = new PointPresenter({
      listPointsContainer: this.#listPointsComponent.element,
      allOffers: this.#tripOffers,
      allDestinations: this.#tripDestinations,
    });
    pointPresenter.init(point);
  }

  /**
   * Рендеринг всего списка поездок.
   */
  #renderTrip() {
    this.#renderRoute();
    this.#renderFilter();
    render(this.#listPointsComponent, this.#tripContainer);

    if (!this.#tripPoints.length) {
      render(new MessageView(Message.NEW_EVENT), this.#listPointsComponent.element);
      return;
    }

    this.#renderSort();
    this.#tripPoints.forEach((point) => {
      this.#renderPoint(point);
    });
  }
}
