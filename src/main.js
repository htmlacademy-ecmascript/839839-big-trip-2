import NewFormListFilters from './view/list-filter.js';
import LoaderTemplate from './view/loading-view.js';
import {render} from './render.js';

const filtersElement = document.querySelector('.trip-controls__filters');
const siteMainElement = document.querySelector('.page-main');
const tripEventsElement = siteMainElement.querySelector('.trip-events');

render(new NewFormListFilters(), filtersElement);
render(new LoaderTemplate(), tripEventsElement);
