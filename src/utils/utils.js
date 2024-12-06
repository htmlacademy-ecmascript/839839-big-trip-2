import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import { DateFormat, Period } from '../const.js';

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(duration);

const formatDateIso = (date) =>
  date ? dayjs(date).toISOString() : '';

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

export { formatDate, getTimeDifference, updateItem, formatDateIso };
