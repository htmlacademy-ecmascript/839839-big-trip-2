import LoaderTemplate from './view/loading-view.js';
import {render} from './render.js';

const siteMainElement = document.querySelector('.page-main');
const tripEventsElement = siteMainElement.querySelector('.trip-events');

render(new LoaderTemplate(), tripEventsElement);
