import observe from "./observe";

function defineReactiveData(data, key, value) {
    observe(value);
    Object.defineProperty(data, key, {
        get: function () {
            console.log('响应式数据获取:', value);
            return value;
        },
        set: function (newValue) {
            console.log('响应式数据更新:', newValue);
            if (newValue === value) return;
            observe(newValue);
            value = newValue;
        }
    })
}

export default defineReactiveData;