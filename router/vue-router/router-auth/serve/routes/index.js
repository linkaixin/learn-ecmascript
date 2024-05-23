const router = require('koa-router')()

const user = require('../data/user.js');
const routers = require('../data/routers.js');

router.post('/user_router_auth', async (ctx, next) => {
  const { uid } = ctx.request.body;

  if (uid) {
    let authRouterInfo = [];

    const userInfo = user.filter(item => item.id == uid)[0];
    userInfo.auth.forEach(item => {
      routers.map(router => {
        if (router.id === item) {
          authRouterInfo.push(router);
        }
      })
    })

    ctx.body = authRouterInfo;
  } else {
    next();
  }
})

module.exports = router
