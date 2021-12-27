(function () {
    const header = document.querySelector('.header');
    //данный метод возвращает первый
    //найденный элемент с тем селектором, который мы ему передадим в 
    //кач-ве аргумента (???)

    //нам нужно применить header класс при скроллинге страницы
    let headerWrapper = document.querySelector('.header__wrapper');
    window.onscroll = () => {
        if (window.pageYOffset > 50) {
            header.classList.add('header_active');
            headerWrapper.classList.add('header_wrapperactive');
        } //присвоим header дополнительный класс, если условие в скобках после
        // if будет выполняться
        else {
            header.classList.remove('header_active');
            headerWrapper.classList.remove('header_wrapperactive');
        }
    };
}()); //самовызывающаяся функция, которая отработает как только спарсится
//js-документ

//Burger handler

(function () {
    const burgerItem = document.querySelector('.burger');
    const menu = document.querySelector('.header__nav');
    const menuCloseItem = document.querySelector('.header__nav-close');
    const menuLinks = document.querySelectorAll('.header__link');
    burgerItem.addEventListener('click', () => {
        menu.classList.add('header__nav_active');
    });
    menuCloseItem.addEventListener('click', () => {
        menu.classList.remove('header__nav_active');
    })
    if (window.innerWidth <= 750) {
        //console.log(1);
        for (let i = 0; i < menuLinks.length; i+=1) {
            menuLinks[i].addEventListener('click', () => {
                menu.classList.remove('header__nav_active'); 
            })
        }
    }
}());

// Scroll to anchors
(function () {

    const smoothScroll = function (targetEl, duration) {
        const headerElHeight =  document.querySelector('.header').clientHeight;
        let target = document.querySelector(targetEl);
        let targetPosition = target.getBoundingClientRect().top - headerElHeight;
        let startPosition = window.pageYOffset;
        let startTime = null;
    
        const ease = function(t,b,c,d) {
            t /= d / 2;
            if (t < 1) return c / 2 * t * t + b;
            t--;
            return -c / 2 * (t * (t - 2) - 1) + b;
        };
    
        const animation = function(currentTime){
            if (startTime === null) startTime = currentTime;
            const timeElapsed = currentTime - startTime;
            const run = ease(timeElapsed, startPosition, targetPosition, duration);
            window.scrollTo(0,run);
            if (timeElapsed < duration) requestAnimationFrame(animation);
        };
        requestAnimationFrame(animation);

    };

    const scrollTo = function () {
        const links = document.querySelectorAll('.js-scroll');
        links.forEach(each => {
            each.addEventListener('click', function () {
                const currentTarget = this.getAttribute('href');
                smoothScroll(currentTarget, 1000);
            });
        });
    };
    scrollTo();
}());

//Если возникнет ситуация, когда верхнее меню будет оставаться вверху 
//при скроллинге, а не зафиксированным сверху, то из вышеприведенного
//кода нужно просто удалить все выражения, где встречается переменная
//headerElHeight