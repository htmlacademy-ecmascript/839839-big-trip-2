import { remove, render, RenderPosition } from '../framework/render.js';
import OpenPointView from '../view/open-point-view.js';
import { UserAction, UpdateType } from '../const.js';

export default class NewEventPresenter {
  #pointListContainer = null;
  #handleDataChange = null;
  #handleDestroy = null;
  #destinationModel = null;
  #offerModel = null;

  #openPointComponent = null;

  constructor({pointListContainer, onDataChange, onDestroy, destinationModel, offerModel}) {
    this.#pointListContainer = pointListContainer;
    this.#handleDataChange = onDataChange;
    this.#handleDestroy = onDestroy;
    this.#destinationModel = destinationModel;
    this.#offerModel = offerModel;
  }

  init() {
    if (this.#openPointComponent !== null) {
      return;
    }

    this.#openPointComponent = new OpenPointView({
      allOffers: this.#offerModel.offers,
      allDestinations: this.#destinationModel.destinations,
      onFormSubmit: this.#handleFormSubmit,
      onDeleteClick: this.#handleDeleteClick,
    });

    render(this.#openPointComponent, this.#pointListContainer, RenderPosition.AFTERBEGIN);

    document.addEventListener('keydown', this.#onEscKeyDown);
  }

  destroy() {
    if (this.#openPointComponent === null) {
      return;
    }
    this.#handleDestroy();

    remove(this.#openPointComponent);
    this.#openPointComponent = null;

    document.removeEventListener('keydown', this.#onEscKeyDown);
  }

  setSaving() {
    this.#openPointComponent.updateElement(
      {
        isDisabled: true,
        isSaving: true,
      }
    );
  }

  #handleFormSubmit = (point) => {
    this.#handleDataChange(
      UserAction.ADD_POINT,
      UpdateType.MINOR,
      point
    );
  };

  #handleDeleteClick = () => {
    this.destroy();
  };

  #onEscKeyDown = (evt) => {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      this.destroy();
    }
  };
}
