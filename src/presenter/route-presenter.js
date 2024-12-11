import { remove, render, RenderPosition, replace } from '../framework/render.js';
import RouteView from '../view/route-view.js';

export default class RoutePresenter {
  #routeContainer = null;
  #pointModel = null;
  #offerModel = null;
  #destinationModel = null;

  #routeComponent = null;

  constructor({ routeContainer, pointModel, offerModel, destinationModel }) {
    this.#routeContainer = routeContainer;
    this.#pointModel = pointModel;
    this.#offerModel = offerModel;
    this.#destinationModel = destinationModel;

    this.#pointModel.addObserver(this.#handleModelEvent);
  }

  get dateFrom() {
    const points = this.#pointModel.points;
    return points[0].dateFrom;
  }

  get dateTo() {
    const points = this.#pointModel.points;
    return points.at(-1).dateTo;
  }

  get nameOfDestinationCity() {
    const points = this.#pointModel.points;
    const destinations = points.map((point) =>
      this.#destinationModel.destinations.find((des) => des.id === point.destination));
    const nameDestination = [];
    destinations.forEach((item) => {
      nameDestination.push(item.name);
    });
    return nameDestination;
  }

  get totalPrice() {
    const points = this.#pointModel.points;
    let sumBasePrice = points.reduce((accum, item) => accum + item.basePrice, 0);
    points.map((point) => {
      const offersByType = this.#offerModel.offers.find((off) => off.type === point.type).offers;
      const sumOffers = offersByType.filter((off) => point.offers.includes(off.id)).reduce((accum, item) => accum + item.price, 0);
      sumBasePrice += sumOffers;
    });
    return sumBasePrice;
  }

  init() {
    const prevRouteComponent = this.#routeComponent;
    if (this.#pointModel.points.length) {
      const dateFrom = this.dateFrom;
      const dateTo = this.dateTo;
      const namesOfCityDirections = this.nameOfDestinationCity;
      const totalPrice = this.totalPrice;

      this.#routeComponent = new RouteView({ namesOfCityDirections, dateFrom, dateTo, totalPrice });
      if (prevRouteComponent === null) {
        render(this.#routeComponent, this.#routeContainer, RenderPosition.AFTERBEGIN);
        return;
      }
      replace(this.#routeComponent, prevRouteComponent);
    }

    remove(prevRouteComponent);
  }

  destroy = () => {
    if (this.#routeComponent === null) {
      return;
    }

    remove(this.#routeComponent);
    this.#routeComponent = null;
  };

  #handleModelEvent = () => {
    this.init();
  };
}
