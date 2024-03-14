import { attrUpdate } from "./update";

export function reactive(vm, data) {
    for (const key in data) {
        Object.defineProperty(vm, key, {
            get() {
                return data[key];
            },
            set(newValue) {
                if (newValue === data[key]) return;
                data[key] = newValue;
                // updata
                attrUpdate(vm, key);
            }
        })
    }
}