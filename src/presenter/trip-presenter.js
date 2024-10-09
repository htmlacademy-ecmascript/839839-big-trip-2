import ListPointsView from '../view/list-points-view.js';
import ItemPointView from '../view/item-point-view.js';
import OpenPointView from '../view/open-point-view.js';
import MessageView from '../view/message-view.js';
import { render, replace } from '../framework/render.js';
import { messages } from '../const.js';

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

    this.#renderTrip();
  }

  #renderPoint({point, offers, destinations}) {
    const onEscKeydown = (evt) => {
      if (evt.key === 'Escape') {
        evt.preventDefault();
        replaceOpenPointToPoint();
        document.removeEventListener('keydown', onEscKeydown);
      }
    };

    const pointComponent = new ItemPointView({
      point,
      offers,
      destinations,
      onRollupClick: () => {
        replacePointToOpenPoint();
        document.addEventListener('keydown', onEscKeydown);
      }
    });

    const openPointComponen = new OpenPointView({
      point,
      offers,
      destinations,
      onFormClick: () => {
        replaceOpenPointToPoint();
        document.removeEventListener('keydown', onEscKeydown);
      }
    });

    function replacePointToOpenPoint() {
      replace(openPointComponen, pointComponent);
    }

    function replaceOpenPointToPoint() {
      replace(pointComponent, openPointComponen);
    }

    render(pointComponent , this.#tripComponent.element);
  }

  #renderTrip() {
    render(this.#tripComponent, this.#tripContainer);

    if (!this.#tripPoints.length) {
      render(new MessageView(messages.newEvent), this.#tripComponent.element);
      return;
    }

    for (let i = 0; i < this.#tripPoints.length; i++) {
      this.#renderPoint({
        point: this.#tripPoints[i],
        offers: this.#tripOffers,
        destinations: this.#tripDestinations,
      });
    }
  }
}
