import ListPointsView from '../view/list-points-view.js';
import MessageView from '../view/message-view.js';
import { render } from '../framework/render.js';
import { Message } from '../const.js';
import PointPresenter from './point-presenter.js';

export default class TripPresenter {
  #tripContainer = null;
  #pointModel = null;

  #listPointsComponent = new ListPointsView;

  #tripPoints = [];
  #tripDestinations = [];
  #tripOffers = [];

  constructor({ tripContainer, pointModel }) {
    this.#tripContainer = tripContainer;
    this.#pointModel = pointModel;
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
   * Рендеринг отдельной точки поездки.
   *
   * @param {Object} point - Данные точки.
   * @param {Array} allOffers - Все предложения.
   * @param {Array} allDestinations - Все направления.
   */
  #renderPoint({point, allOffers, allDestinations}) {
    const pointPresenter = new PointPresenter({
      listPointsContainer: this.#listPointsComponent.element,
      allOffers,
      allDestinations,
    });
    pointPresenter.init(point);
  }

  /**
   * Рендеринг всего списка поездок.
   */
  #renderTrip() {
    render(this.#listPointsComponent, this.#tripContainer);

    if (!this.#tripPoints.length) {
      render(new MessageView(Message.NEW_EVENT), this.#listPointsComponent.element);
      return;
    }

    this.#tripPoints.forEach((point) => {
      this.#renderPoint({
        point,
        allOffers: this.#tripOffers,
        allDestinations: this.#tripDestinations,
      });
    });
  }
}
