import {createElement} from '../render.js';

const createLoaderTemplate = () =>
  '<p class="trip-events__msg">Loading...</p>';

export default class LoaderTemplate {
  getTemplate() {
    return createLoaderTemplate();
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
