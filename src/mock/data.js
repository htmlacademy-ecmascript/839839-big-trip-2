import { TYPE, FAVORITE } from './const.js';
import { getRandomArrayElement } from './util.js';
import { destinations } from './description.js';

const mockData = [
  {
    id: '1',
    type: getRandomArrayElement(TYPE),
    dateFrom: '2019-07-10T22:55:56.845Z',
    dateTo: '2019-07-11T11:22:13.375Z',
    destination: getRandomArrayElement(destinations).id,
    offers: [1],
    basePrice: 936,
    isFavorite: getRandomArrayElement(FAVORITE),
  },
  {
    id: '2',
    type: getRandomArrayElement(TYPE),
    dateFrom: '2019-07-22T22:55:56.845Z',
    dateTo: '2019-07-23T11:22:13.375Z',
    destination: getRandomArrayElement(destinations).id,
    offers: [1, 3],
    basePrice: 1560,
    isFavorite: getRandomArrayElement(FAVORITE),
  },
  {
    id: '3',
    type: getRandomArrayElement(TYPE),
    dateFrom: '2019-08-10T22:55:56.845Z',
    dateTo: '2019-09-11T11:22:13.375Z',
    destination: getRandomArrayElement(destinations).id,
    offers: [2],
    basePrice: 845,
    isFavorite: getRandomArrayElement(FAVORITE),
  },
];

const getRandomPoint = () =>
  getRandomArrayElement(mockData);

export { getRandomPoint };
