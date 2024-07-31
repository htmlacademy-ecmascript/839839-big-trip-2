import ListPointsView from '../view/list-points-view.js';
import ItemPointView from '../view/item-point-view.js';
import OpenPointView from '../view/open-point-view.js';
import { render } from '../render.js';

export default class TripPresenter {
  boardComponent = new ListPointsView;

  constructor({ boardContainer }) {
    this.boardContainer = boardContainer;
  }

  init() {
    render(this.boardComponent, this.boardContainer);
    render(new OpenPointView, this.boardComponent.getElement());
    for (let i = 0; i < 3; i++) {
      render(new ItemPointView, this.boardComponent.getElement());
    }
  }
}
