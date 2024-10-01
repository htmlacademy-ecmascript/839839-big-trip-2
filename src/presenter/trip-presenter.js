import ListPointsView from '../view/list-points-view.js';
import ItemPointView from '../view/item-point-view.js';
import OpenPointView from '../view/open-point-view.js';
import { render } from '../framework/render.js';

export default class TripPresenter {
  #tripContainer = null;
  #pointModel = null;

  #tripComponent = new ListPointsView;

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

    render(this.#tripComponent, this.#tripContainer);
    render(new OpenPointView({
      point: this.#tripPoints[0],
      offers: this.#tripOffers,
      destinations: this.#tripDestinations,
    }),
    this.#tripComponent.element);

    for (let i = 1; i < this.#tripPoints.length; i++) {
      render(new ItemPointView({
        point: this.#tripPoints[i],
        offers: this.#tripOffers,
        destinations: this.#tripDestinations,
      }),
      this.#tripComponent.element);
    }
  }
}
