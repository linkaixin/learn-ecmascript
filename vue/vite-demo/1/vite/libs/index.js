const { PORT } = require('./config');
const { createServe, app } = require('./serve');
const { createContext } = require('./context');
const { resolvePlugins } = require('./plugins');
const plugins = require('../packages/plugins')

    ; (async () => {
        const serve = await createServe();
        const context = await createContext(app);

        resolvePlugins(context, plugins);

        serve.listen(PORT, () => {
            console.log(`serve is running ${PORT}`);
            console.log(`http://localhost:${PORT}`);
        })
    })();