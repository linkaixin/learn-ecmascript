import { compileTemplate } from "./compile";

const domNodePool = [];

export function createApp(options) {
    for (const option in options) {
        switch (option) {
            case 'components':
                initComponents(options.components);
                break;
            default:
                break;
        }
    }

    return {
        mount
    }
}

function initComponents(components) {
    for (const component of components) {
        let [template, state] = component()
        console.log("🚀 ~ initComponents ~ template, state:", template, state)
        const node = compileTemplate(template, state);
        domNodePool.push(node);
    }
}

function mount(el) {
    const app = document.querySelector(el);
    let oFrag = document.createDocumentFragment();

    domNodePool.forEach(node => {
        oFrag.appendChild(node);
    })

    app.appendChild(oFrag);
}