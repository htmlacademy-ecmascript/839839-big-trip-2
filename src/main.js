
import TripPresenter from './presenter/trip-presenter.js';
import PointModel from './model/point-model.js';

const tripMainElement = document.querySelector('.trip-main');
const filtersElement = document.querySelector('.trip-controls__filters');
const tripEventsElement = document.querySelector('.trip-events');

const pointModel = new PointModel();
const tripPresenter = new TripPresenter({
  tripContainer: tripEventsElement,
  pointModel,
  tripMainElement,
  filtersElement,
  tripEventsElement
});

tripPresenter.init();
