// const { getUserClass, co } = require('./gen')

// const it = getUserClass(1);
// const { value, done } = it.next();
// value.then(res => {
//     const { value, done } = it.next(res);
//     value.then(res => {
//         const { value, done } = it.next(res);
//         console.log(value);
//     })
// })

// co(getUserClass(1)).then(res => {
//     console.log(res);
// }).catch(err => {
//     console.log(err);
// })

const fs = require('fs').promises;

async function getUserClass(uid) {
    const userData = await fs.readFile('./data/user.json', 'utf8');
    const user = JSON.parse(userData);

    const userClassData = await fs.readFile('./data/userClass.json', 'utf8');
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

getUserClass(1).then(res => {
    console.log(res);
}).catch(err => {
    console.log(err);
})