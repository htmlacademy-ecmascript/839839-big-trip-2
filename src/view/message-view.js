import { createElement } from '../render.js';

const createMessage = () =>
  '<p class="trip-events__msg">Loading...</p>';

export default class MessageView {
  getTemplate() {
    return createMessage();
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }
    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}
