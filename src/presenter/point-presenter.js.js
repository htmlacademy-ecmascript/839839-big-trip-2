import { replace, render } from '../framework/render';
import ItemPointView from '../view/item-point-view';
import OpenPointView from '../view/open-point-view';

export default class PointPresenter {
  #listPointsComponent = null;

  #pointComponent = null;
  #openPointComponent = null;

  constructor({listPointsContainer}) {
    this.#listPointsComponent = listPointsContainer;
  }

  init(point, allOffers, allDestinations) {

    this.#pointComponent = new ItemPointView({
      point,
      allOffers,
      allDestinations,
      onRollupClick: () => {
        this.#replacePointToOpenPoint();
        document.addEventListener('keydown', this.#onEscKeydown);
      }
    });

    this.#openPointComponent = new OpenPointView({
      point,
      allOffers,
      allDestinations,
      onFormClick: () => {
        this.#replaceOpenPointToPoint();
        document.removeEventListener('keydown', this.#onEscKeydown);
      }
    });

    render(this.#pointComponent , this.#listPointsComponent);
  }

  #onEscKeydown = (evt) => {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      this.#replaceOpenPointToPoint();
      document.removeEventListener('keydown', this.#onEscKeydown);
    }
  };

  /**
 * Заменяет компонент точки (pointComponent) на компонент открытой точки (openPointComponent).
 */
  #replacePointToOpenPoint() {
    replace(this.#openPointComponent, this.#pointComponent);
  }

  /**
   * Заменяет компонент открытой точки (openPointComponent) на компонент точки (pointComponent).
   */
  #replaceOpenPointToPoint() {
    replace(this.#pointComponent, this.#openPointComponent);
  }

}
