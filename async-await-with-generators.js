// ============= Reslover function ============= //
window['resloveAwaiter'] = (generator) => {
    // Fire generator for the first time
    const generatorObject = generator();
    const { value, done } = generatorObject.next();
    if (done) return; // Check if it's done
    const reslover = (asyncFn) => {
        if (asyncFn.then) {
            asyncFn.then(data => {
                const {value, done} = generatorObject.next(data);
                // Check if the generator is not finished yet and call reslover recursively
                if (!done) reslover(value);
            });
        } else if (typeof asyncFn === 'function') { // Must be a cb
            asyncFn(data => {
                const {value, done} = generatorObject.next(data);
                // Check if the generator is not finished yet and call reslover recursively
                if (!done) reslover(value);
            });
        }
    }
    reslover(value);
}
