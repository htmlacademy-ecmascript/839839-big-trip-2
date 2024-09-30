import ListPointsView from '../view/list-points-view.js';
import ItemPointView from '../view/item-point-view.js';
import OpenPointView from '../view/open-point-view.js';
import { render } from '../framework/render.js';

export default class TripPresenter {
  boardComponent = new ListPointsView;

  constructor({ boardContainer, pointModel }) {
    this.boardContainer = boardContainer;
    this.pointModel = pointModel;
  }

  init() {
    /**
     * Копия данных модели(временная)
     */
    this.tripPoints = [...this.pointModel.getPoint()];
    this.tripDestinations = [...this.pointModel.getDestination()];
    this.tripOffers = [...this.pointModel.getOffer()];

    render(this.boardComponent, this.boardContainer);
    render(new OpenPointView({
      point: this.tripPoints[0],
      offers: this.tripOffers,
      destinations: this.tripDestinations,
    }),
    this.boardComponent.element);

    for (let i = 1; i < this.tripPoints.length; i++) {
      render(new ItemPointView({
        point: this.tripPoints[i],
        offers: this.tripOffers,
        destinations: this.tripDestinations,
      }),
      this.boardComponent.element);
    }
  }
}
