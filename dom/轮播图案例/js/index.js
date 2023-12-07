; (function (doc) {
    var oSliderItem = doc.getElementsByClassName('slider-item'),
        oSliderThumb = doc.getElementsByClassName('slider-thumb-content')[0],
        oSliderThumbItem = doc.getElementsByClassName('slider-thumb-item');

    var init = function () {
        bindEvent()
    }

    var bindEvent = function () {
        oSliderThumb.addEventListener('click', bindClick, false)
    }

    function bindClick(e) {
        var e = e || window.event,
            target = e.target || e.srcElement,
            oLi = target.parentNode.parentNode,
            oLiClassName = oLi.className,
            indexOf = Array.prototype.indexOf,
            index = -1;
        if (oLiClassName == 'slider-thumb-item') {
            index = indexOf.call(oSliderThumbItem, oLi);
            for (let i = 0; i < oSliderThumbItem.length; i++) {
                oSliderItem[i].className = 'slider-item';
                oSliderThumbItem[i].className = 'slider-thumb-item'
            }
            oSliderItem[index].className += ' active';
            oSliderThumbItem[index].className += ' cur';
        }
    }
    init();
})(document)