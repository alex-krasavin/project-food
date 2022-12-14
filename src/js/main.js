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
    
    //!!!!!!!!!! Modal window !!!!!!!!!!

    const btnModal = document.querySelectorAll("[data-modal]"),
          modalClose = document.querySelector("[data-close]"),
          modal = document.querySelector(".modal");

    function toggleHide () {
        modal.classList.toggle("hide")
        clearTimeout(modalTimerId) // Если пользователь открыл модальное окно сам не показывеам его через время
    }

    btnModal.forEach(button => {
        button.addEventListener("click", toggleHide)
            // modal.classList.add("show")
            // modal.classList.remove("hide")
           
        
    })

    modalClose.addEventListener("click",toggleHide)
        // modal.classList.add("hide");
        // modal.classList.remove("show")
        
   

    modal.addEventListener("click",(e)=>{
        if(e.target.classList == "modal" || e.keyCode === 27) {
           toggleHide();
        }
    })

    //close modal for keypress esc

    document.addEventListener("keydown",(e)=>{
        if(e.code === "Escape" && modal.classList == "modal") {
            toggleHide();
        }
    });

    //Show a modal window after time or at the end of the page

    const modalTimerId = setTimeout(toggleHide,5000);
    
    function showModalByScroll () {
          //Сколько проскролена страница по высоте + высота видимого контента >= полной высоте страницы
        if(window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight -1) {
            toggleHide();
        }
        window.removeEventListener("scroll",showModalByScroll)
    }

    window.addEventListener("scroll",showModalByScroll);

    // Импользуем классы для карточек меню
    class MenuCard {
        constructor (srcImg,alt,title,descr,price,parentSelector) {
            this.srcImg = srcImg;
            this.alt = alt;
            this.title = title;
            this.descr = descr;
            this.parent = document.querySelector(parentSelector)// куда будем вставлять карточки (какой то элемент страницы)
            this.price = price;
            this.transfer = 27;// создаем св-во по умолчанию курс$
            this.changeToUah();// запускаем функ конвертации и записываем результат в price
        }

        changeToUah () {
           return this.price = this.price * this.transfer
        }

        // Создаем метод для отображения карточек на странице

        render() {
            const element = document.createElement("div");// Создаем элемент внутрь которого поместим разметку
            element.innerHTML = `
                <div class="menu__item">
                    <img src="${this.srcImg}" alt="${this.alt}">
                    <h3 class="menu__item-subtitle">Меню ${this.title}</h3>
                    <div class="menu__item-descr">Меню ${this.title} ${this.descr}</div>
                    <div class="menu__item-divider"></div>
                    <div class="menu__item-price">
                        <div class="menu__item-cost">Цена:</div>
                        <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
                    </div>
                </div>
            `;

            this.parent.append(element)
        }
    }

    // const div = new MenuCard(); один из способов
    // div.render();

    new MenuCard("img/tabs/vegy.jpg",
    "vegy",
    "Фитнес", 
    "- это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!",
    9,
    ".menu .container"
    ).render();

    new MenuCard("img/tabs/elite.jpg",
    "elite",
    "Премиум", 
    "- мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!",
    21,
    ".menu .container"
    ).render();

    new MenuCard("img/tabs/post.jpg",
    "post",
    "Постное", 
    "- это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.",
    14,
    ".menu .container"
    ).render();
});


