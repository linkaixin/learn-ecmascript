const fs = require('fs').promises;

function* getUserClass(uid) {
    const userData = yield fs.readFile('./data/user.json', 'utf8');
    const user = JSON.parse(userData);

    const userClassData = yield fs.readFile('./data/userClass.json', 'utf8');
    const userClass = JSON.parse(userClassData);

    let userClassList = {
        id: uid,
        name: '',
        userClass: []
    }

    user.map(u => {
        if (u.id === uid) {
            userClassList.name = u.name;
            userClass.map(uc => {
                if (uc.userId.includes(uid)) {
                    userClassList.userClass.push({
                        id: uc.id,
                        name: uc.name
                    });
                }
            })
        }
    })

    return userClassList;
}


function co(iterator) {
    return new Promise((resolve, reject) => {
        function walk(data) {
            const { value, done } = iterator.next(data);
            if (!done) {
                Promise.resolve(value).then(res => {
                    walk(res);
                }, reject)
            } else {
                resolve(value);
            }
        }

        walk();
    })
}

module.exports = {
    getUserClass,
    co
};