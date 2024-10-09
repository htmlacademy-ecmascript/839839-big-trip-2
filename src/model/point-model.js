import { getRandomPoint } from '../mock/data.js';
import { mockDestinations } from '../mock/description.js';
import { mockOffers } from '../mock/offers.js';

const POINT_COUNT = 4;

export default class PointModel {
  #points = Array.from({length: POINT_COUNT}, getRandomPoint);
  #destinations = mockDestinations;
  #offers = mockOffers;

  get point() {
    return this.#points;
  }

  get destination() {
    return this.#destinations;
  }

  get offer() {
    return this.#offers;
  }
}
