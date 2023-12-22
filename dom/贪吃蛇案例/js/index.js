; (function () {
    var Snake = function (opt) {
        this.oWrap = opt.oWrap;
        this.posArr = [
            { x: 0, y: 0 },
            { x: 0, y: 20 },
            { x: 0, y: 40 },
            { x: 0, y: 60 },
            { x: 0, y: 80 },
        ];
        this.t = null;
        this.dir = 'DOWN';
    }

    Snake.prototype = {
        init: function () {
            this.addEvent();
            this.draw();
            this.run();
        },
        addEvent: function () {
            var _this = this;
            utils.addEvent(document, 'keydown', _this.changeDir.bind(_this))
        },
        draw: function () {
            var wrap = this.oWrap,
                posArr = this.posArr,
                len = posArr.length,
                item,
                frag = document.createDocumentFragment();

            for (var i = 0; i < len; i++) {
                var span = document.createElement('span');
                item = posArr[i];
                span.className = 'round';
                span.style.left = item.x + 'px';
                span.style.top = item.y + 'px';
                if (i == len - 1) {
                    span.className += ' header'
                }
                frag.appendChild(span);
            }
            wrap.appendChild(frag);
        },
        move: function () {
            var wrap = this.oWrap,
                posArr = this.posArr,
                len = posArr.length,
                item,
                header = posArr[len - 1],
                dir = this.dir;
            for (let i = 0; i < len; i++) {
                item = posArr[i];
                if (i == len - 1) {
                    switch (dir) {
                        case 'LEFT':
                            header.x -= 20;
                            break;
                        case 'RIGHT':
                            header.x += 20;
                            break;
                        case 'UP':
                            header.y -= 20;
                            break;
                        case 'DOWN':
                            header.y += 20;
                            break;
                        default:
                            break;
                    }
                } else {
                    posArr[i].x = posArr[i + 1].x;
                    posArr[i].y = posArr[i + 1].y;
                }
            }
            removeChild(wrap);
            this.draw();
        },
        run: function () {
            var _this = this;
            this.t = setInterval(function () {
                _this.move();
            }, 500)
        },
        changeDir: function (e) {
            var e = e || window.event,
                code = e.keyCode,
                dir = this.dir;
            switch (code) {
                case 38:
                    if (dir != 'DOWN' && dir != 'UP') {
                        this.dir = 'UP';
                    }
                    break;
                case 40:
                    if (dir != 'UP' && dir != 'DOWN') {
                        this.dir = 'DOWN';
                    }
                    break;
                case 37:
                    if (dir != 'RIGHT' && dir != 'LEFT') {
                        this.dir = 'LEFT';
                    }
                    break;
                case 39:
                    if (dir != 'LEFT' && dir != 'RIGHT') {
                        this.dir = 'RIGHT';
                    }
                    break;
                default:
                    break;
            }
        }
    }

    function removeChild(ele) {
        var child = utils.getChildNode(ele),
            len = child.length;
        while (len > 0) {
            child[--len].remove();
        }
    }

    window.Snake = Snake;
}())