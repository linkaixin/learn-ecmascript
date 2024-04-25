function render(refSet) {
    for (let key in refSet) {
        _render(refSet[key])
    }
}

function _render({ deps, value }) {
    deps.forEach(el => {
        el.textContent = value
    });
}

function update(ref) {
    _render(ref)
}

export {
    render,
    update
}