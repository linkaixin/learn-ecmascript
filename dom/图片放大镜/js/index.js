window.onload = function () {
    init()
}

var init = function () {
    initMagnifire()
}

var initMagnifire = (function () {
    var oWrap = document.getElementsByClassName('wrap')[0],
        oMag = oWrap.getElementsByClassName('mag-wrap')[0],
        oImg = oMag.getElementsByTagName('img')[0],
        magWidth = parseInt(utils.getStyles(oMag, 'width')),
        magHeight = parseInt(utils.getStyles(oMag, 'height')),
        left = utils.getElementPosition(oWrap).left,
        top = utils.getElementPosition(oWrap).top,
        maxX = left + parseInt(utils.getStyles(oWrap, 'width')),
        maxY = top + parseInt(utils.getStyles(oWrap, 'height'));

    console.log(left, top);

    utils.addEvent(oWrap, 'mouseover', function () {
        oMag.className += ' show'
        utils.addEvent(document, 'mousemove', mouseMove)
    })
    utils.addEvent(oWrap, 'mouseout', mouseOut)

    function mouseMove(e) {
        movePos(getXY(e).x, getXY(e).y, getXY(e).mouseX, getXY(e).mouseY)
    }

    function getXY(e) {
        var e = e || window.event;
        return {
            mouseX: parseInt(utils.pagePos(e).X),
            mouseY: parseInt(utils.pagePos(e).Y),
            x: parseInt(utils.pagePos(e).X) - left - magWidth / 2,
            y: parseInt(utils.pagePos(e).Y) - top - magHeight / 2,
        }
    }

    function movePos(x, y, mouseX, mouseY) {
        if (mouseX < left || mouseX > maxX || mouseY < top || mouseY > maxY) {
            mouseOut();
        }

        oMag.style.left = x + 'px';
        oMag.style.top = y + 'px';
        oImg.style.left = -x + 'px';
        oImg.style.top = -y + 'px';
    }

    function mouseOut() {
        console.log(1);
        oMag.className = 'mag-wrap'
        utils.removeEvent(document, 'mousemove', mouseMove)
    }
})