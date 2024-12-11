import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';
import { formatDate, formatDateIso } from '../utils/utils.js';
import { DateFormat } from '../const.js';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const newPointDefault =
  {
    type: 'flight',
    dateFrom: '',
    dateTo: '',
    destination: '',
    offers: [],
    basePrice: 0,
    isFavorite: false,
  };

const isCheckDescription = (description) => description ? description.name : '' ;
const isChecked = (offer, selectedOffers) => selectedOffers.includes(offer) ? 'checked' : '';
const isCheckedType = (pointType, offerType) => pointType === offerType ? 'checked' : '';

const getListOffers = (allOffersByType, selectedOffers, isDisabled) =>
  allOffersByType.length ?
    `<section class="event__section  event__section--offers">
      <h3 class="event__section-title  event__section-title--offers">Offers</h3>
        <div class="event__available-offers">
          ${allOffersByType.map((offer) => (`
            <div class="event__offer-selector">
              <input class="event__offer-checkbox visually-hidden" id="event-offer-${offer.id}" type="checkbox" name="event-offer-${offer.id}" ${isChecked(offer, selectedOffers)} ${isDisabled ? 'disabled' : ''}>
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

const createOpenPoint = (point, allOffers, allDestinations, isNewPoint) => {
  const {isDateFrom, isDateTo, isTypePoint, isDestinationId, isOffersId, isPrice, isDisabled, isSaving, isDeleting} = point;

  const allOffersByType = allOffers.find((offer) => isTypePoint === offer.type).offers;
  const pointDestination = allDestinations.find((dest) => isDestinationId === dest.id);
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
            <input class="event__type-toggle  visually-hidden" id="event-type-toggle-${point.id}" type="checkbox" ${isDisabled ? 'disabled' : ''}>

            <div class="event__type-list">
              <fieldset class="event__type-group" ${isDisabled ? 'disabled' : ''}>
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
            <input class="event__input  event__input--destination" id="event-destination-${point.id}" type="text" name="event-destination" value="${isCheckDescription(pointDestination)}" list="destination-list-${point.id}" required ${isDisabled ? 'disabled' : ''}>
            <datalist id="destination-list-${point.id}">
            ${allDestinations.map((dest) => `<option value="${dest.name}"></option>`).join('')}
            </datalist>
          </div>

          <div class="event__field-group  event__field-group--time">
            <label class="visually-hidden" for="event-start-time-${point.id}">From</label>
            <input class="event__input  event__input--time" id="event-start-time-${point.id}" type="text" name="event-start-time" value="${formatDate(isDateFrom, DateFormat.SHORT_DATE_TIME)}" required ${isDisabled ? 'disabled' : ''}>
            &mdash;
            <label class="visually-hidden" for="event-end-time-${point.id}">To</label>
            <input class="event__input  event__input--time" id="event-end-time-${point.id}" type="text" name="event-end-time" value="${formatDate(isDateTo, DateFormat.SHORT_DATE_TIME)}" required ${isDisabled ? 'disabled' : ''}>
          </div>

          <div class="event__field-group  event__field-group--price">
            <label class="event__label" for="event-price-${point.id}">
              <span class="visually-hidden">Price</span>
              &euro;
            </label>
            <input class="event__input  event__input--price" id="event-price-${point.id}" type="number" min="1" step="1" name="event-price" value="${isPrice}" required ${isDisabled ? 'disabled' : ''}>
          </div>

          <button class="event__save-btn  btn  btn--blue" type="submit" >${isSaving ? 'Saving...' : 'Save'}</button>
          <button class="event__reset-btn" type="reset">${isNewPoint ? 'Cancel' : `${isDeleting ? 'Deleting...' : 'Delete'}`}</button>
          <button class="event__rollup-btn" type="button">
            <span class="visually-hidden">Open event</span>
          </button>
        </header>
        <section class="event__details">
          ${getListOffers(allOffersByType, selectedOffers, isDisabled)}

          ${pointDestination && (pointDestination.description || (pointDestination.pictures && pointDestination.pictures.length > 0)) ? `<section class="event__section  event__section--destination">
            <h3 class="event__section-title  event__section-title--destination">Destination</h3>
            <p class="event__destination-description">${pointDestination.description || ''}</p>
            ${getPhotoContainer(pointDestination.pictures)}
          </section>` : ''}

        </section>
      </form>
    </li>`);
};

export default class OpenPointView extends AbstractStatefulView {
  #allOffers = null;
  #allDestinations = null;
  #handleButtonClick = null;
  #handleFormSubmit = null;
  #handleDeleteClick = null;
  #datepickerFrom = null;
  #datepickerTo = null;
  #isNewPoint = null;

  constructor({point = newPointDefault, allOffers, allDestinations, onFormClick, onFormSubmit, onDeleteClick}) {
    super();
    this._setState(OpenPointView.parsePointToState(point));
    this.#allOffers = allOffers;
    this.#allDestinations = allDestinations;
    this.#handleButtonClick = onFormClick;
    this.#handleFormSubmit = onFormSubmit;
    this.#handleDeleteClick = onDeleteClick;
    if (point === newPointDefault) {
      this.#isNewPoint = true;
    }

    this._restoreHandlers();
  }

  get template() {
    return createOpenPoint(this._state, this.#allOffers, this.#allDestinations, this.#isNewPoint);
  }

  /**
   * Сбрасывает состояние элемента, обновляя его на основе переданной точки.
   * @param {Object} point - Точка с начальными данными.
   */
  reset(point) {
    this.updateElement(OpenPointView.parsePointToState(point));
  }

  removeElement() {
    super.removeElement();

    if(this.#datepickerFrom) {
      this.#datepickerFrom.destroy();
      this.#datepickerFrom = null;
    }

    if(this.#datepickerTo) {
      this.#datepickerTo.destroy();
      this.#datepickerTo = null;
    }
  }

  _restoreHandlers() {
    this.element.querySelector('form').addEventListener('submit', this.#onSaveClick);

    const rollupBtn = this.element.querySelector('.event__rollup-btn');
    if (rollupBtn) {
      rollupBtn.addEventListener('click', this.#onRollupBtnClick);
    }

    this.element.querySelector('.event__input--destination').addEventListener('change', this.#onCityChange);
    this.element.querySelector('.event__type-group').addEventListener('change', this.#onTypeChange);
    this.element.querySelector('.event__input--price').addEventListener('change', this.#onPriceChange);
    this.element.querySelector('.event__reset-btn').addEventListener('click', this.#onDeleteBtnClick);
    const offersList = this.element.querySelector('.event__available-offers');
    if (offersList) {
      offersList.addEventListener('change', this.#onOffersChange);
    }

    this.#setDatepickerStart();
    this.#setDatepickerEnd();
  }

  #onSaveClick = (evt) => {
    evt.preventDefault();
    const { isDestinationId, isPrice, isDateFrom, isDateTo } = this._state;

    if (isDestinationId && isPrice && isDateFrom && isDateTo) {
      this.#handleFormSubmit(OpenPointView.parseStateToPoint(this._state));
    }
  };

  #onDeleteBtnClick = (evt) => {
    evt.preventDefault();
    this.#handleDeleteClick(OpenPointView.parseStateToPoint(this._state));
  };

  #onRollupBtnClick = (evt) => {
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
    const value = evt.target.value;
    const options = this.#allDestinations.map((option) => option.name);

    if (!options.includes(value)) {
      evt.target.setCustomValidity('Пожалуйста, выберите город из предложенного списка.');
    }

    const newIdDestination = this.#allDestinations.find((des) => des.name === evt.target.value);
    if(newIdDestination) {
      this.updateElement({
        isDestinationId: newIdDestination.id,
      });
    }

  };

  #onOffersChange = (evt) => {
    const offerId = evt.target.id.replace('event-offer-', '');
    let updateOffers = [...this._state.isOffersId];
    if (evt.target.checked) {
      updateOffers.push(offerId);
    } else {
      updateOffers = updateOffers.filter((id) => id !== offerId);
    }

    this._setState({
      isOffersId: updateOffers,
    });
  };

  #onPriceChange = (evt) => {
    evt.preventDefault();
    this._setState({
      isPrice: Number(evt.target.value),
    });
  };

  #dateFromChangeHandler = ([userDate]) => {
    this.updateElement({
      isDateFrom: formatDateIso(userDate),
    });
  };

  #dateToChangeHandler = ([userDate]) => {
    this._setState({
      isDateTo: formatDateIso(userDate),
    });
  };

  #setDatepickerStart() {
    this.#datepickerFrom = flatpickr(
      this.element.querySelector('[name="event-start-time"]'),
      {
        dateFormat: 'd/m/y H:i',
        defaultDate: this._state.isDateFrom,
        enableTime: true,
        'time_24hr': true,
        onChange: this.#dateFromChangeHandler,
      }
    );
  }

  #setDatepickerEnd() {
    this.#datepickerFrom = flatpickr(
      this.element.querySelector('[name="event-end-time"]'),
      {
        dateFormat: 'd/m/y H:i',
        defaultDate: this._state.isDateTo,
        enableTime: true,
        'time_24hr': true,
        onChange: this.#dateToChangeHandler,
        minDate: this._state.isDateFrom,
      }
    );
  }

  static parsePointToState = (point) =>
    ({
      ...point,
      isTypePoint: point.type,
      isDestinationId: point.destination,
      isOffersId: [...point.offers],
      isDateFrom: point.dateFrom,
      isDateTo: point.dateTo,
      isPrice: point.basePrice,
      isDisabled: false,
      isSaving: false,
      isDeleting: false,
    });

  static parseStateToPoint = (state) => {
    const point = {...state};

    point.type = point.isTypePoint;
    point.destination = point.isDestinationId;
    point.offers = point.isOffersId;
    point.dateFrom = point.isDateFrom;
    point.dateTo = point.isDateTo;
    point.basePrice = point.isPrice;

    delete point.isTypePoint;
    delete point.isDestinationId;
    delete point.isOffersId;
    delete point.isDateFrom;
    delete point.isDateTo;
    delete point.isPrice;
    delete point.isDisabled;
    delete point.isSaving;
    delete point.isDeleting;

    return point;
  };
}
