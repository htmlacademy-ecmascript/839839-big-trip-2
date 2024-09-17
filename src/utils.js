import dayjs from 'dayjs';

const formatDate = (date, format) =>
  date ? dayjs(date).format(format) : '';

export { formatDate };
