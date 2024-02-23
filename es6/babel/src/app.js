@testTable
class Person {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }

    @readonly
    say() {
        console.log(`${this.name}说：我${this.age}岁了。`);
    }

    eat() {
        console.log(1);
    }

    static drink() {
        console.log(2);
    }
}

function testTable(target) {
    console.log(target);
}

function readonly(target, name, descriptor) {
    console.log(target, name, descriptor, 22);
}

let log = (type) => {
    return function (target, name, descriptor) {
        let src_method = descriptor.value;
        descriptor.value = (...args) => {
            console.log(target, name, descriptor, 44);

            src_method.apply(target, args);
        }
    }
}

class AD {
    @log('show')
    show() {
        console.log('ad is show');
    }

    @log('click')
    click() {
        console.log('ad is click');
    }
}

let ad = new AD();
ad.show();
ad.click();