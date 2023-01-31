export default class Slider {
    constructor({container = null,
        btns = null,
        btnsPrev,
        btnsNext,
        next = null,
        prev = null,
        activeClass = '',
        animate,
        autoplay } = {}){
        this.container = document.querySelector(container);
        try {this.slides = this.container.children;} catch(e){}
        this.btns = document.querySelectorAll(btns);
        this.btnsPrev = document.querySelectorAll(btnsPrev);
        this.btnsNext = document.querySelectorAll(btnsNext);
        this.prev = document.querySelector(prev);
        this.next = document.querySelector(next);
        this.activeClass = activeClass;
        this.animate = animate;
        this.autoplay = autoplay;
        this.slideIndex = 1;
    }
}