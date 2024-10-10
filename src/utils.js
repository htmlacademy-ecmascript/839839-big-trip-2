import dayjs from 'dayjs';
import { TimeFormat } from './const.js';

const Period = {
  HOUR: 60,
  DAY: 1440
};

const formatDate = (date, format) =>
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

export { formatDate, getTimeDifference };
