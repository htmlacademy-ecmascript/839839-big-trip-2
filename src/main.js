
import TripPresenter from './presenter/trip-presenter.js';
import PointModel from './model/point-model.js';
import OfferModel from './model/offer-model.js';
import DestinationModel from './model/destination-model.js';

const tripMainElement = document.querySelector('.trip-main');
const filtersElement = document.querySelector('.trip-controls__filters');
const tripEventsElement = document.querySelector('.trip-events');

const pointModel = new PointModel();
const offerModel = new OfferModel();
const destinationModel = new DestinationModel();

const tripPresenter = new TripPresenter({
  tripContainer: tripEventsElement,
  pointModel,
  offerModel,
  destinationModel,
  tripMainElement,
  filtersElement,
  tripEventsElement
});

tripPresenter.init();
