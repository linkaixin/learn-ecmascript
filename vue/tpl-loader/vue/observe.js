import Observer from './observer'
function observe(data) {
    if (data === null || typeof data !== 'object') return;

    return new Observer(data);
}

export default observe;