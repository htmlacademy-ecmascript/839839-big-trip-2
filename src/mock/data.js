import { FAVORITE } from './const.js';
import { getRandomArrayElement } from './util.js';
import { mockDestinations } from './description.js';

const mockData = [
  {
    id: '1',
    type: 'taxi',
    dateFrom: '2019-03-10T10:55:00.845Z',
    dateTo: '2019-03-11T11:50:00.845Z',
    destination: getRandomArrayElement(mockDestinations).id,
    offers: [1, 3],
    basePrice: 236,
    isFavorite: getRandomArrayElement(FAVORITE),
  },
  {
    id: '2',
    type: 'bus',
    dateFrom: '2022-07-22T22:00:00',
    dateTo: '2022-07-23T11:15:00',
    destination: getRandomArrayElement(mockDestinations).id,
    offers: [6, 7],
    basePrice: 160,
    isFavorite: getRandomArrayElement(FAVORITE),
  },
  {
    id: '3',
    type: 'train',
    dateFrom: '2024-09-10T22:40:56',
    dateTo: '2024-09-11T11:00:13',
    destination: getRandomArrayElement(mockDestinations).id,
    offers: [9],
    basePrice: 345,
    isFavorite: getRandomArrayElement(FAVORITE),
  },
  {
    id: '4',
    type: 'ship',
    dateFrom: '2024-11-10T14:00:00',
    dateTo: '2024-11-11T15:00:00',
    destination: getRandomArrayElement(mockDestinations).id,
    offers: [11, 12],
    basePrice: 545,
    isFavorite: getRandomArrayElement(FAVORITE),
  },
  {
    id: '5',
    type: 'drive',
    dateFrom: '2024-12-10T12:00:00',
    dateTo: '2024-12-11T16:00:00',
    destination: getRandomArrayElement(mockDestinations).id,
    offers: [],
    basePrice: 126,
    isFavorite: getRandomArrayElement(FAVORITE),
  },
  {
    id: '6',
    type: 'restaurant',
    dateFrom: '2024-12-11T11:30:00',
    dateTo: '2024-12-11T14:00:00',
    destination: getRandomArrayElement(mockDestinations).id,
    offers: [17],
    basePrice: 126,
    isFavorite: getRandomArrayElement(FAVORITE),
  },
  {
    id: '7',
    type: 'sightseeing',
    dateFrom: '2025-12-09T15:00:00',
    dateTo: '2025-12-11T16:00:00',
    destination: getRandomArrayElement(mockDestinations).id,
    offers: [],
    basePrice: 126,
    isFavorite: getRandomArrayElement(FAVORITE),
  },
];

const getRandomPoint = () =>
  getRandomArrayElement(mockData);

export { getRandomPoint };
