import dayjs from 'dayjs';

const sortPointByPrice = (pointA, pointB) =>
  pointB.basePrice - pointA.basePrice;

const getWeightForNullDate = (dateA, dateB) => {
  if (dateA === null && dateB === null) {
    return 0;
  }
  if (dateA === null) {
    return 1;
  }
  if (dateB === null) {
    return -1;
  }
  return null;
};

const sortPointByDay = (pointA, pointB) => {
  const weight = getWeightForNullDate(pointA.dateFrom, pointB.dateFrom);
  return weight !== null ? weight : dayjs(pointA.dateFrom).diff(dayjs(pointB.dateFrom));
};

const sortPointByDuration = (pointA, pointB) => {
  const durationA = dayjs(pointA.dateTo).diff(dayjs(pointA.dateFrom));
  const durationB = dayjs(pointB.dateTo).diff(dayjs(pointB.dateFrom));

  return durationB - durationA;
};

export { sortPointByPrice, sortPointByDay, sortPointByDuration };
