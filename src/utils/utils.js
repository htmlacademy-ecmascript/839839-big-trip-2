import dayjs from 'dayjs';
import { DateFormat, TimeFormat } from '../const.js';

const Period = {
  HOUR: 60,
  DAY: 1440
};

const formatDate = (date, format = DateFormat.SHORT_DATE_TIME) =>
  date ? dayjs(date).format(format) : '';

const getTimeDifference = (dateStart, dateEnd) => {
  const difference = dayjs(dateEnd).diff(dateStart, 'minute');
  if (difference < Period.HOUR) {
    return dayjs(difference).format(TimeFormat.MINUTE_TIME);
  }
  if (difference > Period.HOUR && difference < Period.DAY) {
    return dayjs(difference).format(TimeFormat.HOUR_MINUTE_TIME);
  }
  if (difference > Period.DAY) {
    return dayjs(difference).format(TimeFormat.DAY_HOUR_MINUTE_TIME);
  }
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
