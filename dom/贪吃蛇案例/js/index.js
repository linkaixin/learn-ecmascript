; (function () {
    var Snake = function (opt) {
        this.oWrap = opt.oWrap;
        this.wrapW = parseInt(utils.getStyles(this.oWrap, 'width'));
        this.wrapH = parseInt(utils.getStyles(this.oWrap, 'height'));

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
            this.createFood();
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
                wrapW = this.wrapW,
                wrapH = this.wrapH,
                posArr = this.posArr,
                len = posArr.length,
                item,
                dir = this.dir;
            for (let i = 0; i < len; i++) {
                item = posArr[i];
                if (i == len - 1) {
                    setHeadXY(posArr, dir, wrapW, wrapH);
                } else {
                    posArr[i].x = posArr[i + 1].x;
                    posArr[i].y = posArr[i + 1].y;
                }
            }
            removeChild(wrap);
            this.draw();
            this.die();
            this.eatFood();
        },
        run: function () {
            var _this = this;
            this.t = setInterval(function () {
                _this.move();
            }, 100)
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
        },
        die: function () {
            // 当头部与身体某个部位重合就死掉了
            var _this = this,
                wrap = _this.oWrap,
                posArr = _this.posArr,
                len = posArr.length,
                head = posArr[len - 1],
                headX = head.x,
                headY = head.y,
                item;

            for (let i = 0; i < len - 1; i++) {
                item = posArr[i];
                if (headX == item.x && headY == item.y) {
                    setTimeout(function () {
                        alert('GAME OVER');
                        clearInterval(_this.t);
                        removeChild(wrap);
                        clearFood();
                    }, 100)
                }
            }
        },
        createFood: function () {
            var wrap = this.oWrap,
                span = document.createElement('span');
            span.className = 'food';
            span.style.left = foodPos(this.wrapW) * 20 + 'px';
            span.style.top = foodPos(this.wrapH) * 20 + 'px';
            wrap.appendChild(span);
        },
        eatFood: function () {
            // 当头部与实物重合的时候就吃掉了
            // 这时候如果x相同再判断arr[0].y与arr[1].y的大小得到方向
            // y相同判断arr[0].x和arr[1].x的大小得到方向
            var posArr = this.posArr,
                len = posArr.length,
                head = posArr[len - 1],
                headX = head.x,
                headY = head.y,
                food = document.getElementsByClassName('food')[0],
                foodX = food.offsetLeft,
                foodY = food.offsetTop,
                arrLastFirstX = posArr[0].x,
                arrLastFirstY = posArr[0].y,
                arrLastSecondX = posArr[1].x,
                arrLastSecondY = posArr[1].y,
                x,
                y;
            if (headX == foodX && headY == foodY) {
                if (arrLastFirstX == arrLastSecondX) {
                    x = arrLastFirstX;
                    if (arrLastFirstY < arrLastSecondY) {
                        // 向下
                        y = arrLastFirstY - 20;
                    } else {
                        // 向上
                        y = arrLastFirstY + 20;
                    }
                } else {
                    y = arrLastFirstY;
                    if (arrLastFirstX > arrLastSecondX) {
                        // 向左
                        x = arrLastFirstX + 20;
                    } else {
                        // 向右
                        x = arrLastFirstX - 20;
                    }
                }
                posArr.unshift({ x, y });
                clearFood();
                this.createFood();
            }
        }
    }

    function removeChild(ele) {
        var child = utils.getChildNode(ele),
            len = child.length;
        while (len > 0) {
            if (child[--len].className != 'food') {
                child[len].remove();
            }
        }
    }

    function setHeadXY(arr, dir, wrapW, wrapH) {
        var header = arr[arr.length - 1];
        switch (dir) {
            case 'LEFT':
                if (header.x <= 0) {
                    header.x = wrapW - 20;
                } else {
                    header.x -= 20;
                }
                break;
            case 'RIGHT':
                if (header.x >= wrapW - 20) {
                    header.x = 0
                } else {
                    header.x += 20;
                }
                break;
            case 'UP':
                if (header.y <= 0) {
                    header.y = wrapH - 20;
                } else {
                    header.y -= 20;
                }
                break;
            case 'DOWN':
                if (header.y >= wrapH - 20) {
                    header.y = 0;
                } else {
                    header.y += 20;
                }
                break;
            default:
                break;
        }
    }

    function foodPos(size) {
        return Math.floor(Math.random() * (size / 20));
    }

    function clearFood() {
        var food = document.getElementsByClassName('food')[0];
        if (food) {
            food.remove();
        }
    }

    window.Snake = Snake;
}())