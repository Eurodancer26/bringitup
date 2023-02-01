export default class Download {
    constructor(triggers) {
        this.downloadElems = document.querySelectorAll(triggers);
        this.path = 'assets/img/mainbg.jpg';
    }

    downloadItem(path) {
        const link = document.createElement('a');

        link.setAttribute('href', path);
        link.setAttribute('download', 'nice_picture');

        link.style.display = 'none';
        document.body.appendChild(link);

        link.click();

        document.body.removeChild(link);
    }

    init() {
        try {
            this.downloadElems.forEach(item => {
                item.addEventListener('click', () => {
                    this.downloadItem(this.path);
                });
            });
        } catch(e) {}
    }
}