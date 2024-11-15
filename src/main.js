import RouteView from './view/route-view.js';
import FiltersView from './view/filters-view.js';
import SortView from './view/sort-view.js';
import { render, RenderPosition } from './framework/render.js';
import TripPresenter from './presenter/trip-presenter.js';
import PointModel from './model/point-model.js';
import { generateFilter } from './utils/filter.js';

const tripMainElement = document.querySelector('.trip-main');
const filtersElement = document.querySelector('.trip-controls__filters');
const siteMainElement = document.querySelector('.page-main');
const tripEventsElement = siteMainElement.querySelector('.trip-events');

const pointModel = new PointModel();
const tripPresenter = new TripPresenter({
  tripContainer: tripEventsElement,
  pointModel
});

const filters = generateFilter(pointModel.point);

render(new RouteView(), tripMainElement, RenderPosition.AFTERBEGIN);
render(new FiltersView({filters}), filtersElement);
render(new SortView(), tripEventsElement);

tripPresenter.init();
