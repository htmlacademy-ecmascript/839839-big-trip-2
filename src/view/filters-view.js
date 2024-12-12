import AbstractView from '../framework/view/abstract-view.js';

/**
 * Создает шаблон элемента фильтра.
 *
 * @param {Object} filter - Объект фильтров.
 * @param {boolean} isChecked - Флаг, указывающий, на выбранный фильтр.
 * @returns {string} элемент фильтра.
 */
const createFilterItemTemplate = (filter, currentFilterType) => {
  const {type, count} = filter;

  return (`<div class="trip-filters__filter">
      <input id="filter-${type}"
      class="trip-filters__filter-input  visually-hidden"
      type="radio" name="trip-filter"
      value="${type}"
      ${type === currentFilterType ? 'checked' : ''}
      ${count === 0 ? 'disabled' : ''}>
      <label class="trip-filters__filter-label" for="filter-${type}">${type}</label>
    </div>`);
};

/**
 * Создает шаблон формы фильтров.
 *
 * @param {Array<Object>} filters - Массив объектов фильтров.
 * @returns {string} шаблон формы фильтров.
 */
const createFilters = (filters, currentFilterType) =>
  `<form class="trip-filters" action="#" method="get">

    ${filters.map((filter) => createFilterItemTemplate(filter, currentFilterType)).join('')}

    <button class="visually-hidden" type="submit">Accept filter</button>
  </form>`;

export default class FiltersView extends AbstractView {
  #filters = null;
  #currentFilter = null;
  #handleFilterTypeChange = null;

  constructor({ filters, currentFilterType, onFilterTypeChange }) {
    super();
    this.#filters = filters;
    this.#currentFilter = currentFilterType;
    this.#handleFilterTypeChange = onFilterTypeChange;

    this.element.addEventListener('change', this.#onfilterTypeChange);
  }

  get template() {
    return createFilters(this.#filters, this.#currentFilter);
  }

  #onfilterTypeChange = (evt) => {
    evt.preventDefault();

    this.#handleFilterTypeChange(evt.target.value);
  };
}
