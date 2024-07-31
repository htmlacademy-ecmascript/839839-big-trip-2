import RouteView from './view/route-view.js';
import FiltersView from './view/filters-view.js';
import SortView from './view/sort-view.js';
import { render, RenderPosition } from './render.js';
import TripPresenter from './presenter/trip-presenter.js';

const tripMainElement = document.querySelector('.trip-main');
const filtersElement = document.querySelector('.trip-controls__filters');
const siteMainElement = document.querySelector('.page-main');
const tripEventsElement = siteMainElement.querySelector('.trip-events');
const tripPresenter = new TripPresenter({ boardContainer: tripEventsElement });

render(new RouteView(), tripMainElement, RenderPosition.AFTERBEGIN);
render(new FiltersView(), filtersElement);
render(new SortView(), tripEventsElement);

tripPresenter.init();
