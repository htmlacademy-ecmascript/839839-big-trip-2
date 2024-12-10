import Observable from '../framework/observable.js';
import { FilterType } from '../const.js';

export default class FilterModel extends Observable {
  #filter = FilterType.EVERYTHING;

  /**
   * Получает текущее состояние фильтра
   * @returns {FilterType} Текущий фильтр
   */
  get filter() {
    return this.#filter;
  }

  /**
   * Устанавливает новый фильтр и уведомляет подписчиков об изменении
   * @param {UpdateType} updateType - Тип обновления, определяющий,
   *                                  как обновление должно обрабатываться
   * @param {FilterType} filter - Новый фильтр, который нужно установить
   */
  setFilter(UpdateType, filter) {
    this.#filter = filter;
    this._notify(UpdateType, filter);
  }
}
