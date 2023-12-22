; (function () {
    var LeftMenu = function (opt) {
        this.menu = opt.menu;
        this.menuList = opt.menuList;
        this.menuListItems = opt.menuListItems;
        this.subList = opt.subList;
        this.subListItems = opt.subListItems;
        this.mousePoses = [];
        this.isInSub = false;
    }

    LeftMenu.prototype = {
        init: function () {
            this.addEvent();
        },
        addEvent: function () {
            var _this = this,
                menuListLen = this.menuListItems.length,
                menuItem,
                t = null,
                boundMouseMove = mouseMove.bind(_this);

            utils.addEvent(this.menu, 'mouseenter', function () {
                utils.addEvent(document, 'mousemove', boundMouseMove)
            })

            utils.addEvent(this.menu, 'mouseleave', function () {
                out.call(_this)
                utils.removeEvent(document, 'mousemove', boundMouseMove)
            })

            utils.addEvent(this.subList, 'mouseenter', function () {
                _this.isInSub = true;
            })

            utils.addEvent(this.subList, 'mouseleave', function () {
                _this.isInSub = false;
            })

            for (var i = 0; i < menuListLen; i++) {
                menuItem = this.menuListItems[i];
                utils.addEvent(menuItem, 'mouseenter', function (e) {
                    selectMenu.apply(_this, [e, t])
                })
            }
        }
    }

    function selectMenu(e, t) {
        var _this = this,
            e = e || window.event,
            target = e.target || e.srcElement,
            thisIdx = Array.prototype.indexOf.call(this.menuListItems, target),
            curPos = this.mousePoses[2] || { x: 0, y: 0 },
            lastPos = this.mousePoses[1] || { x: 0, y: 0 },
            toDelay = doTimeout.apply(_this, [curPos, lastPos]);
        this.subList.style.display = 'block';

        console.log(target, 111);
        if (t) {
            clearTimeout(t);
        }

        if (toDelay) {
            t = setTimeout(function () {
                if (_this.isInSub) {
                    return;
                }
                addActive.call(_this, thisIdx);
                t = null;
            }, 200)
        } else {
            addActive.call(_this, thisIdx);
        }
    }

    function mouseMove(e) {
        var e = e || window.event;
        this.mousePoses.push({
            x: utils.pagePos(e).X,
            y: utils.pagePos(e).Y
        })

        if (this.mousePoses.length > 3) {
            this.mousePoses.shift();
        }
    }

    function doTimeout(curPos, lastPos) {
        var rightTop = {
            x: parseInt(utils.getStyles(this.menu, 'width')),
            y: utils.getElementPosition(this.menu).top
        },
            rightBottom = {
                x: parseInt(utils.getStyles(this.menu, 'width')),
                y: utils.getElementPosition(this.menu).top + parseInt(utils.getStyles(this.menu, 'height'))
            };

        return utils.pointInTriangle(curPos, lastPos, rightTop, rightBottom);

    }

    // 移除其他菜单的选中状态
    function resetMenu() {
        var menuListLen = this.menuListItems.length,
            menuItem,
            subItem;

        for (let i = 0; i < menuListLen; i++) {
            menuItem = this.menuListItems[i];
            subItem = this.subListItems[i];
            menuItem.className = 'menu-list-item';
            subItem.className = 'sub-list-item';
        }
    }

    function addActive(index) {
        resetMenu.call(this)
        this.subList.style.display = 'block';
        this.menuListItems[index].className += ' active';
        this.subListItems[index].className += ' active';
    }

    function out() {
        resetMenu.call(this)
        this.subList.style.display = 'none';
    }
    window.LeftMenu = LeftMenu;
})()