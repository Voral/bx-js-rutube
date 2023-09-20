import './assets/styles.css';

export class RutubeLinks {
    links = [];
    popup = null;
    video = null;

    init(className): void {
        if (window.frameCacheVars !== undefined) {
            BX.addCustomEvent("onFrameDataReceived", (json) => this.initItems(className));
        } else {
            BX.ready((json) => this.initItems(className));
        }
    }

    initItems(className): void {
        this.links = document.querySelectorAll(className + '[data-rutube]');
        for (let i = 0, c = this.links.length; i < c; ++i) {
            if (!this.links[i].getAttribute('data-rutubeCode')) {
                const code = this.getCode(this.links[i]);
                if (code !== '') {
                    this.links[i].addEventListener('click', this.clickHandler.bind(this), true);
                    this.links[i].setAttribute('data-rutubeCode', code);
                }
            }
        }
    }

    getCode(link) {
        if (typeof link.href === 'undefined' || link.href === '') {
            return '';
        }
        const result = link.href.match(/rutube.ru\/video\/([^?\/]+)/);
        return result.length === 2 ? result[1] : '';
    }

    clickHandler(event): void {
        event.stopPropagation();
        event.preventDefault();
        this.renderPopup();
        this.renderVideo(event.target.getAttribute('data-rutubeCode'));
    }

    closeHandler(event): void {
        event.stopPropagation();
        event.preventDefault();
        this.removePopup();
        this.removeVideo();
    }

    removePopup(): void {
        if (this.popup) {
            this.popup.classList.add('vs-rutube-hide')
        }
    }

    removeVideo(): void {
        if (this.video) {
            this.video.parentNode.removeChild(this.video);
            this.video = null;
        }
    }

    renderPopup(): void {
        if (!this.popup) {
            this.popup = document.createElement('div');
            this.popup.className = "vs-rutube-popup";
            this.popup.addEventListener('click', this.closeHandler.bind(this), true);

            let close = document.createElement('div');
            close.className = "vs-rutube-close";
            this.popup.append(close);
            document.body.append(this.popup);
        } else {
            this.popup.classList.remove('vs-rutube-hide');
        }
    }

    calcSize() {
        let screenWidth = this.popup.clientWidth, screenHeight = this.popup.clientHeight;
        const result = {
            width: screenWidth > 1920 ? 1920 : screenWidth,
            height: 0
        };
        result.height = Math.floor(result.width * 0.5625);
        if (result.height > screenHeight) {
            result.width = Math.floor(screenHeight / 0.5625);
        }
        return result;
    }

    renderVideo(code): void {
        const size = this.calcSize();
        this.video = document.createElement('div');
        this.video.className = "vs-rutube-video";
        this.video.innerHTML = '<iframe width="' + size.width + '" height="' + size.height
            + '" src="https://rutube.ru/play/embed/' + code
            + '" frameBorder="0" allow="clipboard-write; autoplay" webkitAllowFullScreen mozallowfullscreen allowFullScreen></iframe>';
        this.popup.append(this.video);
    }
}