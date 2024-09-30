import AbstractView from '../framework/view/abstract-view.js';

const createMessage = () =>
  '<p class="trip-events__msg">Loading...</p>';

export default class MessageView extends AbstractView {
  get template() {
    return createMessage();
  }
}
