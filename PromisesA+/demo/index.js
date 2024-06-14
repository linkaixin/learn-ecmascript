const MyPromise = require('./MyPromise')

MyPromise.resolve(new MyPromise((resolve, reject) => {
    setTimeout(() => {
        resolve('123')
    }, 2000)
})).then(res => {
    console.log(res);
})

MyPromise.reject('0').catch(err => {
    console.log(err);
})