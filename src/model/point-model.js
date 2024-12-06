import Observable from '../framework/observable.js';
import { getRandomPoint } from '../mock/data.js';
import { mockDestinations } from '../mock/description.js';
import { mockOffers } from '../mock/offers.js';

const POINT_COUNT = 4;

export default class PointModel extends Observable {
  #points = Array.from({length: POINT_COUNT}, getRandomPoint);
  #allDestinations = mockDestinations;
  #allOffers = mockOffers;

  get points() {
    return this.#points;
  }

  get destination() {
    return this.#allDestinations;
  }

  get offer() {
    return this.#allOffers;
  }
}
