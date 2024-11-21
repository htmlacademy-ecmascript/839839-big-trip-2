import AbstractView from '../framework/view/abstract-view.js';
import { SortType } from '../const.js';

const createSortTemplate = () =>
  (`<form class="trip-events__trip-sort  trip-sort" action="#" method="get">

    ${Object.values(SortType).map((sort) => `<div class="trip-sort__item  trip-sort__item--${sort}">
      <input id="sort-${sort}" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-${sort}" data-sort-type="${sort}" checked>
      <label class="trip-sort__btn" for="sort-${sort}">${sort}</label>
    </div>`).join('')}

  </form>`);

export default class SortView extends AbstractView {
  #handleSortTypeChange = null;

  constructor({onSortTypeChange}) {
    super();

    this.#handleSortTypeChange = onSortTypeChange;
    this.element.addEventListener('click', this.#onSortFormClick);
  }

  get template() {
    return createSortTemplate();
  }

  #onSortFormClick = (evt) => {
    if(evt.target.tagName !== 'INPUT') {
      return;
    }
    evt.preventDefault();
    this.#handleSortTypeChange(evt.target.dataset.sortType);
  };
}
