import { getRandomPoint } from '../mock/data.js';

export default class PointModel {
  points = Array.from({length: 3}, getRandomPoint);

  getPoint() {
    return this.points;
  }
}
