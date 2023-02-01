export default class ShowInfo {
    constructor(triggers) {
        this.plusBtns = document.querySelectorAll(triggers);
    }

    init() {
        this.plusBtns.forEach(plus => {
            plus.addEventListener('click', () => {
                const sibling = plus.closest('.module__info-show').nextElementSibling;
                
                sibling.classList.toggle('msg');
                sibling.style.marginTop = '20px';
            });
        });
    }
}