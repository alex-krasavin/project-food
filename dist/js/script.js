/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/js/main.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/js/main.js":
/*!************************!*\
  !*** ./src/js/main.js ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

window.addEventListener("DOMContentLoaded", () => {
  // !!!!!!!!! TABS !!!!!!!!!!!!!
  const tabs = document.querySelectorAll(".tabheader__item"),
        //Находим все табы на странице
  tabsContents = document.querySelectorAll(".tabcontent"),
        //Находим все эл-ты отображ контент при табе
  tabsParent = document.querySelector(".tabheader__items"); //Находим род эл-т табов
  //создаем функцию которая скрывает все эл-ты отображения контента

  function tabContentHidden() {
    tabsContents.forEach(tab => {
      tab.classList.add("hide");
      tab.classList.remove("show", "fade");
    });
    tabs.forEach(item => {
      item.classList.remove("tabheader__item_active"); //убираем у всех табов класс актив
    });
  }

  ;
  tabContentHidden(); //Создаем функцию которая будет отображать контент по умолчанию это будет первый таб

  function showTabContent(i = 0) {
    tabsContents[i].classList.remove("hide");
    tabsContents[i].classList.add("fade", "show");
    tabs[i].classList.add("tabheader__item_active");
  }

  showTabContent();
  tabsParent.addEventListener("click", e => {
    if (e.target && e.target.classList.contains("tabheader__item")) {
      tabs.forEach((item, i) => {
        if (e.target == item) {
          tabContentHidden();
          showTabContent(i);
        }
      });
    }
  }); //!!!!!!!!!!!!!! TIMER !!!!!!!!!!!!!!!!!!!!!
  //Создаем переменную которая будет последним временем

  const deadline = "2022-12-31"; //Функция которая определяет разницу между текущей датой и последней
  //deadline

  function getTimeRemaining(endtime) {
    //Получим кол-во милисекунд в deadline
    const t = Date.parse(endtime) - Date.parse(new Date()); //вычитаем кол-во мс текущей даты

    const days = Math.floor(t / (1000 * 60 * 60 * 24)); //Кол-во дней до конца

    const hours = Math.floor(t / (1000 * 60 * 60) % 24);
    const minutes = Math.floor(t / 1000 / 60 % 60);
    const seconds = Math.floor(t / 1000 % 60);
    return {
      total: t,
      days: days,
      hours: hours,
      minutes: minutes,
      seconds: seconds
    };
  }

  ; //Создаем фун-ю которая будет выводить дату на страницу
  // Блок где отображается таймер и deadline

  function setClock(selector, endtime) {
    const timer = document.querySelector(selector),
          //контейнер таймера
    days = timer.querySelector("#days"),
          hours = timer.querySelector("#hours"),
          minutes = timer.querySelector("#minutes"),
          seconds = timer.querySelector("#seconds");
    const timeInterval = setInterval(updateClock, 1000);
    updateClock(); // запускаем функцию,чтоб не было мигания,т.к есть интервал в 1с.
    //создаем функцию которая обновляет таймер каждую секунду

    function updateClock() {
      //deadline который передаем в sectclock
      const t = getTimeRemaining(endtime); //Расчет времени на текущую секунду записываем в переменную (запишутся данные объектом)

      days.textContent = t.days; //выводим в блок дней кол-во дней на данный момент

      hours.textContent = t.hours;
      minutes.textContent = t.minutes;
      seconds.textContent = t.seconds;

      if (t.total <= 0) {
        clearInterval(timeInterval); // останавливаем интервал т.к подошел deadline
      }
    }
  } //Запускаем функцию которая будет показывать таймер (1 блоки в котрые выведет,2 конец времени)


  setClock(".timer", deadline);
});

/***/ })

/******/ });
//# sourceMappingURL=script.js.map