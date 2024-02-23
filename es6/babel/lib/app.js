'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _desc, _value, _class2, _dec, _dec2, _desc2, _value2, _class3;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
    var desc = {};
    Object['ke' + 'ys'](descriptor).forEach(function (key) {
        desc[key] = descriptor[key];
    });
    desc.enumerable = !!desc.enumerable;
    desc.configurable = !!desc.configurable;

    if ('value' in desc || desc.initializer) {
        desc.writable = true;
    }

    desc = decorators.slice().reverse().reduce(function (desc, decorator) {
        return decorator(target, property, desc) || desc;
    }, desc);

    if (context && desc.initializer !== void 0) {
        desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
        desc.initializer = undefined;
    }

    if (desc.initializer === void 0) {
        Object['define' + 'Property'](target, property, desc);
        desc = null;
    }

    return desc;
}

var Person = testTable(_class = (_class2 = function () {
    function Person(name, age) {
        _classCallCheck(this, Person);

        this.name = name;
        this.age = age;
    }

    _createClass(Person, [{
        key: 'say',
        value: function say() {
            console.log(this.name + '\u8BF4\uFF1A\u6211' + this.age + '\u5C81\u4E86\u3002');
        }
    }, {
        key: 'eat',
        value: function eat() {
            console.log(1);
        }
    }], [{
        key: 'drink',
        value: function drink() {
            console.log(2);
        }
    }]);

    return Person;
}(), (_applyDecoratedDescriptor(_class2.prototype, 'say', [readonly], Object.getOwnPropertyDescriptor(_class2.prototype, 'say'), _class2.prototype)), _class2)) || _class;

function testTable(target) {
    console.log(target);
}

function readonly(target, name, descriptor) {
    console.log(target, name, descriptor, 22);
}

var log = function log(type) {
    return function (target, name, descriptor) {
        var src_method = descriptor.value;
        descriptor.value = function () {
            for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
                args[_key] = arguments[_key];
            }

            console.log(target, name, descriptor, 44);

            src_method.apply(target, args);
        };
    };
};

var AD = (_dec = log('show'), _dec2 = log('click'), (_class3 = function () {
    function AD() {
        _classCallCheck(this, AD);
    }

    _createClass(AD, [{
        key: 'show',
        value: function show() {
            console.log('ad is show');
        }
    }, {
        key: 'click',
        value: function click() {
            console.log('ad is click');
        }
    }]);

    return AD;
}(), (_applyDecoratedDescriptor(_class3.prototype, 'show', [_dec], Object.getOwnPropertyDescriptor(_class3.prototype, 'show'), _class3.prototype), _applyDecoratedDescriptor(_class3.prototype, 'click', [_dec2], Object.getOwnPropertyDescriptor(_class3.prototype, 'click'), _class3.prototype)), _class3));


var ad = new AD();
ad.show();
ad.click();
