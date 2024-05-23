export function routerTree(data) {
    const hashMap = {};
    data.forEach(router => {
        hashMap[router.id] = { ...router, children: [] }
    });
    const routerRoot = [];
    data.forEach(router => {
        if (router.pid != 0) {
            if (hashMap[router.pid]) {
                hashMap[router.pid].children.push(hashMap[router.id]);
            }
        } else {
            routerRoot.push(hashMap[router.id])
        }
    })

    return routerRoot;
}

/**
 * 树形路由表生成路由数据
 * @param {*} routers 路由树 
 * @returns 路由
 */
export function generateRouter(routers) {
    let newRouter = routers.map(r => {
        let route = {
            path: r.path,
            name: r.name,
            component: () => import(`@/views/${r.name}.vue`)
        }

        if (r.children) {
            route.children = generateRouter(r.children)
        }

        return route;
    })
    return newRouter;
}