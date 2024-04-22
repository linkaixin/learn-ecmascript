import { compute } from "@/utils/index";

function calculatorReducer(data) {
    function setNumber(field, value) {
        data[field] = value;
        return compute(
            data.curMethod,
            data.first,
            data.second
        )
    }

    function changeMethod(method) {
        data.curMethod = method;
        return compute(
            data.curMethod,
            data.first,
            data.second
        )
    }

    return {
        setNumber,
        changeMethod,
    }
}

export default calculatorReducer