import { isObject } from "../shared/utils";
import { mutableHandler } from "./mutableHandler";

// 数据代理 实现访问state.a直接能访问到数据
export function useReactive(target) {
    return createReactObject(target, mutableHandler);
}

function createReactObject(target, baseHandler) {
    if (!isObject(target)) {
        return target
    }

    const observer = new Proxy(target, baseHandler);
    return observer;
}

