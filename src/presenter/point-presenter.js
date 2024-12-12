import { replace, render, remove } from '../framework/render.js';
import ItemPointView from '../view/item-point-view.js';
import OpenPointView from '../view/open-point-view.js';
import { Mode } from '../const.js';
import { UserAction, UpdateType } from '../const.js';

export default class PointPresenter {
  #listPointsComponent = null;
  #allOffers = null;
  #allDestinations = null;
  #handleModeChange = null;
  #handleDataChange = null;

  #point = null;
  #mode = Mode.DEFAULT;

  #pointComponent = null;
  #openPointComponent = null;

  constructor({ listPointsContainer, allOffers, allDestinations, onModeChange, onDataChange }) {
    this.#listPointsComponent = listPointsContainer;
    this.#allOffers = allOffers;
    this.#allDestinations = allDestinations;
    this.#handleModeChange = onModeChange;
    this.#handleDataChange = onDataChange;
  }

  init(point) {
    this.#point = point;

    const prevPointComponent = this.#pointComponent;
    const prevOpenPointComponent = this.#openPointComponent;

    this.#pointComponent = new ItemPointView({
      point: this.#point,
      allOffers : this.#allOffers,
      allDestinations : this.#allDestinations,
      onRollupClick: this.#handleRollupClick,
      onFavoriteClick: this.#handleFavoriteClick
    });

    this.#openPointComponent = new OpenPointView({
      point: this.#point,
      allOffers : this.#allOffers,
      allDestinations : this.#allDestinations,
      onFormClick: this.#handleFormClick,
      onFormSubmit: this.#handleFormSubmit,
      onDeleteClick: this.#handleDeleteClick
    });

    if (prevPointComponent === null || prevOpenPointComponent === null) {
      render(this.#pointComponent, this.#listPointsComponent);
      return;
    }

    if (this.#mode === Mode.DEFAULT) {
      replace(this.#pointComponent, prevPointComponent);
    }

    if (this.#mode === Mode.EDITING) {
      replace(this.#pointComponent, prevOpenPointComponent);
      this.#mode = Mode.DEFAULT;
    }

    remove(prevPointComponent);
    remove(prevOpenPointComponent);
  }

  /**
   * Удаляет компоненты закрытой и открытой точки из DOM.
   */
  removePoint() {
    remove(this.#pointComponent);
    remove(this.#openPointComponent);
  }

  /**
   * Закрывает форму редактирования.
   */
  resetView() {
    if (this.#mode !== Mode.DEFAULT) {
      this.#openPointComponent.reset(this.#point);
      this.#replaceOpenPointToPoint();
    }
  }

  setSaving() {
    if (this.#mode === Mode.EDITING) {
      this.#openPointComponent.updateElement({
        isDisabled: true,
        isSaving: true,
      });
    }
  }

  setDeleting() {
    if (this.#mode === Mode.EDITING) {
      this.#openPointComponent.updateElement({
        isDisabled: true,
        isDeleting: true,
      });
    }
  }

  setAborting() {
    if (this.#mode === Mode.DEFAULT) {
      this.#pointComponent.shake();
      return;
    }
    const resetFormState = () => {
      this.#openPointComponent.updateElement({
        isDisabled: false,
        isSaving: false,
        isDeleting: false,
      });
    };
    this.#openPointComponent.shake(resetFormState);
  }

  /**
 * Заменяет компонент закрытой точки на компонент открытой точки.
 */
  #replacePointToOpenPoint() {
    replace(this.#openPointComponent, this.#pointComponent);
    document.addEventListener('keydown', this.#onEscKeydown);
    this.#handleModeChange();
    this.#mode = Mode.EDITING;
  }

  /**
   * Заменяет компонент открытой точки на компонент закрытой точки.
   */
  #replaceOpenPointToPoint() {
    replace(this.#pointComponent, this.#openPointComponent);
    document.removeEventListener('keydown', this.#onEscKeydown);
    this.#mode = Mode.DEFAULT;
  }

  #handleRollupClick = () => {
    this.#replacePointToOpenPoint();
  };

  #handleFormClick = () => {
    this.#replaceOpenPointToPoint();
  };

  #handleFavoriteClick = () => {
    this.#handleDataChange(
      UserAction.UPDATE_POIN,
      UpdateType.PATCH,
      {
        ...this.#point,
        isFavorite: !this.#point.isFavorite
      }
    );
  };

  #handleFormSubmit = (point) => {
    this.#handleDataChange(
      UserAction.UPDATE_POIN,
      UpdateType.MINOR,
      point
    );
  };

  #handleDeleteClick = (point) => {
    this.#handleDataChange(
      UserAction.DELETE_POINT,
      UpdateType.MINOR,
      point
    );
  };

  /**
   * Обработчик события нажатия клавиши 'Escape'.
   * @param evt - Событие клавиатуры.
   */
  #onEscKeydown = (evt) => {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      this.#openPointComponent.reset(this.#point);
      this.#replaceOpenPointToPoint();
    }
  };
}
