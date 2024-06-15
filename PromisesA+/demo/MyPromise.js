const PENDING = 'pending',
    FULFILLED = 'fulfilled',
    REJECTED = 'rejected';

function resolvePromise(promise2, x, resolve, reject) {
    if (promise2 === x) {
        return reject(new TypeError('Chaining cycle detected for MyPromise'))
    }

    let called = false;

    if ((typeof x === 'object' && x !== null) || typeof x === 'function') {
        try {
            let then = x.then;
            if (typeof then === 'function') {
                then.call(x, (y) => {
                    if (called) return
                    called = true
                    resolvePromise(promise2, y, resolve, reject)
                }, (r) => {
                    if (called) return
                    called = true
                    reject(r)
                })
            } else {
                resolve(x)
            }
        } catch (e) {
            if (called) return
            called = true
            reject(e)
        }
    } else {
        resolve(x)
    }
}

class MyPromise {
    constructor(executor) {
        this.status = PENDING;
        this.value = undefined;
        this.reason = undefined;

        this.onFulfilledCallbacks = [];
        this.onRejectedCallbacks = [];

        const resolve = (value) => {
            if (value instanceof MyPromise) {
                value.then(resolve, reject)
                return;
            }

            if (this.status === PENDING) {
                this.status = FULFILLED;
                this.value = value;

                this.onFulfilledCallbacks.forEach(fn => fn());
            }
        }

        const reject = (reason) => {
            if (this.status === PENDING) {
                this.status = REJECTED;
                this.reason = reason;

                this.onRejectedCallbacks.forEach(fn => fn());
            }
        }

        try {
            executor(resolve, reject);
        } catch (error) {
            reject(error);
        }

    }

    then(onFulfilled, onRejected) {
        onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : value => value;
        onRejected = typeof onRejected === 'function' ? onRejected : reason => { throw reason };

        let promise2 = new MyPromise((resolve, reject) => {
            if (this.status === FULFILLED) {
                setTimeout(() => {
                    try {
                        let x = onFulfilled(this.value);
                        resolvePromise(promise2, x, resolve, reject);
                    } catch (e) {
                        reject(e)
                    }
                }, 0)
            }

            if (this.status === REJECTED) {
                setTimeout(() => {
                    try {
                        let x = onRejected(this.reason);
                        resolvePromise(promise2, x, resolve, reject);
                    } catch (e) {
                        reject(e)
                    }
                }, 0)
            }

            if (this.status === PENDING) {
                this.onFulfilledCallbacks.push(() => {
                    setTimeout(() => {
                        try {
                            let x = onFulfilled(this.value);
                            resolvePromise(promise2, x, resolve, reject);
                        } catch (e) {
                            reject(e)
                        }
                    }, 0)
                })

                this.onRejectedCallbacks.push(() => {
                    setTimeout(() => {
                        try {
                            let x = onRejected(this.reason);
                            resolvePromise(promise2, x, resolve, reject);
                        } catch (e) {
                            reject(e)
                        }
                    }, 0)
                })
            }
        })

        return promise2;
    }

    catch(errorCallback) {
        return this.then(null, errorCallback);
    }

    finally(finallyCallback) {
        return this.then((value) => {
            return MyPromise.resolve(finallyCallback()).then(() => value)
        }, (reason) => {
            return MyPromise.resolve(finallyCallback()).then(() => {
                throw reason;
            })
        })
    }

    static resolve(value) {
        return new MyPromise((resolve, reject) => {
            resolve(value)
        })
    }

    static reject(reason) {
        return new MyPromise((resolve, reject) => {
            reject(reason)
        })
    }

    static all(promiseArr) {
        let arr = [],
            idx = 0,
            len = promiseArr.length;

        return new MyPromise((resolve, reject) => {
            promiseArr.forEach((promise, index) => {
                // 判断是普通值还是Promise
                if (isPromise(promise)) {
                    promise.then(value => {
                        formatResArr(value, index, resolve);
                    }, reject)
                } else {
                    formatResArr(promise, index, resolve);
                }
            })
        })

        function formatResArr(value, index, resolve) {
            arr[index] = value;

            if (++idx === len) {
                resolve(arr);
            }
        }
    }

    static allSettled(promiseArr) {
        let arr = [],
            idx = 0;

        return new MyPromise((resolve, reject) => {
            // 判断promiseArr是否可迭代
            if (!isIterable(promiseArr)) {
                return reject(new TypeError(`${promiseArr} is not iterable (cannot read property Symbol(Symbol.iterator))`))
            }

            promiseArr.forEach((promise, index) => {
                if (isPromise(promise)) {
                    promise.then(value => {
                        formatResArr('fulfilled', value, index, resolve)
                    }, reason => {
                        formatResArr('rejected', reason, index, resolve)
                    })
                } else {
                    formatResArr('fulfilled', promise, index, resolve)
                }
            })
        })

        function formatResArr(status, value, index, resolve) {
            switch (status) {
                case 'fulfilled':
                    arr[index] = { status, value };
                    break;
                case 'rejected':
                    arr[index] = { status, reason: value };
                    break;
                default:
                    break;
            }

            if (++idx === promiseArr.length) {
                resolve(arr);
            }
        }
    }

    static race(promiseArr) {
        return new MyPromise((resolve, reject) => {
            if (!isIterable(promiseArr)) {
                return reject(new TypeError(`${promiseArr} is not iterable (cannot read property Symbol(Symbol.iterator))`))
            }

            promiseArr.forEach(promise => {
                if (isPromise(promise)) {
                    promise.then(resolve, reject);
                } else {
                    resolve(promise)
                }
            })
        })
    }
}

function isPromise(x) {
    if ((typeof x === 'object' && x !== null) || typeof x === 'function') {
        let then = x.then;

        return typeof then === 'function';
    }
    return false
}

function isIterable(x) {
    if (x == null || x == undefined || typeof (x[Symbol.iterator]) !== 'function') {
        return false;
    }
    return true;
}

MyPromise.defer = MyPromise.deferred = function () {
    let deferred = {};
    deferred.promise = new MyPromise((resolve, reject) => {
        deferred.resolve = resolve;
        deferred.reject = reject;
    })
    return deferred;
}

module.exports = MyPromise;