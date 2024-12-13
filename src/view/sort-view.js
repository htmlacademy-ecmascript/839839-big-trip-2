import AbstractView from '../framework/view/abstract-view.js';
import { SortType } from '../const.js';

const isDisabled = (sort) => sort === 'event' || sort === 'offers' ? 'disabled' : '';
const isChecked = (currentType, sort) => sort === currentType ? 'checked' : '';

const createSortTemplate = (currentType) =>
  (`<form class="trip-events__trip-sort  trip-sort" action="#" method="get">

    ${Object.values(SortType).map((sort) => `<div class="trip-sort__item  trip-sort__item--${sort}">
      <input id="sort-${sort}" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-${sort}" data-sort-type="${sort}" ${isChecked(currentType, sort)} ${isDisabled(sort)}>
      <label class="trip-sort__btn" for="sort-${sort}">${sort}</label>
    </div>`).join('')}

  </form>`);

export default class SortView extends AbstractView {
  #handleSortTypeChange = null;
  #currentType = null;

  constructor({ onSortTypeChange, currentType }) {
    super();

    this.#handleSortTypeChange = onSortTypeChange;
    this.#currentType = currentType;
    this.element.addEventListener('click', this.#onSortFormClick);
  }

  get template() {
    return createSortTemplate(this.#currentType);
  }

  #onSortFormClick = (evt) => {
    if(evt.target.tagName !== 'INPUT') {
      return;
    }

    this.#handleSortTypeChange(evt.target.dataset.sortType);
  };
}
