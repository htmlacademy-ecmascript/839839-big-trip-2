import NewBriefTripInfo from './view/brief-trip-info.js';
import NewFormListFilters from './view/list-filter.js';
import NewTripSort from './view/trip-sort.js';
import {render, RenderPosition} from './render.js';
import BoardPresenter from './presenter/board-presenter.js';

const tripMainElement = document.querySelector('.trip-main');
const filtersElement = document.querySelector('.trip-controls__filters');
const siteMainElement = document.querySelector('.page-main');
const tripEventsElement = siteMainElement.querySelector('.trip-events');
const boardPresenter = new BoardPresenter({boardContainer:tripEventsElement});

render(new NewBriefTripInfo(), tripMainElement, RenderPosition.AFTERBEGIN);
render(new NewFormListFilters(), filtersElement);
render(new NewTripSort(), tripEventsElement);

boardPresenter.init();
