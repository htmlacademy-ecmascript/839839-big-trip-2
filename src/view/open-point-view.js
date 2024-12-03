import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';
import { formatDate } from '../utils/utils.js';
import { DateFormat } from '../const.js';

const isChecked = (offer, selectedOffers) => selectedOffers.includes(offer) ? 'checked' : '';
const isCheckedType = (pointType, offerType) => pointType === offerType ? 'checked' : '';

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
  const {dateFrom, dateTo, basePrice, isTypePoint, isDestinationId, isOffersId} = point;

  const allOffersByType = allOffers.find((offer) => isTypePoint === offer.type).offers;
  const poinDestination = allDestinations.find((dest) => isDestinationId === dest.id);
  const selectedOffers = allOffersByType.filter((offer) => isOffersId.includes(offer.id));

  return(
    `<li class="trip-events__item">
      <form class="event event--edit" action="#" method="post">
        <header class="event__header">
          <div class="event__type-wrapper">
            <label class="event__type  event__type-btn" for="event-type-toggle-${point.id}">
              <span class="visually-hidden">Choose event type</span>
              <img class="event__type-icon" width="17" height="17" src="img/icons/${isTypePoint}.png" alt="Event type icon">
            </label>
            <input class="event__type-toggle  visually-hidden" id="event-type-toggle-${point.id}" type="checkbox">

            <div class="event__type-list">
              <fieldset class="event__type-group">
                <legend class="visually-hidden">Event type</legend>

                  ${allOffers.map((offer) => `<div class="event__type-item">
                    <input id="event-type-${offer.type}-${point.id}" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${offer.type}" ${isCheckedType(isTypePoint, offer.type)}>
                    <label class="event__type-label  event__type-label--${offer.type}" for="event-type-${offer.type}-${point.id}">${offer.type.charAt(0).toUpperCase() + offer.type.slice(1)}</label>
                  </div>`).join('')}

              </fieldset>
            </div>
          </div>

          <div class="event__field-group  event__field-group--destination">
            <label class="event__label  event__type-output" for="event-destination-${point.id}">
            ${isTypePoint}
            </label>
            <input class="event__input  event__input--destination" id="event-destination-${point.id}" type="text" name="event-destination" value="${poinDestination.name}" list="destination-list-${point.id}">
            <datalist id="destination-list-${point.id}">
            ${allDestinations.map((dest) => `<option value="${dest.name}"></option>`).join('')}
            </datalist>
          </div>

          <div class="event__field-group  event__field-group--time">
            <label class="visually-hidden" for="event-start-time-${point.id}">From</label>
            <input class="event__input  event__input--time" id="event-start-time-${point.id}" type="text" name="event-start-time" value="${formatDate(dateFrom, DateFormat.SHORT_DATE_TIME)}">
            &mdash;
            <label class="visually-hidden" for="event-end-time-${point.id}">To</label>
            <input class="event__input  event__input--time" id="event-end-time-${point.id}" type="text" name="event-end-time" value="${formatDate(dateTo, DateFormat.SHORT_DATE_TIME)}">
          </div>

          <div class="event__field-group  event__field-group--price">
            <label class="event__label" for="event-price-${point.id}">
              <span class="visually-hidden">Price</span>
              &euro;
            </label>
            <input class="event__input  event__input--price" id="event-price-${point.id}" type="text" name="event-price" value="${basePrice}">
          </div>

          <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
          <button class="event__reset-btn" type="reset">Delete</button>
          <button class="event__rollup-btn" type="button">
            <span class="visually-hidden">Open event</span>
          </button>
        </header>
        <section class="event__details">
          ${getListOffers(allOffersByType, selectedOffers)}

          ${!!poinDestination.description || !!poinDestination.pictures.length ? `<section class="event__section  event__section--destination">
            <h3 class="event__section-title  event__section-title--destination">Destination</h3>
            <p class="event__destination-description">${poinDestination.description}</p>
            ${getPhotoContainer(poinDestination.pictures)}
          </section>` : ''}

        </section>
      </form>
    </li>`);
};

export default class OpenPointView extends AbstractStatefulView {
  #point = null;
  #allOffers = null;
  #allDestinations = null;
  #handleButtonClick = null;
  #handleFormSubmit = null;

  constructor({point, allOffers, allDestinations, onFormClick, onFormSubmit}) {
    super();
    this._setState(OpenPointView.parsePointToState(point));
    this.#point = point;
    this.#allOffers = allOffers;
    this.#allDestinations = allDestinations;
    this.#handleButtonClick = onFormClick;
    this.#handleFormSubmit = onFormSubmit;

    this._restoreHandlers();
  }

  get template() {
    return createOpenPoint(this._state, this.#allOffers, this.#allDestinations);
  }

  /**
   * Сбрасывает состояние элемента, обновляя его на основе переданной точки.
   * @param {Object} point - Точка с начальными данными.
   */
  reset(point) {
    this.updateElement(OpenPointView.parsePointToState(point));
  }

  _restoreHandlers() {
    this.element.querySelector('form').addEventListener('submit', this.#onSaveClick);
    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#onDeleteClick);
    this.element.querySelector('.event__input--destination').addEventListener('change', this.#onCityChange);
    this.element.querySelector('.event__type-group').addEventListener('change', this.#onTypeChange);
    const offersList = this.element.querySelector('.event__available-offers');
    if (offersList) {
      offersList.addEventListener('change', this.#onOffersChange);
    }
  }

  #onSaveClick = (evt) => {
    evt.preventDefault();
    this.#handleFormSubmit(OpenPointView.parseStateToPoint(this._state));
  };

  #onDeleteClick = (evt) => {
    evt.preventDefault();
    this.#handleButtonClick();
  };

  #onTypeChange = (evt)=> {
    evt.preventDefault();
    this.updateElement({
      isTypePoint: evt.target.value,
      isOffersId: []
    });
  };

  #onCityChange = (evt) => {
    evt.preventDefault();
    const newIdDestination = this.#allDestinations.find((des) => des.name === evt.target.value);
    this.updateElement({
      isDestinationId: newIdDestination.id,
    });
  };

  #onOffersChange = (evt) => {
    const offerId = evt.target.id.split('-')[2];
    let updateOffers = [...this._state.isOffersId];
    if (evt.target.checked) {
      updateOffers.push(offerId);
    } else {
      updateOffers = updateOffers.filter((id) => id !== offerId);
    }

    this.updateElement({
      isOffersId: updateOffers,
    });
  };

  static parsePointToState = (point) =>
    ({
      ...point,
      isTypePoint: point.type,
      isDestinationId: point.destination,
      isOffersId: [...point.offers]
    });

  static parseStateToPoint = (state) => {
    const point = {...state};

    point.type = point.isTypePoint;
    point.destination = point.isDestinationId;
    point.offers = point.isOffersId;

    delete point.isTypePoint;
    delete point.isDestinationId;
    delete point.isOffersId;

    return point;
  };
}
