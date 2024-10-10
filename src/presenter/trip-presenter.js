import ListPointsView from '../view/list-points-view.js';
import ItemPointView from '../view/item-point-view.js';
import OpenPointView from '../view/open-point-view.js';
import MessageView from '../view/message-view.js';
import { render, replace } from '../framework/render.js';
import { Message } from '../const.js';

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

  #renderPoint({point, allOffers, allDestinations}) {
    const onEscKeydown = (evt) => {
      if (evt.key === 'Escape') {
        evt.preventDefault();
        replaceOpenPointToPoint();
        document.removeEventListener('keydown', onEscKeydown);
      }
    };

    const pointComponent = new ItemPointView({
      point,
      allOffers,
      allDestinations,
      onRollupClick: () => {
        replacePointToOpenPoint();
        document.addEventListener('keydown', onEscKeydown);
      }
    });

    const openPointComponent = new OpenPointView({
      point,
      allOffers,
      allDestinations,
      onFormClick: () => {
        replaceOpenPointToPoint();
        document.removeEventListener('keydown', onEscKeydown);
      }
    });

    function replacePointToOpenPoint() {
      replace(openPointComponent, pointComponent);
    }

    function replaceOpenPointToPoint() {
      replace(pointComponent, openPointComponent);
    }

    render(pointComponent , this.#listPointsComponent.element);
  }

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
