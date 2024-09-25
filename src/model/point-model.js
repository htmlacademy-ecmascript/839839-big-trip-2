import { getRandomPoint } from '../mock/data.js';
import { mockDestinations } from '../mock/description.js';
import { mockOffers } from '../mock/offers.js';

const POINT_COUTN = 4;

export default class PointModel {
  points = Array.from({length: POINT_COUTN}, getRandomPoint);
  destinations = mockDestinations;
  offers = mockOffers;

  getPoint() {
    return this.points;
  }

  getDestination() {
    return this.destinations;
  }

  getOffer() {
    return this.offers;
  }
}
