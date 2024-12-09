
import TripPresenter from './presenter/trip-presenter.js';
import FilterPresenter from './presenter/filter-presenter.js';
import PointModel from './model/point-model.js';
import OfferModel from './model/offer-model.js';
import DestinationModel from './model/destination-model.js';
import FilterModel from './model/filter-model.js';
import PointsApiService from './points-api-service.js';
import ButtonNewEventView from './view/button-new-event-view.js';
import { render } from './framework/render.js';

const AUTHORIZATION = 'Basic majdhj7Hjf';
const END_POINT = 'https://22.objects.htmlacademy.pro/big-trip';

const tripMainElement = document.querySelector('.trip-main');
const filtersElement = document.querySelector('.trip-controls__filters');
const tripEventsElement = document.querySelector('.trip-events');

const pointModel = new PointModel({
  pointsApiService: new PointsApiService(END_POINT, AUTHORIZATION)
});
const offerModel = new OfferModel({
  pointsApiService: new PointsApiService(END_POINT, AUTHORIZATION)
});
const destinationModel = new DestinationModel({
  pointsApiService: new PointsApiService(END_POINT, AUTHORIZATION)
});
const filterModel = new FilterModel();

const tripPresenter = new TripPresenter({
  tripContainer: tripEventsElement,
  pointModel,
  offerModel,
  destinationModel,
  tripMainElement,
  tripEventsElement,
  filterModel,
  onNewEventDestroy: handleNewEventFormClose
});

const filterPresenter = new FilterPresenter({
  filterContainer: filtersElement,
  filterModel,
  pointModel
});

const buttonNewEventComponent = new ButtonNewEventView({
  onClick: handleNewEventButtonClick
});

function handleNewEventFormClose() {
  buttonNewEventComponent.element.disabled = false;
}

function handleNewEventButtonClick() {
  tripPresenter.createPoint();
  buttonNewEventComponent.element.disabled = true;
}

render(buttonNewEventComponent, tripMainElement);

filterPresenter.init();
tripPresenter.init();
