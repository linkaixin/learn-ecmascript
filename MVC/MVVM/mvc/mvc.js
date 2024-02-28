(function () {
    var init = function () {
        model.init();
        view.render();
        controller.init();
    }

    var model = {
        data: {
            a: 0,
            b: 0,
            s: '+',
            r: 0
        },
        init: function () {
            var _this = this;
            for (const key in _this.data) {
                Object.defineProperty(_this, key, {
                    get: function () {
                        return _this.data[key];
                    },
                    set: function (newVal) {
                        _this.data[key] = newVal;
                        view.render({ [key]: newVal });
                    }
                })
            }
        }
    }

    var view = {
        el: '#app',
        template: `
        <p>
           <span class="cal-a">{{ a }}</span> 
           <span class="cal-s">{{ s }}</span> 
           <span class="cal-b">{{ b }}</span> 
           <span>=</span> 
           <span class="cal-r">{{ r }}</span> 
        </p>
        <p>
           <input type="text" placeholder="Number a" class="cal-input a" />
           <input type="text" placeholder="Number b" class="cal-input b" />
        </p>
        <p>
           <button class="cal-btn">+</button>
           <button class="cal-btn">-</button>
           <button class="cal-btn">*</button>
           <button class="cal-btn">/</button>
        </p>
       `,
        render: function (data) {
            if (!data) {
                this.template = this.template.replace(/\{\{(.*?)\}\}/g, function (_, key) {
                    return model[key.trim()];
                })

                var oDiv = document.createElement('div');
                oDiv.innerHTML = this.template;
                document.querySelector(this.el).appendChild(oDiv);
            } else {
                for (const key in data) {
                    // 渲染
                    document.querySelector('.cal-' + key).innerHTML = data[key];
                }
            }
        }
    }

    var controller = {
        init: function () {
            var oInputs = document.querySelectorAll('.cal-input'),
                oBtns = document.querySelectorAll('.cal-btn'),
                oInputItem,
                oBtnItem;

            for (let i = 0; i < oInputs.length; i++) {
                oInputItem = oInputs[i];
                oInputItem.addEventListener('input', this.handlerInput, false)
            }
            for (let i = 0; i < oBtns.length; i++) {
                oBtnItem = oBtns[i];
                oBtnItem.addEventListener('click', this.handlerClick, false)
            }
        },
        handlerInput: function (e) {
            var e = e || window.event,
                tar = e.target || e.srcElement,
                val = Number(tar.value),
                field = tar.className.split(' ')[1];

            model[field] = val;
            with (model) {
                r = eval('a' + s + 'b')
            }
        },
        handlerClick: function (e) {
            var e = e || window.event,
                tar = e.target || e.srcElement,
                type = tar.innerText;
            model.s = type;
            with (model) {
                r = eval('a' + s + 'b')
            }
        }
    }

    init();
})()