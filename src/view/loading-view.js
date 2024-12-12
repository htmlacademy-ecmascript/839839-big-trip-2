import AbstractView from '../framework/view/abstract-view.js';

const SystemMessage = {
  LOADING: 'Loading...',
  ERROR: 'Failed to load latest route information'
};

const createLoadingTemplate = (isError) =>
  `<p class="trip-events__msg">${isError ? SystemMessage.ERROR : SystemMessage.LOADING}</p>`;

export default class LoadingView extends AbstractView {
  #isError = null;

  constructor(isError) {
    super();
    this.#isError = isError;
  }

  get template() {
    return createLoadingTemplate(this.#isError);
  }
}
