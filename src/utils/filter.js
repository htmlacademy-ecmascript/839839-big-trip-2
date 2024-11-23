import dayjs from 'dayjs';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import { FilterType } from '../const.js';

dayjs.extend(isSameOrBefore);
dayjs.extend(isSameOrAfter);


/**
 * Объект функции фильтрации.
 * @type {Object}
 * @property {Function} EVERYTHING - Фильтр, который возвращает все точки без изменений.
 * @property {Function} FUTURE - Фильтр, который возвращает список запланированных точек маршрута, у которых дата начала события больше текущей даты
 * @property {Function} PRESENT - Фильтр, который возвращает точки, у которых дата начала события меньше (или равна) текущей даты, а дата окончания больше (или равна) текущей даты;
 * @property {Function} PAST - Фильтр, который возвращает точки маршрута, у которых дата окончания маршрута меньше, чем текущая.
 */
const filter = {
  [FilterType.EVERYTHING]: (points) => points,
  [FilterType.FUTURE]: (points) => points.filter((point) => dayjs(point.dateFrom).isAfter(dayjs())),
  [FilterType.PRESENT]: (points) => points.filter((point) => dayjs(point.dateFrom).isSameOrBefore(dayjs()) && dayjs(point.dateTo).isSameOrAfter(dayjs())),
  [FilterType.PAST]: (points) => points.filter((point) => dayjs(point.dateTo).isBefore(dayjs())),
};

/**
 * Генерирует фильтры для точек поездки и подсчитывает количество точек поездки, соответствующих каждому фильтру.
 *
 * @param {Array<Object>} tripPoints - Массив объектов, представляющих точки поездки.
 * @returns {Array<Object>} Массив объектов, каждый из которых содержит:
 *   - {string} type - Тип фильтра (`EVERYTHING`, `FUTURE`, `PRESENT`, `PAST`).
 *   - {number} count - Количество точек, соответствующих данному фильтру.
 */
function generateFilter(tripPoints) {
  return Object.entries(filter).map(
    ([filterType, filterPoints]) => ({
      type: filterType,
      count: filterPoints(tripPoints).length,
    }),
  );
}

export { generateFilter };
