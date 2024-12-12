import { DateFormat } from '../const.js';
import AbstractView from '../framework/view/abstract-view.js';
import { formatDate } from '../utils/utils.js';

const formatRoute = (cities) => {
  const cityCount = cities.length;
  if (cityCount <= 2) {
    return cities.join(' — ');
  }
  return `${cities[0]} — ... — ${cities[cityCount - 1]}`;
};

const createRouteInfo = (namesOfCityDirections, dateFrom, dateTo, totalPrice) =>
  `<section class="trip-main__trip-info  trip-info">
    <div class="trip-info__main">
      <h1 class="trip-info__title">${formatRoute(namesOfCityDirections)}</h1>

      <p class="trip-info__dates">${formatDate(dateFrom, DateFormat.ROUTE)} &mdash; ${formatDate(dateTo, DateFormat.ROUTE)}</p>
    </div>

    <p class="trip-info__cost">
      Total: &euro;&nbsp;<span class="trip-info__cost-value">${totalPrice}</span>
    </p>
  </section>`;

export default class RouteView extends AbstractView {
  #namesOfCityDirections = null;
  #dateFrom = null;
  #dateTo = null;
  #totalPrice = null;

  constructor({ namesOfCityDirections, dateFrom, dateTo, totalPrice }) {
    super();
    this.#namesOfCityDirections = namesOfCityDirections;
    this.#dateFrom = dateFrom;
    this.#dateTo = dateTo;
    this.#totalPrice = totalPrice;
  }

  get template() {
    return createRouteInfo(this.#namesOfCityDirections, this.#dateFrom, this.#dateTo,this.#totalPrice);
  }
}
