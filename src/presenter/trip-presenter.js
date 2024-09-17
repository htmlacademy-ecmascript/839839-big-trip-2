import ListPointsView from '../view/list-points-view.js';
import ItemPointView from '../view/item-point-view.js';
import OpenPointView from '../view/open-point-view.js';
import { render } from '../render.js';

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

    render(this.boardComponent, this.boardContainer);
    render(new OpenPointView, this.boardComponent.getElement());
    for (let i = 0; i < this.tripPoints.length; i++) {
      render(new ItemPointView({point: this.tripPoints[i]}), this.boardComponent.getElement());
    }
  }
}
