import NewListTripEvents from '../view/list-trip-events';
import NewItemTripEvent from '../view/item-trip-event';
import NewFormPoint from '../view/form-new-point';
import {render} from '../render';

export default class BoardPresenter {
  boardComponent = new NewListTripEvents;

  constructor({boardContainer}) {
    this.boardContainer = boardContainer;
  }

  init() {
    render(this.boardComponent, this.boardContainer);
    render(new NewFormPoint, this.boardComponent.getElement());
    for (let i = 0; i < 3; i++) {
      render(new NewItemTripEvent, this.boardComponent.getElement());
    }
  }
}
