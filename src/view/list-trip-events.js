import { createElement } from '../render';

const createlistTripEvents = () =>
  '<ul class="trip-events__list"></ul>';

export default class NewListTripEvents {
  getTemplate() {
    return createlistTripEvents();
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }
    return this.element;
  }
}
