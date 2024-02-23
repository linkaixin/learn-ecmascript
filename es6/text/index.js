// 读取3中的值
const fs = require('fs');

// 回调地狱
fs.readFile('./1.txt', 'utf-8', (err, data) => {
    if (data) {
        fs.readFile('./2.txt', 'utf-8', (err, data) => {
            if (data) {
                fs.readFile('./3.txt', 'utf-8', (err, data) => {
                    console.log(data);
                })
            }
        })
    }
})

// 使用Promise更改
function readFilePromise(path) {
    return new Promise((resolve, reject) => {
        fs.readFile(path, 'utf-8', (err, data) => {
            resolve(data)
        })
    })
}

// 使用链式操作前面的值需要返回一个Promise对象
readFilePromise('./1.txt').then(res => {
    return readFilePromise('./2.txt')
}).then(res => {
    return readFilePromise('./3.txt')
}).then(res => {
    console.log(res);   // 3
})

// 将方法改为Promise
function promiseify(func) {
    return function (...args) {
        return new Promise((resolve, reject) => {
            func(...args, (err, data) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(data)
                }
            })
        })
    }
}

const readFile = promiseify(fs.readFile)
readFile('./1.txt', 'utf-8').then(res => {
    return readFile('./2.txt', 'utf-8')
}).then(res => {
    return readFile('./3.txt', 'utf-8')
}).then(res => {
    console.log(res, 11);
})

// 将fs上的方法都改为Promise方法
function promiseifyAll(obj) {
    for (const [key, val] of Object.entries(obj)) {
        if (typeof val === 'function') {
            obj[key + 'Async'] = promiseify(val);
        }
    }
}
promiseifyAll(fs);
fs.readFileAsync('./1.txt', 'utf-8').then(res => {
    return fs.readFileAsync('./2.txt', 'utf-8')
}).then(res => {
    return fs.readFileAsync('./3.txt', 'utf-8')
}).then(res => {
    console.log(res, 22);
})

function* read() {
    var value1 = yield readFile('./1.txt', 'utf-8');
    var value2 = yield readFile(`./${value1}.txt`, 'utf-8');
    var value3 = yield readFile(`./${value2}.txt`, 'utf-8');
    console.log(value3, 55);
}

var iter = read();
var value = iter.next().value;
value.then(res => {
    return iter.next(res).value;
}).then(res => {
    return iter.next(res).value;
}).then(res => {
    iter.next(res);
})

function Co(iter) {
    return new Promise((resolve, reject) => {
        var next = (data) => {
            var { value, done } = iter.next(data);
            if (done) {
                resolve(value);
            } else {
                value.then(res => {
                    next(res);
                })
            }
        }
        next();
    })
}

Co(read());

// await返回的值会通过Promise.resovle()转为Promise对象
// 发生在async中的错误可以通过.catch中捕获
async function readAsync() {
    var value1 = await readFile('./1.txt', 'utf-8');
    var value2 = await readFile(`./${value1}.txt`, 'utf-8');
    var value3 = await readFile(`./${value2}.txt`, 'utf-8');
    console.log(value3, 66);
    console.log(a);

    return value3;
}
readAsync().then(res => {
    console.log(res, 77);   // 4
}).catch(err => {
    console.log(err, 888);
})