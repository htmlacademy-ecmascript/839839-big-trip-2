import { TYPE, FAVORITE } from './const.js';
import { randomIntegerNumber } from './util.js';
import { destinations } from './description.js';

const mockData = [
  {
    id: '1',
    type: TYPE[randomIntegerNumber(TYPE.length)],
    dateFrom: '2019-07-10T22:55:56.845Z',
    dateTo: '2019-07-11T11:22:13.375Z',
    destination: destinations[randomIntegerNumber(destinations.length)].id,
    offers: [1],
    basePrice: randomIntegerNumber(1500),
    isFavorite: FAVORITE[randomIntegerNumber(FAVORITE.length)],
  },
  {
    id: '2',
    type: TYPE[randomIntegerNumber(TYPE.length)],
    dateFrom: '2019-07-22T22:55:56.845Z',
    dateTo: '2019-07-23T11:22:13.375Z',
    destination: destinations[randomIntegerNumber(destinations.length)].id,
    offers: [1, 3],
    basePrice: randomIntegerNumber(1500),
    isFavorite: FAVORITE[randomIntegerNumber(FAVORITE.length)],
  },
  {
    id: '3',
    type: TYPE[randomIntegerNumber(TYPE.length)],
    dateFrom: '2019-08-10T22:55:56.845Z',
    dateTo: '2019-09-11T11:22:13.375Z',
    destination: destinations[randomIntegerNumber(destinations.length)].id,
    offers: [2],
    basePrice: randomIntegerNumber(1500),
    isFavorite: FAVORITE[randomIntegerNumber(FAVORITE.length)],
  },
];

export { mockData };
