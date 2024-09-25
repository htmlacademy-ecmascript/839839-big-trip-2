const dateFormats = {
  fullDateTime: 'YYYY-MM-DDTHH:mm',
  shortDateTime: 'DD/MM/YY HH:mm',
  fullDate: 'YYYY-MM-DD',
  shortDate: 'MMM D',
  time: 'HH:mm',
};

const timeFormats = {
  minuteTime: 'mm[M]',// 23M
  hourMinuteTime: 'HH[H] mm[M]',// 02H 44M
  dayHourMinuteTime: 'DD[D] HH[H] mm[M]',// 51D 02H 30M
};

export { dateFormats, timeFormats };
