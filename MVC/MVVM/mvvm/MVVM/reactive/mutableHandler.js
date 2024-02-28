import { useReactive } from ".";
import { statePool } from "../compiler/state";
import { update } from "../render";
import { hasOwnProerty, isEqual, isObject } from "../shared/utils";

const get = createGetter(),
    set = createSetter();

function createGetter() {
    return function get(target, key, receiver) {
        const res = Reflect.get(target, key, receiver);

        console.log('响应式获取：', target[key]);

        if (isObject(res)) {
            return useReactive(res)
        }

        return res;
    }
}

function createSetter() {
    return function set(target, key, value, receiver) {
        const isKeyExist = hasOwnProerty(target, key),
            oldValue = target[key],
            res = Reflect.set(target, key, value, receiver);

        if (!isKeyExist) {
            console.log('响应式新增', key, value);
        } else {
            if (!isEqual(res, oldValue)) {
                console.log('响应式修改', key, value);
                // update
                update(statePool, key, value)
            }
        }

        return res;
    }
}

const mutableHandler = {
    get,
    set
}

export {
    mutableHandler
}