module.exports = {
    promisify: function (fn) {
        return function (...args) {
            return new Promise((resolve, reject) => {
                fn(...args, (err, data) => {
                    if (err) {
                        return reject(err);
                    }

                    resolve(data);
                })
            })
        }
    },
    promisifyAll: function (fns) {
        Object.keys(fns).map(fnName => {
            if (typeof fns[fnName] === 'function') {
                fns[fnName + 'Async'] = this.promisify(fns[fnName])
            }
        })

        return fns;
    }
}