import AbstractView from '../framework/view/abstract-view.js';
import { formatDate } from '../utils/utils.js';
import { DateFormat } from '../const.js';

const isChecked = (offer, selectedOffers) => selectedOffers.includes(offer) ? 'checked' : '';

const getListOffers = (allOffersByType, selectedOffers) =>
  allOffersByType.length ?
    `<section class="event__section  event__section--offers">
      <h3 class="event__section-title  event__section-title--offers">Offers</h3>
        <div class="event__available-offers">
          ${allOffersByType.map((offer) => (`
            <div class="event__offer-selector">
              <input class="event__offer-checkbox  visually-hidden" id="event-offer-${offer.id}" type="checkbox" name="event-offer-${offer.id}" ${isChecked(offer, selectedOffers)}>
              <label class="event__offer-label" for="event-offer-${offer.id}">
                <span class="event__offer-title">${offer.title}</span>
                +€&nbsp;
                <span class="event__offer-price">${offer.price}</span>
              </label>
            </div>
            `)).join('')}
        </div>
    </section>` : '';

const getPhotoContainer = (pictures) =>
  pictures.length ?
    `<div class="event__photos-container">
      <div class="event__photos-tape">
      ${pictures.map((pic) => (`
        <img class="event__photo" src="${pic.src}" alt="${pic.description}">
        `)).join('')}
    </div>
  </div>` : '';

const createOpenPoint = (point, allOffers, allDestinations) => {
  const {type, dateFrom, dateTo, basePrice} = point;

  const allOffersByType = allOffers.find((offer) => type === offer.type).offers;
  const poinDestination = allDestinations.find((dest) => point.destination === dest.id);
  const selectedOffers = allOffersByType.filter((offer) => point.offers.includes(offer.id));

  return(
    `<li class="trip-events__item">
      <form class="event event--edit" action="#" method="post">
        <header class="event__header">
          <div class="event__type-wrapper">
            <label class="event__type  event__type-btn" for="event-type-toggle-1">
              <span class="visually-hidden">Choose event type</span>
              <img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt="Event type icon">
            </label>
            <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

            <div class="event__type-list">
              <fieldset class="event__type-group">
                <legend class="visually-hidden">Event type</legend>

                  ${allOffers.map((offer) => `<div class="event__type-item">
                    <input id="event-type-${offer.type}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${offer.type}" checked>
                    <label class="event__type-label  event__type-label--${offer.type}" for="event-type-${offer.type}-1">${offer.type.charAt(0).toUpperCase() + offer.type.slice(1)}</label>
                  </div>`).join('')}

              </fieldset>
            </div>
          </div>

          <div class="event__field-group  event__field-group--destination">
            <label class="event__label  event__type-output" for="event-destination-1">
            ${type}
            </label>
            <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${poinDestination.name}" list="destination-list-1">
            <datalist id="destination-list-1">
            ${allDestinations.map((dest) => `<option value="${dest.name}"></option>`).join('')}
            </datalist>
          </div>

          <div class="event__field-group  event__field-group--time">
            <label class="visually-hidden" for="event-start-time-1">From</label>
            <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${formatDate(dateFrom, DateFormat.SHORT_DATE_TIME)}">
            &mdash;
            <label class="visually-hidden" for="event-end-time-1">To</label>
            <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${formatDate(dateTo, DateFormat.SHORT_DATE_TIME)}">
          </div>

          <div class="event__field-group  event__field-group--price">
            <label class="event__label" for="event-price-1">
              <span class="visually-hidden">Price</span>
              &euro;
            </label>
            <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${basePrice}">
          </div>

          <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
          <button class="event__reset-btn" type="reset">Delete</button>
          <button class="event__rollup-btn" type="button">
            <span class="visually-hidden">Open event</span>
          </button>
        </header>
        <section class="event__details">
          ${getListOffers(allOffersByType, selectedOffers)}

          <section class="event__section  event__section--destination">
            <h3 class="event__section-title  event__section-title--destination">Destination</h3>
            <p class="event__destination-description">${poinDestination.description}</p>

            ${getPhotoContainer(poinDestination.pictures)}
          </section>
        </section>
      </form>
    </li>`);
};

export default class OpenPointView extends AbstractView {
  #point = null;
  #allOffers = null;
  #allDestinations = null;
  #hendleButtonClick = null;

  constructor({point, allOffers, allDestinations, onFormClick}) {
    super();
    this.#point = point;
    this.#allOffers = allOffers;
    this.#allDestinations = allDestinations;
    this.#hendleButtonClick = onFormClick;

    this.element.querySelector('form').addEventListener('submit', this.#onSaveClick);
    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#onDeleteClick);
  }

  get template() {
    return createOpenPoint(this.#point, this.#allOffers, this.#allDestinations);
  }

  #onSaveClick = (evt) => {
    evt.preventDefault();
    this.#hendleButtonClick();
  };

  #onDeleteClick = (evt) => {
    evt.preventDefault();
    this.#hendleButtonClick();
  };
}
