/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/const.js":
/*!**********************!*\
  !*** ./src/const.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "DateFormat": () => (/* binding */ DateFormat),
/* harmony export */   "FilterType": () => (/* binding */ FilterType),
/* harmony export */   "Message": () => (/* binding */ Message),
/* harmony export */   "TimeFormat": () => (/* binding */ TimeFormat)
/* harmony export */ });
const FilterType = {
  EVERYTHING: 'everything',
  FUTURE: 'future',
  PRESENT: 'present',
  PAST: 'past'
};
const DateFormat = {
  FULL_DATE_TIME: 'YYYY-MM-DDTHH:mm',
  SHORT_DATE_TIME: 'DD/MM/YY HH:mm',
  FULL_DATE: 'YYYY-MM-DD',
  SHORT_DATE: 'MMM D',
  TIME: 'HH:mm'
};
const TimeFormat = {
  MINUTE_TIME: 'mm[M]',
  HOUR_MINUTE_TIME: 'HH[H] mm[M]',
  DAY_HOUR_MINUTE_TIME: 'DD[D] HH[H] mm[M]'
};
const Message = {
  NEW_EVENT: 'Click New Event to create your first point'
};


/***/ }),

/***/ "./src/framework/render.js":
/*!*********************************!*\
  !*** ./src/framework/render.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "RenderPosition": () => (/* binding */ RenderPosition),
/* harmony export */   "createElement": () => (/* binding */ createElement),
/* harmony export */   "remove": () => (/* binding */ remove),
/* harmony export */   "render": () => (/* binding */ render),
/* harmony export */   "replace": () => (/* binding */ replace)
/* harmony export */ });
/* harmony import */ var _view_abstract_view_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./view/abstract-view.js */ "./src/framework/view/abstract-view.js");


/** @enum {string} Перечисление возможных позиций для отрисовки */
const RenderPosition = {
  BEFOREBEGIN: 'beforebegin',
  AFTERBEGIN: 'afterbegin',
  BEFOREEND: 'beforeend',
  AFTEREND: 'afterend'
};

/**
 * Функция для создания элемента на основе разметки
 * @param {string} template Разметка в виде строки
 * @returns {HTMLElement} Созданный элемент
 */
function createElement(template) {
  const newElement = document.createElement('div');
  newElement.innerHTML = template;
  return newElement.firstElementChild;
}

/**
 * Функция для отрисовки элемента
 * @param {AbstractView} component Компонент, который должен был отрисован
 * @param {HTMLElement} container Элемент в котором будет отрисован компонент
 * @param {string} place Позиция компонента относительно контейнера. По умолчанию - `beforeend`
 */
function render(component, container, place = RenderPosition.BEFOREEND) {
  if (!(component instanceof _view_abstract_view_js__WEBPACK_IMPORTED_MODULE_0__["default"])) {
    throw new Error('Can render only components');
  }
  if (container === null) {
    throw new Error('Container element doesn\'t exist');
  }
  container.insertAdjacentElement(place, component.element);
}

/**
 * Функция для замены одного компонента на другой
 * @param {AbstractView} newComponent Компонент, который нужно показать
 * @param {AbstractView} oldComponent Компонент, который нужно скрыть
 */
function replace(newComponent, oldComponent) {
  if (!(newComponent instanceof _view_abstract_view_js__WEBPACK_IMPORTED_MODULE_0__["default"] && oldComponent instanceof _view_abstract_view_js__WEBPACK_IMPORTED_MODULE_0__["default"])) {
    throw new Error('Can replace only components');
  }
  const newElement = newComponent.element;
  const oldElement = oldComponent.element;
  const parent = oldElement.parentElement;
  if (parent === null) {
    throw new Error('Parent element doesn\'t exist');
  }
  parent.replaceChild(newElement, oldElement);
}

/**
 * Функция для удаления компонента
 * @param {AbstractView} component Компонент, который нужно удалить
 */
function remove(component) {
  if (component === null) {
    return;
  }
  if (!(component instanceof _view_abstract_view_js__WEBPACK_IMPORTED_MODULE_0__["default"])) {
    throw new Error('Can remove only components');
  }
  component.element.remove();
  component.removeElement();
}


/***/ }),

/***/ "./src/framework/view/abstract-view.js":
/*!*********************************************!*\
  !*** ./src/framework/view/abstract-view.js ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ AbstractView)
/* harmony export */ });
/* harmony import */ var _render_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../render.js */ "./src/framework/render.js");
/* harmony import */ var _abstract_view_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./abstract-view.css */ "./src/framework/view/abstract-view.css");



/** @const {string} Класс, реализующий эффект "покачивания головой" */
const SHAKE_CLASS_NAME = 'shake';

/** @const {number} Время анимации в миллисекундах */
const SHAKE_ANIMATION_TIMEOUT = 600;

/**
 * Абстрактный класс представления
 */
class AbstractView {
  /** @type {HTMLElement|null} Элемент представления */
  #element = null;
  constructor() {
    if (new.target === AbstractView) {
      throw new Error('Can\'t instantiate AbstractView, only concrete one.');
    }
  }

  /**
   * Геттер для получения элемента
   * @returns {HTMLElement} Элемент представления
   */
  get element() {
    if (!this.#element) {
      this.#element = (0,_render_js__WEBPACK_IMPORTED_MODULE_0__.createElement)(this.template);
    }
    return this.#element;
  }

  /**
   * Геттер для получения разметки элемента
   * @abstract
   * @returns {string} Разметка элемента в виде строки
   */
  get template() {
    throw new Error('Abstract method not implemented: get template');
  }

  /** Метод для удаления элемента */
  removeElement() {
    this.#element = null;
  }

  /**
   * Метод, реализующий эффект "покачивания головой"
   * @param {shakeCallback} [callback] Функция, которая будет вызвана после завершения анимации
   */
  shake(callback) {
    this.element.classList.add(SHAKE_CLASS_NAME);
    setTimeout(() => {
      this.element.classList.remove(SHAKE_CLASS_NAME);
      callback?.();
    }, SHAKE_ANIMATION_TIMEOUT);
  }
}

/**
 * Функция, которая будет вызвана методом shake после завершения анимации
 * @callback shakeCallback
 */

/***/ }),

/***/ "./src/mock/const.js":
/*!***************************!*\
  !*** ./src/mock/const.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "FAVORITE": () => (/* binding */ FAVORITE)
/* harmony export */ });
const FAVORITE = [true, false];


/***/ }),

/***/ "./src/mock/data.js":
/*!**************************!*\
  !*** ./src/mock/data.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getRandomPoint": () => (/* binding */ getRandomPoint)
/* harmony export */ });
/* harmony import */ var _const_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./const.js */ "./src/mock/const.js");
/* harmony import */ var _util_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./util.js */ "./src/mock/util.js");
/* harmony import */ var _description_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./description.js */ "./src/mock/description.js");



const mockData = [{
  id: '1',
  type: 'taxi',
  dateFrom: '2019-03-10T10:55:00.845Z',
  dateTo: '2019-03-11T11:50:00.845Z',
  destination: (0,_util_js__WEBPACK_IMPORTED_MODULE_1__.getRandomArrayElement)(_description_js__WEBPACK_IMPORTED_MODULE_2__.mockDestinations).id,
  offers: ['1', '3'],
  basePrice: 236,
  isFavorite: (0,_util_js__WEBPACK_IMPORTED_MODULE_1__.getRandomArrayElement)(_const_js__WEBPACK_IMPORTED_MODULE_0__.FAVORITE)
}, {
  id: '2',
  type: 'bus',
  dateFrom: '2022-07-23T20:10:00',
  dateTo: '2022-07-23T21:00:00',
  destination: (0,_util_js__WEBPACK_IMPORTED_MODULE_1__.getRandomArrayElement)(_description_js__WEBPACK_IMPORTED_MODULE_2__.mockDestinations).id,
  offers: ['6', '7'],
  basePrice: 160,
  isFavorite: (0,_util_js__WEBPACK_IMPORTED_MODULE_1__.getRandomArrayElement)(_const_js__WEBPACK_IMPORTED_MODULE_0__.FAVORITE)
}, {
  id: '3',
  type: 'train',
  dateFrom: '2024-09-10T22:40:56',
  dateTo: '2024-09-11T11:00:13',
  destination: (0,_util_js__WEBPACK_IMPORTED_MODULE_1__.getRandomArrayElement)(_description_js__WEBPACK_IMPORTED_MODULE_2__.mockDestinations).id,
  offers: ['9'],
  basePrice: 345,
  isFavorite: (0,_util_js__WEBPACK_IMPORTED_MODULE_1__.getRandomArrayElement)(_const_js__WEBPACK_IMPORTED_MODULE_0__.FAVORITE)
}, {
  id: '4',
  type: 'ship',
  dateFrom: '2024-11-10T14:00:00',
  dateTo: '2024-11-11T15:00:00',
  destination: (0,_util_js__WEBPACK_IMPORTED_MODULE_1__.getRandomArrayElement)(_description_js__WEBPACK_IMPORTED_MODULE_2__.mockDestinations).id,
  offers: ['11', '12'],
  basePrice: 545,
  isFavorite: (0,_util_js__WEBPACK_IMPORTED_MODULE_1__.getRandomArrayElement)(_const_js__WEBPACK_IMPORTED_MODULE_0__.FAVORITE)
}, {
  id: '5',
  type: 'drive',
  dateFrom: '2024-12-10T12:00:00',
  dateTo: '2024-12-11T16:00:00',
  destination: (0,_util_js__WEBPACK_IMPORTED_MODULE_1__.getRandomArrayElement)(_description_js__WEBPACK_IMPORTED_MODULE_2__.mockDestinations).id,
  offers: [],
  basePrice: 126,
  isFavorite: (0,_util_js__WEBPACK_IMPORTED_MODULE_1__.getRandomArrayElement)(_const_js__WEBPACK_IMPORTED_MODULE_0__.FAVORITE)
}, {
  id: '6',
  type: 'restaurant',
  dateFrom: '2024-12-11T11:30:00',
  dateTo: '2024-12-11T14:00:00',
  destination: (0,_util_js__WEBPACK_IMPORTED_MODULE_1__.getRandomArrayElement)(_description_js__WEBPACK_IMPORTED_MODULE_2__.mockDestinations).id,
  offers: ['23'],
  basePrice: 126,
  isFavorite: (0,_util_js__WEBPACK_IMPORTED_MODULE_1__.getRandomArrayElement)(_const_js__WEBPACK_IMPORTED_MODULE_0__.FAVORITE)
}, {
  id: '7',
  type: 'sightseeing',
  dateFrom: '2025-12-09T15:00:00',
  dateTo: '2025-12-11T16:00:00',
  destination: (0,_util_js__WEBPACK_IMPORTED_MODULE_1__.getRandomArrayElement)(_description_js__WEBPACK_IMPORTED_MODULE_2__.mockDestinations).id,
  offers: [],
  basePrice: 126,
  isFavorite: (0,_util_js__WEBPACK_IMPORTED_MODULE_1__.getRandomArrayElement)(_const_js__WEBPACK_IMPORTED_MODULE_0__.FAVORITE)
}];
const getRandomPoint = () => (0,_util_js__WEBPACK_IMPORTED_MODULE_1__.getRandomArrayElement)(mockData);


/***/ }),

/***/ "./src/mock/description.js":
/*!*********************************!*\
  !*** ./src/mock/description.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "mockDestinations": () => (/* binding */ mockDestinations)
/* harmony export */ });
const mockDestinations = [{
  id: '1',
  name: 'Rostov-on-Don',
  description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  pictures: [{
    src: 'img/photos/1.jpg',
    description: 'Rostov-on-Don photo description'
  }]
}, {
  id: '2',
  name: 'Sochi',
  description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
  pictures: [{
    src: 'img/photos/3.jpg',
    description: 'Sochi photo description'
  }, {
    src: 'https://loremflickr.com/248/152?random=65',
    description: 'cat'
  }]
}, {
  id: '3',
  name: 'Ekaterinburg',
  description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
  pictures: [{
    src: 'img/photos/2.jpg',
    description: 'Ekaterinburg photo description'
  }, {
    src: 'https://loremflickr.com/248/152?random=6',
    description: 'cat'
  }, {
    src: 'https://loremflickr.com/248/152?random=5',
    description: 'cat'
  }]
}, {
  id: '4',
  name: 'Kazan',
  description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
  pictures: [{
    src: 'img/photos/1.jpg',
    description: 'Kazan photo description'
  }, {
    src: 'img/photos/2.jpg',
    description: 'Kazan photo description'
  }]
}, {
  id: '5',
  name: 'Saint Petersburg',
  description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
  pictures: []
}, {
  id: '6',
  name: 'Moscow',
  description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
  pictures: [{
    src: 'img/photos/5.jpg',
    description: 'Moscow photo description'
  }]
}];


/***/ }),

/***/ "./src/mock/offers.js":
/*!****************************!*\
  !*** ./src/mock/offers.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "mockOffers": () => (/* binding */ mockOffers)
/* harmony export */ });
const mockOffers = [{
  type: 'taxi',
  offers: [{
    id: '1',
    title: 'additional offer 1',
    price: 110
  }, {
    id: '2',
    title: 'additional offer 2',
    price: 12
  }, {
    id: '3',
    title: 'additional offer 3',
    price: 50
  }, {
    id: '24',
    title: 'additional offer 24',
    price: 15
  }, {
    id: '25',
    title: 'additional offer 25',
    price: 0
  }, {
    id: '26',
    title: 'additional offer 26',
    price: 35
  }]
}, {
  type: 'bus',
  offers: [{
    id: '4',
    title: 'additional offer 4',
    price: 10
  }, {
    id: '5',
    title: 'additional offer 5',
    price: 125
  }, {
    id: '6',
    title: 'additional offer 6',
    price: 50
  }, {
    id: '7',
    title: 'additional offer 7',
    price: 75
  }]
}, {
  type: 'train',
  offers: [{
    id: '8',
    title: 'additional offer 8',
    price: 65
  }, {
    id: '9',
    title: 'additional offer 9',
    price: 13
  }]
}, {
  type: 'ship',
  offers: [{
    id: '10',
    title: 'additional offer 10',
    price: 95
  }, {
    id: '11',
    title: 'additional offer 11',
    price: 45
  }, {
    id: '12',
    title: 'additional offer 12',
    price: 50
  }, {
    id: '13',
    title: 'additional offer 13',
    price: 120
  }]
}, {
  type: 'drive',
  offers: [{
    id: '14',
    title: 'additional offer 14',
    price: 10
  }, {
    id: '15',
    title: 'additional offer 15',
    price: 29
  }]
}, {
  type: 'flight',
  offers: [{
    id: '16',
    title: 'additional offer 16',
    price: 74
  }, {
    id: '17',
    title: 'additional offer 17',
    price: 63
  }]
}, {
  type: 'check-in',
  offers: [{
    id: '18',
    title: 'additional offer 18',
    price: 120
  }]
}, {
  type: 'sightseeing',
  offers: []
}, {
  type: 'restaurant',
  offers: [{
    id: '23',
    title: 'additional offer 23',
    price: 15
  }]
}];


/***/ }),

/***/ "./src/mock/util.js":
/*!**************************!*\
  !*** ./src/mock/util.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getRandomArrayElement": () => (/* binding */ getRandomArrayElement)
/* harmony export */ });
const getRandomArrayElement = item => item[Math.floor(Math.random() * item.length)];


/***/ }),

/***/ "./src/model/point-model.js":
/*!**********************************!*\
  !*** ./src/model/point-model.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ PointModel)
/* harmony export */ });
/* harmony import */ var _mock_data_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../mock/data.js */ "./src/mock/data.js");
/* harmony import */ var _mock_description_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../mock/description.js */ "./src/mock/description.js");
/* harmony import */ var _mock_offers_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../mock/offers.js */ "./src/mock/offers.js");



const POINT_COUNT = 4;
class PointModel {
  #points = Array.from({
    length: POINT_COUNT
  }, _mock_data_js__WEBPACK_IMPORTED_MODULE_0__.getRandomPoint);
  #allDestinations = _mock_description_js__WEBPACK_IMPORTED_MODULE_1__.mockDestinations;
  #allOffers = _mock_offers_js__WEBPACK_IMPORTED_MODULE_2__.mockOffers;
  get point() {
    return this.#points;
  }
  get destination() {
    return this.#allDestinations;
  }
  get offer() {
    return this.#allOffers;
  }
}

/***/ }),

/***/ "./src/presenter/trip-presenter.js":
/*!*****************************************!*\
  !*** ./src/presenter/trip-presenter.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ TripPresenter)
/* harmony export */ });
/* harmony import */ var _view_list_points_view_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../view/list-points-view.js */ "./src/view/list-points-view.js");
/* harmony import */ var _view_item_point_view_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../view/item-point-view.js */ "./src/view/item-point-view.js");
/* harmony import */ var _view_open_point_view_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../view/open-point-view.js */ "./src/view/open-point-view.js");
/* harmony import */ var _view_message_view_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../view/message-view.js */ "./src/view/message-view.js");
/* harmony import */ var _framework_render_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../framework/render.js */ "./src/framework/render.js");
/* harmony import */ var _const_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../const.js */ "./src/const.js");






class TripPresenter {
  #tripContainer = null;
  #pointModel = null;
  #listPointsComponent = new _view_list_points_view_js__WEBPACK_IMPORTED_MODULE_0__["default"]();
  #tripPoints = [];
  #tripDestinations = [];
  #tripOffers = [];
  constructor({
    tripContainer,
    pointModel
  }) {
    this.#tripContainer = tripContainer;
    this.#pointModel = pointModel;
  }
  init() {
    /**
     * Копия данных модели(временная)
     */
    this.#tripPoints = [...this.#pointModel.point];
    this.#tripDestinations = [...this.#pointModel.destination];
    this.#tripOffers = [...this.#pointModel.offer];
    this.#renderTrip();
  }

  /**
   * Рендеринг отдельной точки поездки.
   *
   * @param {Object} point - Данные точки.
   * @param {Array} allOffers - Все предложения.
   * @param {Array} allDestinations - Все направления.
   */
  #renderPoint({
    point,
    allOffers,
    allDestinations
  }) {
    const onEscKeydown = evt => {
      if (evt.key === 'Escape') {
        evt.preventDefault();
        replaceOpenPointToPoint();
        document.removeEventListener('keydown', onEscKeydown);
      }
    };

    /**
     * Создает новый компонент закрытой точки.
     *
     * @param {Object} point - Данные для текущей точки.
     * @param {Array} allOffers - Список всех предложений.
     * @param {Array} allDestinations - Список всех направлений.
     * @param {Function} onRollupClick - Обработчик клика по элементу, который
     *        заменяет компонент точки на открытый и добавляет обработчик события клавиатуры.
     */
    const pointComponent = new _view_item_point_view_js__WEBPACK_IMPORTED_MODULE_1__["default"]({
      point,
      allOffers,
      allDestinations,
      onRollupClick: () => {
        replacePointToOpenPoint();
        document.addEventListener('keydown', onEscKeydown);
      }
    });

    /**
     * Создает новый компонент открытой точки.
     *
     * @param {Object} point - Данные для текущей точки.
     * @param {Array} allOffers - Список всех предложений.
     * @param {Array} allDestinations - Список всех направлений.
     * @param {Function} onFormClick - Обработчик клика по форме,
     *        который заменяет открытый компонент на обычный и удаляет обработчик
     *        события клавиатуры.
     */
    const openPointComponent = new _view_open_point_view_js__WEBPACK_IMPORTED_MODULE_2__["default"]({
      point,
      allOffers,
      allDestinations,
      onFormClick: () => {
        replaceOpenPointToPoint();
        document.removeEventListener('keydown', onEscKeydown);
      }
    });

    /**
     * Заменяет компонент точки (pointComponent) на компонент открытой точки (openPointComponent).
     */
    function replacePointToOpenPoint() {
      (0,_framework_render_js__WEBPACK_IMPORTED_MODULE_4__.replace)(openPointComponent, pointComponent);
    }

    /**
     * Заменяет компонент открытой точки (openPointComponent) на компонент точки (pointComponent).
     */
    function replaceOpenPointToPoint() {
      (0,_framework_render_js__WEBPACK_IMPORTED_MODULE_4__.replace)(pointComponent, openPointComponent);
    }
    (0,_framework_render_js__WEBPACK_IMPORTED_MODULE_4__.render)(pointComponent, this.#listPointsComponent.element);
  }

  /**
   * Рендеринг всего списка поездок.
   */
  #renderTrip() {
    (0,_framework_render_js__WEBPACK_IMPORTED_MODULE_4__.render)(this.#listPointsComponent, this.#tripContainer);
    if (!this.#tripPoints.length) {
      (0,_framework_render_js__WEBPACK_IMPORTED_MODULE_4__.render)(new _view_message_view_js__WEBPACK_IMPORTED_MODULE_3__["default"](_const_js__WEBPACK_IMPORTED_MODULE_5__.Message.NEW_EVENT), this.#listPointsComponent.element);
      return;
    }
    this.#tripPoints.forEach(point => {
      this.#renderPoint({
        point,
        allOffers: this.#tripOffers,
        allDestinations: this.#tripDestinations
      });
    });
  }
}

/***/ }),

/***/ "./src/utils/filter.js":
/*!*****************************!*\
  !*** ./src/utils/filter.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "generateFilter": () => (/* binding */ generateFilter)
/* harmony export */ });
/* harmony import */ var dayjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! dayjs */ "./node_modules/dayjs/dayjs.min.js");
/* harmony import */ var dayjs__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(dayjs__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var dayjs_plugin_isSameOrBefore__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! dayjs/plugin/isSameOrBefore */ "./node_modules/dayjs/plugin/isSameOrBefore.js");
/* harmony import */ var dayjs_plugin_isSameOrBefore__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(dayjs_plugin_isSameOrBefore__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var dayjs_plugin_isSameOrAfter__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! dayjs/plugin/isSameOrAfter */ "./node_modules/dayjs/plugin/isSameOrAfter.js");
/* harmony import */ var dayjs_plugin_isSameOrAfter__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(dayjs_plugin_isSameOrAfter__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _const__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../const */ "./src/const.js");




dayjs__WEBPACK_IMPORTED_MODULE_0___default().extend((dayjs_plugin_isSameOrBefore__WEBPACK_IMPORTED_MODULE_1___default()));
dayjs__WEBPACK_IMPORTED_MODULE_0___default().extend((dayjs_plugin_isSameOrAfter__WEBPACK_IMPORTED_MODULE_2___default()));

/**
 * Объект функции фильтрации.
 * @type {Object}
 * @property {Function} EVERYTHING - Фильтр, который возвращает все точки без изменений.
 * @property {Function} FUTURE - Фильтр, который возвращает список запланированных точек маршрута, у которых дата начала события больше текущей даты
 * @property {Function} PRESENT - Фильтр, который возвращает точки, у которых дата начала события меньше (или равна) текущей даты, а дата окончания больше (или равна) текущей даты;
 * @property {Function} PAST - Фильтр, который возвращает точки маршрута, у которых дата окончания маршрута меньше, чем текущая.
 */
const filter = {
  [_const__WEBPACK_IMPORTED_MODULE_3__.FilterType.EVERYTHING]: points => points,
  [_const__WEBPACK_IMPORTED_MODULE_3__.FilterType.FUTURE]: points => points.filter(point => dayjs__WEBPACK_IMPORTED_MODULE_0___default()(point.dateFrom).isAfter(dayjs__WEBPACK_IMPORTED_MODULE_0___default()())),
  [_const__WEBPACK_IMPORTED_MODULE_3__.FilterType.PRESENT]: points => points.filter(point => dayjs__WEBPACK_IMPORTED_MODULE_0___default()(point.dateFrom).isSameOrBefore(dayjs__WEBPACK_IMPORTED_MODULE_0___default()()) && dayjs__WEBPACK_IMPORTED_MODULE_0___default()(point.dateTo).isSameOrAfter(dayjs__WEBPACK_IMPORTED_MODULE_0___default()())),
  [_const__WEBPACK_IMPORTED_MODULE_3__.FilterType.PAST]: points => points.filter(point => dayjs__WEBPACK_IMPORTED_MODULE_0___default()(point.dateTo).isBefore(dayjs__WEBPACK_IMPORTED_MODULE_0___default()()))
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
  return Object.entries(filter).map(([filterType, filterPoints]) => ({
    type: filterType,
    count: filterPoints(tripPoints).length
  }));
}


/***/ }),

/***/ "./src/utils/utils.js":
/*!****************************!*\
  !*** ./src/utils/utils.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "formatDate": () => (/* binding */ formatDate),
/* harmony export */   "getTimeDifference": () => (/* binding */ getTimeDifference)
/* harmony export */ });
/* harmony import */ var dayjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! dayjs */ "./node_modules/dayjs/dayjs.min.js");
/* harmony import */ var dayjs__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(dayjs__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _const_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../const.js */ "./src/const.js");


const Period = {
  HOUR: 60,
  DAY: 1440
};
const formatDate = (date, format = _const_js__WEBPACK_IMPORTED_MODULE_1__.DateFormat.SHORT_DATE_TIME) => date ? dayjs__WEBPACK_IMPORTED_MODULE_0___default()(date).format(format) : '';
const getTimeDifference = (dateStart, dateEnd) => {
  const difference = dayjs__WEBPACK_IMPORTED_MODULE_0___default()(dateEnd).diff(dateStart, 'minute');
  if (difference < Period.HOUR) {
    return dayjs__WEBPACK_IMPORTED_MODULE_0___default()(difference).format(_const_js__WEBPACK_IMPORTED_MODULE_1__.TimeFormat.MINUTE_TIME);
  }
  if (difference > Period.HOUR && difference < Period.DAY) {
    return dayjs__WEBPACK_IMPORTED_MODULE_0___default()(difference).format(_const_js__WEBPACK_IMPORTED_MODULE_1__.TimeFormat.HOUR_MINUTE_TIME);
  }
  if (difference > Period.DAY) {
    return dayjs__WEBPACK_IMPORTED_MODULE_0___default()(difference).format(_const_js__WEBPACK_IMPORTED_MODULE_1__.TimeFormat.DAY_HOUR_MINUTE_TIME);
  }
};


/***/ }),

/***/ "./src/view/filters-view.js":
/*!**********************************!*\
  !*** ./src/view/filters-view.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ FiltersView)
/* harmony export */ });
/* harmony import */ var _framework_view_abstract_view_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../framework/view/abstract-view.js */ "./src/framework/view/abstract-view.js");


/**
 * Создает шаблон элемента фильтра.
 *
 * @param {Object} filter - Объект фильтров.
 * @param {boolean} isChecked - Флаг, указывающий, на выбранный фильтр.
 * @returns {string} элемент фильтра.
 */
const createFilterItemTemplate = (filter, isChecked) => {
  const {
    type,
    count
  } = filter;
  return `<div class="trip-filters__filter">
      <input id="filter-${type}"
      class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter"
      value="${type}"
      ${isChecked ? 'checked' : ''}
      ${count === 0 ? 'disabled' : ''}>
      <label class="trip-filters__filter-label" for="filter-future">${type}</label>
    </div>`;
};

/**
 * Создает шаблон формы фильтров.
 *
 * @param {Array<Object>} filters - Массив объектов фильтров.
 * @returns {string} шаблон формы фильтров.
 */
const createFilters = filters => `<form class="trip-filters" action="#" method="get">

    ${filters.map((filter, index) => createFilterItemTemplate(filter, index)).join('')}

    <button class="visually-hidden" type="submit">Accept filter</button>
  </form>`;
class FiltersView extends _framework_view_abstract_view_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
  #filters = null;
  constructor({
    filters
  }) {
    super();
    this.#filters = filters;
  }
  get template() {
    return createFilters(this.#filters);
  }
}

/***/ }),

/***/ "./src/view/item-point-view.js":
/*!*************************************!*\
  !*** ./src/view/item-point-view.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ItemPointView)
/* harmony export */ });
/* harmony import */ var _framework_view_abstract_view_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../framework/view/abstract-view.js */ "./src/framework/view/abstract-view.js");
/* harmony import */ var _utils_utils_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/utils.js */ "./src/utils/utils.js");
/* harmony import */ var _const_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../const.js */ "./src/const.js");



const createItemPoint = (point, allOffers, allDestinations) => {
  const {
    type,
    basePrice,
    dateFrom,
    dateTo,
    isFavorite
  } = point;
  const pointDestination = allDestinations.find(dest => dest.id === point.destination);
  const favoriteClassName = isFavorite ? 'event__favorite-btn--active' : '';
  const allOffersByType = allOffers.find(offer => type === offer.type).offers;
  const selectedOffers = allOffersByType.filter(offer => point.offers.includes(offer.id));
  return `<li class="trip-events__item">
      <div class="event">
        <time class="event__date" datetime="${(0,_utils_utils_js__WEBPACK_IMPORTED_MODULE_1__.formatDate)(dateFrom, _const_js__WEBPACK_IMPORTED_MODULE_2__.DateFormat.FULL_DATE)}">${(0,_utils_utils_js__WEBPACK_IMPORTED_MODULE_1__.formatDate)(dateFrom, _const_js__WEBPACK_IMPORTED_MODULE_2__.DateFormat.SHORT_DATE)}</time>
        <div class="event__type">
          <img class="event__type-icon" width="42" height="42" src="img/icons/${type}.png" alt="Event type icon">
        </div>
        <h3 class="event__title">${type} ${pointDestination.name}</h3>
        <div class="event__schedule">
          <p class="event__time">
            <time class="event__start-time" datetime="${(0,_utils_utils_js__WEBPACK_IMPORTED_MODULE_1__.formatDate)(dateFrom, _const_js__WEBPACK_IMPORTED_MODULE_2__.DateFormat.FULL_DATE_TIME)}">${(0,_utils_utils_js__WEBPACK_IMPORTED_MODULE_1__.formatDate)(dateFrom, _const_js__WEBPACK_IMPORTED_MODULE_2__.DateFormat.TIME)}</time>
            &mdash;
            <time class="event__end-time" datetime="${(0,_utils_utils_js__WEBPACK_IMPORTED_MODULE_1__.formatDate)(dateTo, _const_js__WEBPACK_IMPORTED_MODULE_2__.DateFormat.FULL_DATE_TIME)}">${(0,_utils_utils_js__WEBPACK_IMPORTED_MODULE_1__.formatDate)(dateTo, _const_js__WEBPACK_IMPORTED_MODULE_2__.DateFormat.TIME)}</time>
          </p>
          <p class="event__duration">${(0,_utils_utils_js__WEBPACK_IMPORTED_MODULE_1__.getTimeDifference)(dateFrom, dateTo)}</p>
        </div>
        <p class="event__price">
          &euro;&nbsp;<span class="event__price-value">${basePrice}</span>
        </p>
        <h4 class="visually-hidden">Offers:</h4>
        <ul class="event__selected-offers">

        ${selectedOffers.map(off => `<li class="event__offer">
            <span class="event__offer-title">${off.title}</span>
            &plus;&euro;&nbsp;
            <span class="event__offer-price">${off.price}</span>
          </li>`).join('')}

        </ul>
        <button class="event__favorite-btn ${favoriteClassName}" type="button">
          <span class="visually-hidden">Add to favorite</span>
          <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
            <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
          </svg>
        </button>
        <button class="event__rollup-btn" type="button">
          <span class="visually-hidden">Open event</span>
        </button>
      </div>
    </li>`;
};
class ItemPointView extends _framework_view_abstract_view_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
  #point = null;
  #allOffers = null;
  #allDestinations = null;
  #hendleRollupClick = null;
  constructor({
    point,
    allOffers,
    allDestinations,
    onRollupClick
  }) {
    super();
    this.#point = point;
    this.#allOffers = allOffers;
    this.#allDestinations = allDestinations;
    this.#hendleRollupClick = onRollupClick;
    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#onRollupClick);
  }
  get template() {
    return createItemPoint(this.#point, this.#allOffers, this.#allDestinations);
  }
  #onRollupClick = evt => {
    evt.preventDefault();
    this.#hendleRollupClick();
  };
}

/***/ }),

/***/ "./src/view/list-points-view.js":
/*!**************************************!*\
  !*** ./src/view/list-points-view.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ListPointsView)
/* harmony export */ });
/* harmony import */ var _framework_view_abstract_view_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../framework/view/abstract-view.js */ "./src/framework/view/abstract-view.js");

const createListPoints = () => '<ul class="trip-events__list"></ul>';
class ListPointsView extends _framework_view_abstract_view_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
  get template() {
    return createListPoints();
  }
}

/***/ }),

/***/ "./src/view/message-view.js":
/*!**********************************!*\
  !*** ./src/view/message-view.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ MessageView)
/* harmony export */ });
/* harmony import */ var _framework_view_abstract_view_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../framework/view/abstract-view.js */ "./src/framework/view/abstract-view.js");

const createMessage = message => `<p class="trip-events__msg">${message}.</p>`;
class MessageView extends _framework_view_abstract_view_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
  #message = null;
  constructor(message) {
    super();
    this.#message = message;
  }
  get template() {
    return createMessage(this.#message);
  }
}

/***/ }),

/***/ "./src/view/open-point-view.js":
/*!*************************************!*\
  !*** ./src/view/open-point-view.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ OpenPointView)
/* harmony export */ });
/* harmony import */ var _framework_view_abstract_view_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../framework/view/abstract-view.js */ "./src/framework/view/abstract-view.js");
/* harmony import */ var _utils_utils_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/utils.js */ "./src/utils/utils.js");
/* harmony import */ var _const_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../const.js */ "./src/const.js");



const isChecked = (offer, selectedOffers) => selectedOffers.includes(offer) ? 'checked' : '';
const isCheckedType = (pointType, offerType) => pointType === offerType ? 'checked' : '';
const getListOffers = (allOffersByType, selectedOffers) => allOffersByType.length ? `<section class="event__section  event__section--offers">
      <h3 class="event__section-title  event__section-title--offers">Offers</h3>
        <div class="event__available-offers">
          ${allOffersByType.map(offer => `
            <div class="event__offer-selector">
              <input class="event__offer-checkbox  visually-hidden" id="event-offer-${offer.id}" type="checkbox" name="event-offer-${offer.id}" ${isChecked(offer, selectedOffers)}>
              <label class="event__offer-label" for="event-offer-${offer.id}">
                <span class="event__offer-title">${offer.title}</span>
                +€&nbsp;
                <span class="event__offer-price">${offer.price}</span>
              </label>
            </div>
            `).join('')}
        </div>
    </section>` : '';
const getPhotoContainer = pictures => pictures.length ? `<div class="event__photos-container">
      <div class="event__photos-tape">
      ${pictures.map(pic => `
        <img class="event__photo" src="${pic.src}" alt="${pic.description}">
        `).join('')}
    </div>
  </div>` : '';
const createOpenPoint = (point, allOffers, allDestinations) => {
  const {
    type,
    dateFrom,
    dateTo,
    basePrice
  } = point;
  const allOffersByType = allOffers.find(offer => type === offer.type).offers;
  const poinDestination = allDestinations.find(dest => point.destination === dest.id);
  const selectedOffers = allOffersByType.filter(offer => point.offers.includes(offer.id));
  return `<li class="trip-events__item">
      <form class="event event--edit" action="#" method="post">
        <header class="event__header">
          <div class="event__type-wrapper">
            <label class="event__type  event__type-btn" for="event-type-toggle-1">
              <span class="visually-hidden">Choose event type</span>
              <img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt="Event type icon">
            </label>
            <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

            <div class="event__type-list">
              <fieldset class="event__type-group">
                <legend class="visually-hidden">Event type</legend>

                  ${allOffers.map(offer => `<div class="event__type-item">
                    <input id="event-type-${offer.type}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${offer.type}" ${isCheckedType(point.type, offer.type)}>
                    <label class="event__type-label  event__type-label--${offer.type}" for="event-type-${offer.type}-1">${offer.type.charAt(0).toUpperCase() + offer.type.slice(1)}</label>
                  </div>`).join('')}

              </fieldset>
            </div>
          </div>

          <div class="event__field-group  event__field-group--destination">
            <label class="event__label  event__type-output" for="event-destination-1">
            ${type}
            </label>
            <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${poinDestination.name}" list="destination-list-1">
            <datalist id="destination-list-1">
            ${allDestinations.map(dest => `<option value="${dest.name}"></option>`).join('')}
            </datalist>
          </div>

          <div class="event__field-group  event__field-group--time">
            <label class="visually-hidden" for="event-start-time-1">From</label>
            <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${(0,_utils_utils_js__WEBPACK_IMPORTED_MODULE_1__.formatDate)(dateFrom, _const_js__WEBPACK_IMPORTED_MODULE_2__.DateFormat.SHORT_DATE_TIME)}">
            &mdash;
            <label class="visually-hidden" for="event-end-time-1">To</label>
            <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${(0,_utils_utils_js__WEBPACK_IMPORTED_MODULE_1__.formatDate)(dateTo, _const_js__WEBPACK_IMPORTED_MODULE_2__.DateFormat.SHORT_DATE_TIME)}">
          </div>

          <div class="event__field-group  event__field-group--price">
            <label class="event__label" for="event-price-1">
              <span class="visually-hidden">Price</span>
              &euro;
            </label>
            <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${basePrice}">
          </div>

          <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
          <button class="event__reset-btn" type="reset">Delete</button>
          <button class="event__rollup-btn" type="button">
            <span class="visually-hidden">Open event</span>
          </button>
        </header>
        <section class="event__details">
          ${getListOffers(allOffersByType, selectedOffers)}

          <section class="event__section  event__section--destination">
            <h3 class="event__section-title  event__section-title--destination">Destination</h3>
            <p class="event__destination-description">${poinDestination.description}</p>

            ${getPhotoContainer(poinDestination.pictures)}
          </section>
        </section>
      </form>
    </li>`;
};
class OpenPointView extends _framework_view_abstract_view_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
  #point = null;
  #allOffers = null;
  #allDestinations = null;
  #hendleButtonClick = null;
  constructor({
    point,
    allOffers,
    allDestinations,
    onFormClick
  }) {
    super();
    this.#point = point;
    this.#allOffers = allOffers;
    this.#allDestinations = allDestinations;
    this.#hendleButtonClick = onFormClick;
    this.element.querySelector('form').addEventListener('submit', this.#onSaveClick);
    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#onDeleteClick);
  }
  get template() {
    return createOpenPoint(this.#point, this.#allOffers, this.#allDestinations);
  }
  #onSaveClick = evt => {
    evt.preventDefault();
    this.#hendleButtonClick();
  };
  #onDeleteClick = evt => {
    evt.preventDefault();
    this.#hendleButtonClick();
  };
}

/***/ }),

/***/ "./src/view/route-view.js":
/*!********************************!*\
  !*** ./src/view/route-view.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ RouteView)
/* harmony export */ });
/* harmony import */ var _framework_view_abstract_view_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../framework/view/abstract-view.js */ "./src/framework/view/abstract-view.js");

const createRouteInfo = () => `<section class="trip-main__trip-info  trip-info">
    <div class="trip-info__main">
      <h1 class="trip-info__title">Amsterdam &mdash; Chamonix &mdash; Geneva</h1>

      <p class="trip-info__dates">18&nbsp;&mdash;&nbsp;20 Mar</p>
    </div>

    <p class="trip-info__cost">
      Total: &euro;&nbsp;<span class="trip-info__cost-value">1230</span>
    </p>
  </section>`;
class RouteView extends _framework_view_abstract_view_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
  get template() {
    return createRouteInfo();
  }
}

/***/ }),

/***/ "./src/view/sort-view.js":
/*!*******************************!*\
  !*** ./src/view/sort-view.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ SortView)
/* harmony export */ });
/* harmony import */ var _framework_view_abstract_view_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../framework/view/abstract-view.js */ "./src/framework/view/abstract-view.js");

const createSort = () => `<form class="trip-events__trip-sort  trip-sort" action="#" method="get">
    <div class="trip-sort__item  trip-sort__item--day">
      <input id="sort-day" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-day" checked>
      <label class="trip-sort__btn" for="sort-day">Day</label>
    </div>

    <div class="trip-sort__item  trip-sort__item--event">
      <input id="sort-event" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-event" disabled>
      <label class="trip-sort__btn" for="sort-event">Event</label>
    </div>

    <div class="trip-sort__item  trip-sort__item--time">
      <input id="sort-time" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-time">
      <label class="trip-sort__btn" for="sort-time">Time</label>
    </div>

    <div class="trip-sort__item  trip-sort__item--price">
      <input id="sort-price" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-price">
      <label class="trip-sort__btn" for="sort-price">Price</label>
    </div>

    <div class="trip-sort__item  trip-sort__item--offer">
      <input id="sort-offer" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-offer" disabled>
      <label class="trip-sort__btn" for="sort-offer">Offers</label>
    </div>
  </form>`;
class SortView extends _framework_view_abstract_view_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
  get template() {
    return createSort();
  }
}

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./src/framework/view/abstract-view.css":
/*!************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./src/framework/view/abstract-view.css ***!
  \************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/sourceMaps.js */ "./node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, ".shake {\n  animation: shake 0.6s;\n  position: relative;\n  z-index: 10;\n}\n\n@keyframes shake {\n  0%,\n  100% {\n    transform: translateX(0);\n  }\n\n  10%,\n  30%,\n  50%,\n  70%,\n  90% {\n    transform: translateX(-5px);\n  }\n\n  20%,\n  40%,\n  60%,\n  80% {\n    transform: translateX(5px);\n  }\n}\n", "",{"version":3,"sources":["webpack://./src/framework/view/abstract-view.css"],"names":[],"mappings":"AAAA;EACE,qBAAqB;EACrB,kBAAkB;EAClB,WAAW;AACb;;AAEA;EACE;;IAEE,wBAAwB;EAC1B;;EAEA;;;;;IAKE,2BAA2B;EAC7B;;EAEA;;;;IAIE,0BAA0B;EAC5B;AACF","sourcesContent":[".shake {\n  animation: shake 0.6s;\n  position: relative;\n  z-index: 10;\n}\n\n@keyframes shake {\n  0%,\n  100% {\n    transform: translateX(0);\n  }\n\n  10%,\n  30%,\n  50%,\n  70%,\n  90% {\n    transform: translateX(-5px);\n  }\n\n  20%,\n  40%,\n  60%,\n  80% {\n    transform: translateX(5px);\n  }\n}\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/api.js":
/*!*****************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/api.js ***!
  \*****************************************************/
/***/ ((module) => {

"use strict";


/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
module.exports = function (cssWithMappingToString) {
  var list = [];

  // return the list of modules as css string
  list.toString = function toString() {
    return this.map(function (item) {
      var content = "";
      var needLayer = typeof item[5] !== "undefined";
      if (item[4]) {
        content += "@supports (".concat(item[4], ") {");
      }
      if (item[2]) {
        content += "@media ".concat(item[2], " {");
      }
      if (needLayer) {
        content += "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {");
      }
      content += cssWithMappingToString(item);
      if (needLayer) {
        content += "}";
      }
      if (item[2]) {
        content += "}";
      }
      if (item[4]) {
        content += "}";
      }
      return content;
    }).join("");
  };

  // import a list of modules into the list
  list.i = function i(modules, media, dedupe, supports, layer) {
    if (typeof modules === "string") {
      modules = [[null, modules, undefined]];
    }
    var alreadyImportedModules = {};
    if (dedupe) {
      for (var k = 0; k < this.length; k++) {
        var id = this[k][0];
        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }
    for (var _k = 0; _k < modules.length; _k++) {
      var item = [].concat(modules[_k]);
      if (dedupe && alreadyImportedModules[item[0]]) {
        continue;
      }
      if (typeof layer !== "undefined") {
        if (typeof item[5] === "undefined") {
          item[5] = layer;
        } else {
          item[1] = "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {").concat(item[1], "}");
          item[5] = layer;
        }
      }
      if (media) {
        if (!item[2]) {
          item[2] = media;
        } else {
          item[1] = "@media ".concat(item[2], " {").concat(item[1], "}");
          item[2] = media;
        }
      }
      if (supports) {
        if (!item[4]) {
          item[4] = "".concat(supports);
        } else {
          item[1] = "@supports (".concat(item[4], ") {").concat(item[1], "}");
          item[4] = supports;
        }
      }
      list.push(item);
    }
  };
  return list;
};

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/sourceMaps.js":
/*!************************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/sourceMaps.js ***!
  \************************************************************/
/***/ ((module) => {

"use strict";


module.exports = function (item) {
  var content = item[1];
  var cssMapping = item[3];
  if (!cssMapping) {
    return content;
  }
  if (typeof btoa === "function") {
    var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(cssMapping))));
    var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
    var sourceMapping = "/*# ".concat(data, " */");
    return [content].concat([sourceMapping]).join("\n");
  }
  return [content].join("\n");
};

/***/ }),

/***/ "./node_modules/dayjs/dayjs.min.js":
/*!*****************************************!*\
  !*** ./node_modules/dayjs/dayjs.min.js ***!
  \*****************************************/
/***/ (function(module) {

!function(t,e){ true?module.exports=e():0}(this,(function(){"use strict";var t=1e3,e=6e4,n=36e5,r="millisecond",i="second",s="minute",u="hour",a="day",o="week",f="month",h="quarter",c="year",d="date",l="Invalid Date",$=/^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/,y=/\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g,M={name:"en",weekdays:"Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),months:"January_February_March_April_May_June_July_August_September_October_November_December".split("_"),ordinal:function(t){var e=["th","st","nd","rd"],n=t%100;return"["+t+(e[(n-20)%10]||e[n]||e[0])+"]"}},m=function(t,e,n){var r=String(t);return!r||r.length>=e?t:""+Array(e+1-r.length).join(n)+t},v={s:m,z:function(t){var e=-t.utcOffset(),n=Math.abs(e),r=Math.floor(n/60),i=n%60;return(e<=0?"+":"-")+m(r,2,"0")+":"+m(i,2,"0")},m:function t(e,n){if(e.date()<n.date())return-t(n,e);var r=12*(n.year()-e.year())+(n.month()-e.month()),i=e.clone().add(r,f),s=n-i<0,u=e.clone().add(r+(s?-1:1),f);return+(-(r+(n-i)/(s?i-u:u-i))||0)},a:function(t){return t<0?Math.ceil(t)||0:Math.floor(t)},p:function(t){return{M:f,y:c,w:o,d:a,D:d,h:u,m:s,s:i,ms:r,Q:h}[t]||String(t||"").toLowerCase().replace(/s$/,"")},u:function(t){return void 0===t}},g="en",D={};D[g]=M;var p=function(t){return t instanceof _},S=function t(e,n,r){var i;if(!e)return g;if("string"==typeof e){var s=e.toLowerCase();D[s]&&(i=s),n&&(D[s]=n,i=s);var u=e.split("-");if(!i&&u.length>1)return t(u[0])}else{var a=e.name;D[a]=e,i=a}return!r&&i&&(g=i),i||!r&&g},w=function(t,e){if(p(t))return t.clone();var n="object"==typeof e?e:{};return n.date=t,n.args=arguments,new _(n)},O=v;O.l=S,O.i=p,O.w=function(t,e){return w(t,{locale:e.$L,utc:e.$u,x:e.$x,$offset:e.$offset})};var _=function(){function M(t){this.$L=S(t.locale,null,!0),this.parse(t)}var m=M.prototype;return m.parse=function(t){this.$d=function(t){var e=t.date,n=t.utc;if(null===e)return new Date(NaN);if(O.u(e))return new Date;if(e instanceof Date)return new Date(e);if("string"==typeof e&&!/Z$/i.test(e)){var r=e.match($);if(r){var i=r[2]-1||0,s=(r[7]||"0").substring(0,3);return n?new Date(Date.UTC(r[1],i,r[3]||1,r[4]||0,r[5]||0,r[6]||0,s)):new Date(r[1],i,r[3]||1,r[4]||0,r[5]||0,r[6]||0,s)}}return new Date(e)}(t),this.$x=t.x||{},this.init()},m.init=function(){var t=this.$d;this.$y=t.getFullYear(),this.$M=t.getMonth(),this.$D=t.getDate(),this.$W=t.getDay(),this.$H=t.getHours(),this.$m=t.getMinutes(),this.$s=t.getSeconds(),this.$ms=t.getMilliseconds()},m.$utils=function(){return O},m.isValid=function(){return!(this.$d.toString()===l)},m.isSame=function(t,e){var n=w(t);return this.startOf(e)<=n&&n<=this.endOf(e)},m.isAfter=function(t,e){return w(t)<this.startOf(e)},m.isBefore=function(t,e){return this.endOf(e)<w(t)},m.$g=function(t,e,n){return O.u(t)?this[e]:this.set(n,t)},m.unix=function(){return Math.floor(this.valueOf()/1e3)},m.valueOf=function(){return this.$d.getTime()},m.startOf=function(t,e){var n=this,r=!!O.u(e)||e,h=O.p(t),l=function(t,e){var i=O.w(n.$u?Date.UTC(n.$y,e,t):new Date(n.$y,e,t),n);return r?i:i.endOf(a)},$=function(t,e){return O.w(n.toDate()[t].apply(n.toDate("s"),(r?[0,0,0,0]:[23,59,59,999]).slice(e)),n)},y=this.$W,M=this.$M,m=this.$D,v="set"+(this.$u?"UTC":"");switch(h){case c:return r?l(1,0):l(31,11);case f:return r?l(1,M):l(0,M+1);case o:var g=this.$locale().weekStart||0,D=(y<g?y+7:y)-g;return l(r?m-D:m+(6-D),M);case a:case d:return $(v+"Hours",0);case u:return $(v+"Minutes",1);case s:return $(v+"Seconds",2);case i:return $(v+"Milliseconds",3);default:return this.clone()}},m.endOf=function(t){return this.startOf(t,!1)},m.$set=function(t,e){var n,o=O.p(t),h="set"+(this.$u?"UTC":""),l=(n={},n[a]=h+"Date",n[d]=h+"Date",n[f]=h+"Month",n[c]=h+"FullYear",n[u]=h+"Hours",n[s]=h+"Minutes",n[i]=h+"Seconds",n[r]=h+"Milliseconds",n)[o],$=o===a?this.$D+(e-this.$W):e;if(o===f||o===c){var y=this.clone().set(d,1);y.$d[l]($),y.init(),this.$d=y.set(d,Math.min(this.$D,y.daysInMonth())).$d}else l&&this.$d[l]($);return this.init(),this},m.set=function(t,e){return this.clone().$set(t,e)},m.get=function(t){return this[O.p(t)]()},m.add=function(r,h){var d,l=this;r=Number(r);var $=O.p(h),y=function(t){var e=w(l);return O.w(e.date(e.date()+Math.round(t*r)),l)};if($===f)return this.set(f,this.$M+r);if($===c)return this.set(c,this.$y+r);if($===a)return y(1);if($===o)return y(7);var M=(d={},d[s]=e,d[u]=n,d[i]=t,d)[$]||1,m=this.$d.getTime()+r*M;return O.w(m,this)},m.subtract=function(t,e){return this.add(-1*t,e)},m.format=function(t){var e=this,n=this.$locale();if(!this.isValid())return n.invalidDate||l;var r=t||"YYYY-MM-DDTHH:mm:ssZ",i=O.z(this),s=this.$H,u=this.$m,a=this.$M,o=n.weekdays,f=n.months,h=function(t,n,i,s){return t&&(t[n]||t(e,r))||i[n].slice(0,s)},c=function(t){return O.s(s%12||12,t,"0")},d=n.meridiem||function(t,e,n){var r=t<12?"AM":"PM";return n?r.toLowerCase():r},$={YY:String(this.$y).slice(-2),YYYY:this.$y,M:a+1,MM:O.s(a+1,2,"0"),MMM:h(n.monthsShort,a,f,3),MMMM:h(f,a),D:this.$D,DD:O.s(this.$D,2,"0"),d:String(this.$W),dd:h(n.weekdaysMin,this.$W,o,2),ddd:h(n.weekdaysShort,this.$W,o,3),dddd:o[this.$W],H:String(s),HH:O.s(s,2,"0"),h:c(1),hh:c(2),a:d(s,u,!0),A:d(s,u,!1),m:String(u),mm:O.s(u,2,"0"),s:String(this.$s),ss:O.s(this.$s,2,"0"),SSS:O.s(this.$ms,3,"0"),Z:i};return r.replace(y,(function(t,e){return e||$[t]||i.replace(":","")}))},m.utcOffset=function(){return 15*-Math.round(this.$d.getTimezoneOffset()/15)},m.diff=function(r,d,l){var $,y=O.p(d),M=w(r),m=(M.utcOffset()-this.utcOffset())*e,v=this-M,g=O.m(this,M);return g=($={},$[c]=g/12,$[f]=g,$[h]=g/3,$[o]=(v-m)/6048e5,$[a]=(v-m)/864e5,$[u]=v/n,$[s]=v/e,$[i]=v/t,$)[y]||v,l?g:O.a(g)},m.daysInMonth=function(){return this.endOf(f).$D},m.$locale=function(){return D[this.$L]},m.locale=function(t,e){if(!t)return this.$L;var n=this.clone(),r=S(t,e,!0);return r&&(n.$L=r),n},m.clone=function(){return O.w(this.$d,this)},m.toDate=function(){return new Date(this.valueOf())},m.toJSON=function(){return this.isValid()?this.toISOString():null},m.toISOString=function(){return this.$d.toISOString()},m.toString=function(){return this.$d.toUTCString()},M}(),T=_.prototype;return w.prototype=T,[["$ms",r],["$s",i],["$m",s],["$H",u],["$W",a],["$M",f],["$y",c],["$D",d]].forEach((function(t){T[t[1]]=function(e){return this.$g(e,t[0],t[1])}})),w.extend=function(t,e){return t.$i||(t(e,_,w),t.$i=!0),w},w.locale=S,w.isDayjs=p,w.unix=function(t){return w(1e3*t)},w.en=D[g],w.Ls=D,w.p={},w}));

/***/ }),

/***/ "./node_modules/dayjs/plugin/isSameOrAfter.js":
/*!****************************************************!*\
  !*** ./node_modules/dayjs/plugin/isSameOrAfter.js ***!
  \****************************************************/
/***/ (function(module) {

!function(e,t){ true?module.exports=t():0}(this,(function(){"use strict";return function(e,t){t.prototype.isSameOrAfter=function(e,t){return this.isSame(e,t)||this.isAfter(e,t)}}}));

/***/ }),

/***/ "./node_modules/dayjs/plugin/isSameOrBefore.js":
/*!*****************************************************!*\
  !*** ./node_modules/dayjs/plugin/isSameOrBefore.js ***!
  \*****************************************************/
/***/ (function(module) {

!function(e,i){ true?module.exports=i():0}(this,(function(){"use strict";return function(e,i){i.prototype.isSameOrBefore=function(e,i){return this.isSame(e,i)||this.isBefore(e,i)}}}));

/***/ }),

/***/ "./src/framework/view/abstract-view.css":
/*!**********************************************!*\
  !*** ./src/framework/view/abstract-view.css ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/styleDomAPI.js */ "./node_modules/style-loader/dist/runtime/styleDomAPI.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/insertBySelector.js */ "./node_modules/style-loader/dist/runtime/insertBySelector.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/insertStyleElement.js */ "./node_modules/style-loader/dist/runtime/insertStyleElement.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/styleTagTransform.js */ "./node_modules/style-loader/dist/runtime/styleTagTransform.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_abstract_view_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../../../node_modules/css-loader/dist/cjs.js!./abstract-view.css */ "./node_modules/css-loader/dist/cjs.js!./src/framework/view/abstract-view.css");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_abstract_view_css__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_abstract_view_css__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_abstract_view_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_abstract_view_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js":
/*!****************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js ***!
  \****************************************************************************/
/***/ ((module) => {

"use strict";


var stylesInDOM = [];
function getIndexByIdentifier(identifier) {
  var result = -1;
  for (var i = 0; i < stylesInDOM.length; i++) {
    if (stylesInDOM[i].identifier === identifier) {
      result = i;
      break;
    }
  }
  return result;
}
function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];
  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var indexByIdentifier = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3],
      supports: item[4],
      layer: item[5]
    };
    if (indexByIdentifier !== -1) {
      stylesInDOM[indexByIdentifier].references++;
      stylesInDOM[indexByIdentifier].updater(obj);
    } else {
      var updater = addElementStyle(obj, options);
      options.byIndex = i;
      stylesInDOM.splice(i, 0, {
        identifier: identifier,
        updater: updater,
        references: 1
      });
    }
    identifiers.push(identifier);
  }
  return identifiers;
}
function addElementStyle(obj, options) {
  var api = options.domAPI(options);
  api.update(obj);
  var updater = function updater(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap && newObj.supports === obj.supports && newObj.layer === obj.layer) {
        return;
      }
      api.update(obj = newObj);
    } else {
      api.remove();
    }
  };
  return updater;
}
module.exports = function (list, options) {
  options = options || {};
  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];
    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDOM[index].references--;
    }
    var newLastIdentifiers = modulesToDom(newList, options);
    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];
      var _index = getIndexByIdentifier(_identifier);
      if (stylesInDOM[_index].references === 0) {
        stylesInDOM[_index].updater();
        stylesInDOM.splice(_index, 1);
      }
    }
    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertBySelector.js":
/*!********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertBySelector.js ***!
  \********************************************************************/
/***/ ((module) => {

"use strict";


var memo = {};

/* istanbul ignore next  */
function getTarget(target) {
  if (typeof memo[target] === "undefined") {
    var styleTarget = document.querySelector(target);

    // Special case to return head of iframe instead of iframe itself
    if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
      try {
        // This will throw an exception if access to iframe is blocked
        // due to cross-origin restrictions
        styleTarget = styleTarget.contentDocument.head;
      } catch (e) {
        // istanbul ignore next
        styleTarget = null;
      }
    }
    memo[target] = styleTarget;
  }
  return memo[target];
}

/* istanbul ignore next  */
function insertBySelector(insert, style) {
  var target = getTarget(insert);
  if (!target) {
    throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
  }
  target.appendChild(style);
}
module.exports = insertBySelector;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertStyleElement.js":
/*!**********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertStyleElement.js ***!
  \**********************************************************************/
/***/ ((module) => {

"use strict";


/* istanbul ignore next  */
function insertStyleElement(options) {
  var element = document.createElement("style");
  options.setAttributes(element, options.attributes);
  options.insert(element, options.options);
  return element;
}
module.exports = insertStyleElement;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js":
/*!**********************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js ***!
  \**********************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


/* istanbul ignore next  */
function setAttributesWithoutAttributes(styleElement) {
  var nonce =  true ? __webpack_require__.nc : 0;
  if (nonce) {
    styleElement.setAttribute("nonce", nonce);
  }
}
module.exports = setAttributesWithoutAttributes;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleDomAPI.js":
/*!***************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleDomAPI.js ***!
  \***************************************************************/
/***/ ((module) => {

"use strict";


/* istanbul ignore next  */
function apply(styleElement, options, obj) {
  var css = "";
  if (obj.supports) {
    css += "@supports (".concat(obj.supports, ") {");
  }
  if (obj.media) {
    css += "@media ".concat(obj.media, " {");
  }
  var needLayer = typeof obj.layer !== "undefined";
  if (needLayer) {
    css += "@layer".concat(obj.layer.length > 0 ? " ".concat(obj.layer) : "", " {");
  }
  css += obj.css;
  if (needLayer) {
    css += "}";
  }
  if (obj.media) {
    css += "}";
  }
  if (obj.supports) {
    css += "}";
  }
  var sourceMap = obj.sourceMap;
  if (sourceMap && typeof btoa !== "undefined") {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  }

  // For old IE
  /* istanbul ignore if  */
  options.styleTagTransform(css, styleElement, options.options);
}
function removeStyleElement(styleElement) {
  // istanbul ignore if
  if (styleElement.parentNode === null) {
    return false;
  }
  styleElement.parentNode.removeChild(styleElement);
}

/* istanbul ignore next  */
function domAPI(options) {
  if (typeof document === "undefined") {
    return {
      update: function update() {},
      remove: function remove() {}
    };
  }
  var styleElement = options.insertStyleElement(options);
  return {
    update: function update(obj) {
      apply(styleElement, options, obj);
    },
    remove: function remove() {
      removeStyleElement(styleElement);
    }
  };
}
module.exports = domAPI;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleTagTransform.js":
/*!*********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleTagTransform.js ***!
  \*********************************************************************/
/***/ ((module) => {

"use strict";


/* istanbul ignore next  */
function styleTagTransform(css, styleElement) {
  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css;
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild);
    }
    styleElement.appendChild(document.createTextNode(css));
  }
}
module.exports = styleTagTransform;

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/nonce */
/******/ 	(() => {
/******/ 		__webpack_require__.nc = undefined;
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
/*!*********************!*\
  !*** ./src/main.js ***!
  \*********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _view_route_view_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./view/route-view.js */ "./src/view/route-view.js");
/* harmony import */ var _view_filters_view_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./view/filters-view.js */ "./src/view/filters-view.js");
/* harmony import */ var _view_sort_view_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./view/sort-view.js */ "./src/view/sort-view.js");
/* harmony import */ var _framework_render_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./framework/render.js */ "./src/framework/render.js");
/* harmony import */ var _presenter_trip_presenter_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./presenter/trip-presenter.js */ "./src/presenter/trip-presenter.js");
/* harmony import */ var _model_point_model_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./model/point-model.js */ "./src/model/point-model.js");
/* harmony import */ var _utils_filter_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./utils/filter.js */ "./src/utils/filter.js");







const tripMainElement = document.querySelector('.trip-main');
const filtersElement = document.querySelector('.trip-controls__filters');
const siteMainElement = document.querySelector('.page-main');
const tripEventsElement = siteMainElement.querySelector('.trip-events');
const pointModel = new _model_point_model_js__WEBPACK_IMPORTED_MODULE_5__["default"]();
const tripPresenter = new _presenter_trip_presenter_js__WEBPACK_IMPORTED_MODULE_4__["default"]({
  tripContainer: tripEventsElement,
  pointModel
});
const filters = (0,_utils_filter_js__WEBPACK_IMPORTED_MODULE_6__.generateFilter)(pointModel.point);
(0,_framework_render_js__WEBPACK_IMPORTED_MODULE_3__.render)(new _view_route_view_js__WEBPACK_IMPORTED_MODULE_0__["default"](), tripMainElement, _framework_render_js__WEBPACK_IMPORTED_MODULE_3__.RenderPosition.AFTERBEGIN);
(0,_framework_render_js__WEBPACK_IMPORTED_MODULE_3__.render)(new _view_filters_view_js__WEBPACK_IMPORTED_MODULE_1__["default"]({
  filters
}), filtersElement);
(0,_framework_render_js__WEBPACK_IMPORTED_MODULE_3__.render)(new _view_sort_view_js__WEBPACK_IMPORTED_MODULE_2__["default"](), tripEventsElement);
tripPresenter.init();
})();

/******/ })()
;
//# sourceMappingURL=bundle.4879e4b4640281a9ae5b.js.map