const FilterType = {
  EVERYTHING: 'everything',
  FUTURE: 'future',
  PRESENT: 'present',
  PAST: 'past',
};

const DateFormat = {
  FULL_DATE_TIME: 'YYYY-MM-DDTHH:mm',
  SHORT_DATE_TIME: 'DD/MM/YY HH:mm',
  FULL_DATE: 'YYYY-MM-DD',
  SHORT_DATE: 'MMM D',
  TIME: 'HH:mm',
  ROUTE: 'D MMM',
};

const TimeFormat = {
  MINUTE_TIME: 'mm[M]',
  HOUR_MINUTE_TIME: 'HH[H] mm[M]',
  DAY_HOUR_MINUTE_TIME: 'DD[D] HH[H] mm[M]',
};

const Message = {
  EVERYTHING: 'Click New Event to create your first point',
  PAST: 'There are no past events now',
  PRESENT: 'There are no present events now',
  FUTURE: 'There are no future events now',
};

const SortType = {
  DAY: 'day',
  EVENT: 'event',
  TIME: 'time',
  PRICE: 'price',
  OFFERS: 'offers'
};

const Mode = {
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITING',
};

const Period = {
  HOUR: 60,
  DAY: 1440
};

const UserAction = {
  UPDATE_POIN: 'UPDATE_POINT',
  ADD_POINT: 'ADD_POINT',
  DELETE_POINT: 'DELETE_POINT',
};
const UpdateType = {
  PATCH: 'PATCH',
  MINOR: 'MINOR',
  MAJOR: 'MAJOR',
  INIT: 'INIT',
};

export { DateFormat, TimeFormat, Message, FilterType, SortType, Mode, Period, UserAction, UpdateType };
