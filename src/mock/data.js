import { TYPE, FAVORITE } from './const.js';
import { randomIntegerNumber, createIntegerIndex } from './util.js';

const pointId = createIntegerIndex();
const offersId = createIntegerIndex();

const mockData = {
  id: pointId(),
  type: TYPE[randomIntegerNumber(TYPE.length)],
  startTime: '19/03/19 10:00',
  endTime: '19/03/19 10:40',
  destination: {
    name: '',
    photo: '#',
    description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
  },
  offers: [
    {
      id: offersId(),
      title: 'Дополнительная опция',
      prise: randomIntegerNumber(200),
    }
  ],
  prise: randomIntegerNumber(2000),
  isFavorite: FAVORITE[randomIntegerNumber(FAVORITE.length)],
};

export { mockData };
