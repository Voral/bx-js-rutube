this.BX = this.BX || {};
(function (exports) {
    'use strict';

    var RutubeLinks = /*#__PURE__*/function () {
      function RutubeLinks() {
        babelHelpers.classCallCheck(this, RutubeLinks);
        babelHelpers.defineProperty(this, "links", []);
        babelHelpers.defineProperty(this, "popup", null);
        babelHelpers.defineProperty(this, "video", null);
      }
      babelHelpers.createClass(RutubeLinks, [{
        key: "init",
        value: function init(className) {
          var _this = this;
          if (window.frameCacheVars !== undefined) {
            BX.addCustomEvent("onFrameDataReceived", function (json) {
              return _this.initItems(className);
            });
          } else {
            BX.ready(function (json) {
              return _this.initItems(className);
            });
          }
        }
      }, {
        key: "initItems",
        value: function initItems(className) {
          this.links = document.querySelectorAll(className + '[data-rutube]');
          for (var i = 0, c = this.links.length; i < c; ++i) {
            if (!this.links[i].getAttribute('data-rutubeCode')) {
              var code = this.getCode(this.links[i]);
              if (code !== '') {
                this.links[i].addEventListener('click', this.clickHandler.bind(this), true);
                this.links[i].setAttribute('data-rutubeCode', code);
              }
            }
          }
        }
      }, {
        key: "getCode",
        value: function getCode(link) {
          if (typeof link.href === 'undefined' || link.href === '') {
            return '';
          }
          var result = link.href.match(/rutube.ru\/video\/([^?\/]+)/);
          return result.length === 2 ? result[1] : '';
        }
      }, {
        key: "clickHandler",
        value: function clickHandler(event) {
          var target = event.target.closest('[data-rutube]');
          event.stopPropagation();
          event.preventDefault();
          this.renderPopup();
          this.renderVideo(target.getAttribute('data-rutubeCode'));
        }
      }, {
        key: "closeHandler",
        value: function closeHandler(event) {
          event.stopPropagation();
          event.preventDefault();
          this.removePopup();
          this.removeVideo();
        }
      }, {
        key: "removePopup",
        value: function removePopup() {
          if (this.popup) {
            this.popup.classList.add('vs-rutube-hide');
          }
        }
      }, {
        key: "removeVideo",
        value: function removeVideo() {
          if (this.video) {
            this.video.parentNode.removeChild(this.video);
            this.video = null;
          }
        }
      }, {
        key: "renderPopup",
        value: function renderPopup() {
          if (!this.popup) {
            this.popup = document.createElement('div');
            this.popup.className = "vs-rutube-popup";
            this.popup.addEventListener('click', this.closeHandler.bind(this), true);
            var close = document.createElement('div');
            close.className = "vs-rutube-close";
            this.popup.append(close);
            document.body.append(this.popup);
          } else {
            this.popup.classList.remove('vs-rutube-hide');
          }
        }
      }, {
        key: "calcSize",
        value: function calcSize() {
          var screenWidth = this.popup.clientWidth,
            screenHeight = this.popup.clientHeight;
          var result = {
            width: screenWidth > 1920 ? 1920 : screenWidth,
            height: 0
          };
          result.height = Math.floor(result.width * 0.5625);
          if (result.height > screenHeight) {
            result.width = Math.floor(screenHeight / 0.5625);
          }
          return result;
        }
      }, {
        key: "renderVideo",
        value: function renderVideo(code) {
          var size = this.calcSize();
          this.video = document.createElement('div');
          this.video.className = "vs-rutube-video";
          this.video.innerHTML = '<iframe width="' + size.width + '" height="' + size.height + '" src="https://rutube.ru/play/embed/' + code + '" frameBorder="0" allow="clipboard-write; autoplay" webkitAllowFullScreen mozallowfullscreen allowFullScreen></iframe>';
          this.popup.append(this.video);
        }
      }]);
      return RutubeLinks;
    }();

    exports.RutubeLinks = RutubeLinks;

}((this.BX.Vasoft = this.BX.Vasoft || {})));
//# sourceMappingURL=vasoft-rutube.bundle.js.map
