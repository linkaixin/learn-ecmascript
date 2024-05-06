async function createContext(app) {
    // 获取根目录
    console.log(process.cwd());
    return {
        app,
        appPath: process.cwd(),
    }
}

exports.createContext = createContext