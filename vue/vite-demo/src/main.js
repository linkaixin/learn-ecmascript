// import('./utils').then(module => {
//     console.log(module);
//     const { a, b } = module.default;
//     const { plus, minus } = module;
//     console.log(plus(a, b));
//     console.log(minus(a, b));
// })

(async () => {
    const { default: { a, b }, plus, minus } = await import('./utils');
    console.log(plus(a, b));
    console.log(minus(a, b));
})()