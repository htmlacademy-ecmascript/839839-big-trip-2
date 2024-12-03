import { FAVORITE } from './const.js';
import { getRandomArrayElement } from './util.js';
import { mockDestinations } from './description.js';
import { nanoid } from 'nanoid';

const mockData = [
  {
    id: '1',
    type: 'taxi',
    dateFrom: '2018-05-01T09:00:00.000Z',
    dateTo: '2018-05-01T11:00:00.000Z',
    destination: getRandomArrayElement(mockDestinations).id,
    offers: ['1', '3'],
    basePrice: 236,
    isFavorite: getRandomArrayElement(FAVORITE),
  },
  {
    id: '2',
    type: 'bus',
    dateFrom: '2021-03-25T08:00:00.000Z',
    dateTo: '2021-03-25T10:00:00.000Z',
    destination: getRandomArrayElement(mockDestinations).id,
    offers: ['6', '7'],
    basePrice: 160,
    isFavorite: getRandomArrayElement(FAVORITE),
  },
  {
    id: '3',
    type: 'train',
    dateFrom: '2024-02-20T12:00:00.000Z',
    dateTo: '2024-02-25T16:00:00.000Z',
    destination: getRandomArrayElement(mockDestinations).id,
    offers: ['9'],
    basePrice: 345,
    isFavorite: getRandomArrayElement(FAVORITE),
  },
  {
    id: '4',
    type: 'ship',
    dateFrom: '2026-07-28T09:15:00.000Z',
    dateTo: '2026-08-02T09:45:00.000Z',
    destination: getRandomArrayElement(mockDestinations).id,
    offers: ['11', '12'],
    basePrice: 545,
    isFavorite: getRandomArrayElement(FAVORITE),
  },
  {
    id: '5',
    type: 'drive',
    dateFrom: '2025-01-15T10:00:00.000Z',
    dateTo: '2025-01-17T10:00:00.000Z',
    destination: getRandomArrayElement(mockDestinations).id,
    offers: [],
    basePrice: 126,
    isFavorite: getRandomArrayElement(FAVORITE),
  },
  {
    id: '6',
    type: 'restaurant',
    dateFrom: '2028-04-12T16:00:00.000Z',
    dateTo: '2028-04-12T18:30:00.000Z',
    destination: getRandomArrayElement(mockDestinations).id,
    offers: ['23'],
    basePrice: 126,
    isFavorite: getRandomArrayElement(FAVORITE),
  },
  {
    id: '7',
    type: 'sightseeing',
    dateFrom: '2027-10-02T15:00:00.000Z',
    dateTo: '2027-10-02T17:00:00.000Z',
    destination: getRandomArrayElement(mockDestinations).id,
    offers: [],
    basePrice: 126,
    isFavorite: getRandomArrayElement(FAVORITE),
  },
];

const getRandomPoint = () =>
  (
    {
      ...getRandomArrayElement(mockData),
      id: nanoid(),
    }
  );

export { getRandomPoint };
