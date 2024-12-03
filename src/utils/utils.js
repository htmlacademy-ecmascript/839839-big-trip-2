import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import { DateFormat, Period } from '../const.js';
dayjs.extend(duration);

const formatDate = (date, format = DateFormat.SHORT_DATE_TIME) =>
  date ? dayjs(date).format(format) : '';

const getTimeDifference = (dateStart, dateEnd) => {
  const difference = dayjs(dateEnd).diff(dayjs(dateStart), 'minute');

  const timeLength = dayjs.duration(difference, 'minutes');

  if (difference < Period.HOUR) {
    return `${timeLength.minutes()}m`;
  }

  if (difference < Period.DAY) {
    return `${timeLength.hours()}h ${timeLength.minutes()}m`;
  }

  return `${timeLength.days()}d ${timeLength.hours()}h ${timeLength.minutes()}m`;
};

/**
 * Обновляет точку путешествия в списке.
 *
 * @param {Array<Object>} items - Массив объектов, который необходимо обновить.
 * @param {Object} update - Объект, содержащий новые данные.
 * @returns {Array<Object>}  Новый массив с обновленным элементом.
 */
const updateItem = (items, update) =>
  items.map((item) => item.id === update.id ? update : item);

export { formatDate, getTimeDifference, updateItem };
