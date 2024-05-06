const resolvePlugins = (context, plugins) => {
    plugins.forEach(plugin => {
        plugin(context)
    });
}

exports.resolvePlugins = resolvePlugins;