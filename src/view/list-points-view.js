import { createElement } from '../render.js';

const createListPoints = () =>
  '<ul class="trip-events__list"></ul>';

export default class ListPointsView {
  getTemplate() {
    return createListPoints();
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }
    return this.element;
  }
}
