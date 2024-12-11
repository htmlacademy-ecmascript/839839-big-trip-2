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
  const difference = dayjs.duration(dayjs(dateEnd).diff(dayjs(dateStart)));

  const days = Math.floor(difference.asDays());
  const hours = Math.floor(difference.asHours() % Period.HOUR);
  const minutes = Math.floor(difference.asMinutes() % Period.MINUTE);

  let result = '';
  if (days > 0) {
    result += `${days.toString().padStart(2, '0')}D `;
  }
  if (hours > 0 || days > 0) {
    result += `${hours.toString().padStart(2, '0')}H `;
  }
  result += `${minutes.toString().padStart(2, '0')}M`;

  return result.trim();
};

export { formatDate, getTimeDifference, formatDateIso };
