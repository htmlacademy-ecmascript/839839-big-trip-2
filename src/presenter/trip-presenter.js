import ListPointsView from '../view/list-points-view.js';
import ItemPointView from '../view/item-point-view.js';
import OpenPointView from '../view/open-point-view.js';
import MessageView from '../view/message-view.js';
import { render, replace } from '../framework/render.js';
import { Message } from '../const.js';

export default class TripPresenter {
  #tripContainer = null;
  #pointModel = null;

  #listPointsComponent = new ListPointsView;

  #tripPoints = [];
  #tripDestinations = [];
  #tripOffers = [];

  constructor({ tripContainer, pointModel }) {
    this.#tripContainer = tripContainer;
    this.#pointModel = pointModel;
  }

  init() {
    /**
     * Копия данных модели(временная)
     */
    this.#tripPoints = [...this.#pointModel.point];
    this.#tripDestinations = [...this.#pointModel.destination];
    this.#tripOffers = [...this.#pointModel.offer];

    this.#renderTrip();
  }

  /**
   * Рендеринг отдельной точки поездки.
   *
   * @param {Object} point - Данные точки.
   * @param {Array} allOffers - Все предложения.
   * @param {Array} allDestinations - Все направления.
   */
  #renderPoint({point, allOffers, allDestinations}) {
    const onEscKeydown = (evt) => {
      if (evt.key === 'Escape') {
        evt.preventDefault();
        replaceOpenPointToPoint();
        document.removeEventListener('keydown', onEscKeydown);
      }
    };

    /**
     * Создает новый компонент закрытой точки.
     *
     * @param {Object} point - Данные для текущей точки.
     * @param {Array} allOffers - Список всех предложений.
     * @param {Array} allDestinations - Список всех направлений.
     * @param {Function} onRollupClick - Обработчик клика по элементу, который
     *        заменяет компонент точки на открытый и добавляет обработчик события клавиатуры.
     */
    const pointComponent = new ItemPointView({
      point,
      allOffers,
      allDestinations,
      onRollupClick: () => {
        replacePointToOpenPoint();
        document.addEventListener('keydown', onEscKeydown);
      }
    });

    /**
     * Создает новый компонент открытой точки.
     *
     * @param {Object} point - Данные для текущей точки.
     * @param {Array} allOffers - Список всех предложений.
     * @param {Array} allDestinations - Список всех направлений.
     * @param {Function} onFormClick - Обработчик клика по форме,
     *        который заменяет открытый компонент на обычный и удаляет обработчик
     *        события клавиатуры.
     */
    const openPointComponent = new OpenPointView({
      point,
      allOffers,
      allDestinations,
      onFormClick: () => {
        replaceOpenPointToPoint();
        document.removeEventListener('keydown', onEscKeydown);
      }
    });

    /**
     * Заменяет компонент точки (pointComponent) на компонент открытой точки (openPointComponent).
     */
    function replacePointToOpenPoint() {
      replace(openPointComponent, pointComponent);
    }

    /**
     * Заменяет компонент открытой точки (openPointComponent) на компонент точки (pointComponent).
     */
    function replaceOpenPointToPoint() {
      replace(pointComponent, openPointComponent);
    }

    render(pointComponent , this.#listPointsComponent.element);
  }

  /**
   * Рендеринг всего списка поездок.
   */
  #renderTrip() {
    render(this.#listPointsComponent, this.#tripContainer);

    if (!this.#tripPoints.length) {
      render(new MessageView(Message.NEW_EVENT), this.#listPointsComponent.element);
      return;
    }

    this.#tripPoints.forEach((point) => {
      this.#renderPoint({
        point,
        allOffers: this.#tripOffers,
        allDestinations: this.#tripDestinations,
      });
    });
  }
}
