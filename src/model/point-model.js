import Observable from '../framework/observable.js';
import { getRandomPoint } from '../mock/data.js';

const POINT_COUNT = 4;

export default class PointModel extends Observable {
  #points = Array.from({length: POINT_COUNT}, getRandomPoint);

  get points() {
    return this.#points;
  }

  /**
   * Обновляет существующую точку маршрута
   * @param {UpdateType} updateType - Тип обновления, определяющий, как обновление должно обрабатываться.
   * @param {Object} update - Обновленная точка, которую нужно установить.
   */
  updatePoint(updateType, update) {
    const index = this.#points.findIndex((point) => point.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t update unexisting point');
    }

    this.#points = [
      ...this.#points.slice(0, index),
      update,
      ...this.#points.slice(index + 1),
    ];

    this._notify(updateType, update);
  }

  /**
   * Добавляет новую точку маршрута
   * @param {UpdateType} updateType - Тип обновления, определяющий, как обновление должно обрабатываться
   * @param {Object} update - Точка, которую нужно добавить
   */
  addPoint(updateType, update) {
    this.#points = [
      update,
      ...this.#points,
    ];

    this._notify(updateType, update);
  }

  /**
   * Удаляет точку маршрута
   * @param {UpdateType} updateType - Тип обновления, определяющий, как обновление должно обрабатываться
   * @param {Object} update - Точка, которую нужно удалить
   */
  deletePoint(updateType, update) {
    const index = this.#points.findIndex((point) => point.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t delete unexisting point');
    }

    this.#points = [
      ...this.#points.slice(0, index),
      ...this.#points.slice(index + 1),
    ];

    this._notify(updateType);
  }
}
