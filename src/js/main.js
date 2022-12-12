window.addEventListener("DOMContentLoaded",()=>{
    // !!!!!!!!! TABS !!!!!!!!!!!!!
    const tabs = document.querySelectorAll(".tabheader__item"),//Находим все табы на странице
          tabsContents = document.querySelectorAll(".tabcontent"),//Находим все эл-ты отображ контент при табе
          tabsParent = document.querySelector(".tabheader__items")//Находим род эл-т табов
   //создаем функцию которая скрывает все эл-ты отображения контента
    function tabContentHidden() {
        tabsContents.forEach(tab => {
            tab.classList.add("hide");
            tab.classList.remove("show", "fade")
        });
        tabs.forEach(item => {
            item.classList.remove("tabheader__item_active")//убираем у всех табов класс актив
        });
    };
    tabContentHidden();

    //Создаем функцию которая будет отображать контент по умолчанию это будет первый таб
    function showTabContent(i = 0) {
        tabsContents[i].classList.remove("hide");
        tabsContents[i].classList.add("fade","show");
        tabs[i].classList.add("tabheader__item_active")
    }
    showTabContent();

    tabsParent.addEventListener("click",(e)=>{
        if(e.target && e.target.classList.contains("tabheader__item")) {
            tabs.forEach((item, i) => {
                if(e.target == item) {
                    tabContentHidden()
                    showTabContent(i)
                }
            })
        }
    });

    //!!!!!!!!!!!!!! TIMER !!!!!!!!!!!!!!!!!!!!!

    //Создаем переменную которая будет последним временем
    const deadline = "2022-12-31";

    //Функция которая определяет разницу между текущей датой и последней
                            //deadline
    function getTimeRemaining (endtime) {
        //Получим кол-во милисекунд в deadline
        const t = Date.parse(endtime) - Date.parse(new Date());//вычитаем кол-во мс текущей даты
        const days = Math.floor(t / (1000 * 60 * 60 * 24));//Кол-во дней до конца
        const hours = Math.floor((t /(1000 * 60 * 60)) % 24);
        const minutes = Math.floor( (t / 1000 / 60) % 60);
        const seconds = Math.floor( (t / 1000) % 60);

        return {
            total:t,
            days:days,
            hours:hours,
            minutes:minutes,
            seconds:seconds
        };
    };

    //Создаем фун-ю которая будет выводить дату на страницу
                    // Блок где отображается таймер и deadline
    function setClock(selector,endtime) {
        const timer = document.querySelector(selector),//контейнер таймера
              days = timer.querySelector("#days"),
              hours = timer.querySelector("#hours"),
              minutes = timer.querySelector("#minutes"),
              seconds = timer.querySelector("#seconds");
        
        const timeInterval = setInterval(updateClock,1000);

        updateClock();// запускаем функцию,чтоб не было мигания,т.к есть интервал в 1с.

    //создаем функцию которая обновляет таймер каждую секунду
    function updateClock () {      //deadline который передаем в sectclock
        const t = getTimeRemaining(endtime)//Расчет времени на текущую секунду записываем в переменную (запишутся данные объектом)
        days.textContent = t.days;//выводим в блок дней кол-во дней на данный момент
        hours.textContent = t.hours;
        minutes.textContent = t.minutes;
        seconds.textContent = t.seconds;

        if(t.total <=0) {
            clearInterval(timeInterval);// останавливаем интервал т.к подошел deadline
        }
    }
    }

    //Запускаем функцию которая будет показывать таймер (1 блоки в котрые выведет,2 конец времени)

    setClock(".timer",deadline)
    
});


