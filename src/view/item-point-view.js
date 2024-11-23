import AbstractView from '../framework/view/abstract-view.js';
import { formatDate, getTimeDifference } from '../utils/utils.js';
import { DateFormat } from '../const.js';

const createItemPoint = (point, allOffers, allDestinations) => {
  const {type, basePrice, dateFrom, dateTo, isFavorite} = point;

  const pointDestination = allDestinations.find((dest) => dest.id === point.destination);
  const favoriteClassName = isFavorite ? 'event__favorite-btn--active' : '';
  const allOffersByType = allOffers.find((offer) => type === offer.type).offers;
  const selectedOffers = allOffersByType.filter((offer) => point.offers.includes(offer.id));

  return (
    `<li class="trip-events__item">
      <div class="event">
        <time class="event__date" datetime="${formatDate(dateFrom, DateFormat.FULL_DATE)}">${formatDate(dateFrom, DateFormat.SHORT_DATE)}</time>
        <div class="event__type">
          <img class="event__type-icon" width="42" height="42" src="img/icons/${type}.png" alt="Event type icon">
        </div>
        <h3 class="event__title">${type} ${pointDestination.name}</h3>
        <div class="event__schedule">
          <p class="event__time">
            <time class="event__start-time" datetime="${formatDate(dateFrom, DateFormat.FULL_DATE_TIME)}">${formatDate(dateFrom, DateFormat.TIME)}</time>
            &mdash;
            <time class="event__end-time" datetime="${formatDate(dateTo, DateFormat.FULL_DATE_TIME)}">${formatDate(dateTo, DateFormat.TIME)}</time>
          </p>
          <p class="event__duration">${getTimeDifference(dateFrom, dateTo)}</p>
        </div>
        <p class="event__price">
          &euro;&nbsp;<span class="event__price-value">${basePrice}</span>
        </p>
        <h4 class="visually-hidden">Offers:</h4>
        <ul class="event__selected-offers">

        ${selectedOffers.map((off) => `<li class="event__offer">
            <span class="event__offer-title">${off.title}</span>
            &plus;&euro;&nbsp;
            <span class="event__offer-price">${off.price}</span>
          </li>`).join('')}

        </ul>
        <button class="event__favorite-btn ${favoriteClassName}" type="button">
          <span class="visually-hidden">Add to favorite</span>
          <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
            <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
          </svg>
        </button>
        <button class="event__rollup-btn" type="button">
          <span class="visually-hidden">Open event</span>
        </button>
      </div>
    </li>`);
};

export default class ItemPointView extends AbstractView {
  #point = null;
  #allOffers = null;
  #allDestinations = null;
  #handleRollupClick = null;
  #handleFavoriteClick = null;

  constructor({point, allOffers, allDestinations, onRollupClick, onFavoriteClick}) {
    super();
    this.#point = point;
    this.#allOffers = allOffers;
    this.#allDestinations = allDestinations;
    this.#handleRollupClick = onRollupClick;
    this.#handleFavoriteClick = onFavoriteClick;

    this.element.querySelector('.event__rollup-btn')
      .addEventListener('click', this.#onRollupClick);
    this.element.querySelector('.event__favorite-btn ')
      .addEventListener('click', this.#onFavoriteBtnClick);
  }

  get template() {
    return createItemPoint(this.#point, this.#allOffers, this.#allDestinations);
  }

  #onRollupClick = (evt) => {
    evt.preventDefault();
    this.#handleRollupClick();
  };

  #onFavoriteBtnClick = (evt) => {
    evt.preventDefault();
    this.#handleFavoriteClick();
  };
}
