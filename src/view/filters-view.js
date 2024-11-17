import AbstractView from '../framework/view/abstract-view.js';

/**
 * Создает шаблон элемента фильтра.
 *
 * @param {Object} filter - Объект фильтров.
 * @param {boolean} isChecked - Флаг, указывающий, на выбранный фильтр.
 * @returns {string} элемент фильтра.
 */
const createFilterItemTemplate = (filter, isChecked) => {
  const {type, count} = filter;

  return (`<div class="trip-filters__filter">
      <input id="filter-${type}"
      class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter"
      value="${type}"
      ${isChecked ? 'checked' : ''}
      ${count === 0 ? 'disabled' : ''}>
      <label class="trip-filters__filter-label" for="filter-future">${type}</label>
    </div>`);
};

/**
 * Создает шаблон формы фильтров.
 *
 * @param {Array<Object>} filters - Массив объектов фильтров.
 * @returns {string} шаблон формы фильтров.
 */
const createFilters = (filters) =>
  `<form class="trip-filters" action="#" method="get">

    ${filters.map((filter, index) => createFilterItemTemplate(filter, index)).join('')}

    <button class="visually-hidden" type="submit">Accept filter</button>
  </form>`;

export default class FiltersView extends AbstractView {
  #filters = null;

  constructor({filters}) {
    super();
    this.#filters = filters;
  }

  get template() {
    return createFilters(this.#filters);
  }
}
