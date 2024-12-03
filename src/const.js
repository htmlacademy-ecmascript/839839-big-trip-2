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
};

const TimeFormat = {
  MINUTE_TIME: 'mm[M]',
  HOUR_MINUTE_TIME: 'HH[H] mm[M]',
  DAY_HOUR_MINUTE_TIME: 'DD[D] HH[H] mm[M]',
};

const Message = {
  NEW_EVENT: 'Click New Event to create your first point',
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

export { DateFormat, TimeFormat, Message, FilterType, SortType, Mode, Period };
