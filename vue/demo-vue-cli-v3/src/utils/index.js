function compute(method, first, second) {
    switch (method) {
        case "plus":
            return first + second
        case "minus":
            return first - second
        case "mul":
            return first * second
        case "div":
            return first / second
        default:
            break
    }
}

export {
    compute
}