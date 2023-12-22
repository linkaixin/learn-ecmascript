window.onload = function () {
    init();
}

var init = function () {
    initMenu();
}

var initMenu = (function () {
    var oMenu = document.getElementsByClassName('menu-wrap')[0],
        oMenuItems = document.getElementsByClassName('menu-list-item'),
        menuLen = oMenuItems.length,
        oSub = document.getElementsByClassName('sub-list')[0],
        oSubItems = document.getElementsByClassName('sub-list-item'),
        isInSub = false,
        menuItem,
        subItem,
        t = null,
        mousePoses = [];

    utils.addEvent(oMenu, 'mouseenter', function () {
        utils.addEvent(document, 'mousemove', mouseMove);
    });

    utils.addEvent(oMenu, 'mouseleave', menuMouseOut);

    for (let i = 0; i < menuLen; i++) {
        menuItem = oMenuItems[i];
        utils.addEvent(menuItem, 'mouseenter', menuItemMouseEnter);
    }

    utils.addEvent(oSub, 'mouseenter', function () {
        isInSub = true;
    })

    utils.addEvent(oSub, 'mouseleave', function () {
        isInSub = false;
    })

    function menuMouseOut() {
        oSub.style.display = 'none';
        removeAllActive();
        utils.removeEvent(document, 'mousemove', mouseMove);
    }

    function menuItemMouseEnter(e) {
        var e = e || window.event,
            tar = e.target || e.srcElement,
            thisIdx = Array.prototype.indexOf.call(oMenuItems, tar),
            curPos = mousePoses[2] || { x: 0, y: 0 },
            lastPos = mousePoses[1] || { x: 0, y: 0 },
            toDelay = doTimeout(curPos, lastPos);

        console.log(toDelay);
        oSub.style.display = 'block';

        if (t) {
            clearTimeout(t);
        }

        if (toDelay) {
            t = setTimeout(function () {
                if (isInSub) {
                    return;
                }
                addActive(thisIdx);
                t = null;
            }, 200)
        } else {
            addActive(thisIdx);
        }
    }

    function addActive(index) {
        removeAllActive();
        oMenuItems[index].className += ' active';
        oSubItems[index].className += ' active';
    }

    function removeAllActive() {
        for (let i = 0; i < menuLen; i++) {
            menuItem = oMenuItems[i];
            subItem = oSubItems[i];
            menuItem.className = 'menu-list-item';
            subItem.className = 'sub-list-item';
        }
    }

    function mouseMove(e) {
        var e = e || window.event;
        mousePoses.push({
            x: utils.pagePos(e).X,
            y: utils.pagePos(e).Y
        });

        if (mousePoses.length > 3) {
            mousePoses.shift();
        }
    }

    function doTimeout(curPos, lastPos) {
        var rightTop = {
            x: parseInt(utils.getStyles(oMenu, 'width')),
            y: utils.getElementPosition(oMenu).top
        },
            rightBottom = {
                x: parseInt(utils.getStyles(oMenu, 'width')),
                y: utils.getElementPosition(oMenu).top + parseInt(utils.getStyles(oMenu, 'height'))
            };

        return utils.pointInTriangle(curPos, lastPos, rightTop, rightBottom);
    }
})