import AbstractView from '../framework/view/abstract-view.js';
import { Message } from '../const.js';

const createMessage = (filterType) => {
  const message = Message[filterType.toUpperCase()];
  return `<p class="trip-events__msg">${message}.</p>`;
};

export default class MessageView extends AbstractView {
  #filterType = null;

  constructor({ filterType }) {
    super();
    this.#filterType = filterType;
  }

  get template() {
    return createMessage(this.#filterType);
  }
}
