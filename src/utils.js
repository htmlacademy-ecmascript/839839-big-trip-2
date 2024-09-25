import dayjs from 'dayjs';
import { timeFormats } from './const';

const formatDate = (date, format) =>
  date ? dayjs(date).format(format) : '';

const getTimeDifference = (dateStart, dateEnd) => {
  const difference = dayjs(dateEnd).diff(dateStart, 'minute');
  if (difference < 60) {
    return dayjs(difference).format(timeFormats.minuteTime);
  }
  if (difference > 60 && difference < 1440) {
    return dayjs(difference).format(timeFormats.hourMinuteTime);
  }
  if (difference > 1440) {
    return dayjs(difference).format(timeFormats.dayHourMinuteTime);
  }
};

export { formatDate, getTimeDifference };
