; (function (doc) {
    var Slider = function (opt) {
        this.sliderItem = doc.getElementsByClassName(opt.sliderItem);
        this.sliderThumbItem = doc.getElementsByClassName(opt.sliderThumbItem);

        this.bindClick();
    }

    Slider.prototype = {
        bindClick: function () {
            var sliderItem = this.sliderItem,
                sliderThumbItem = this.sliderThumbItem;

            for (var i = 0; i < sliderThumbItem.length; i++) {
                (function (j) {
                    sliderThumbItem[j].onclick = function () {
                        for (var k = 0; k < sliderItem.length; k++) {
                            sliderItem[k].className = 'slider-item';
                            sliderThumbItem[k].className = 'slider-thumb-item'
                        }
                        sliderItem[j].className += ' active';
                        sliderThumbItem[j].className += ' cur';
                    }
                })(i)
            }
        }
    }

    window.Slider = Slider;
}(document))