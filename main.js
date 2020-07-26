// ============= Reslover function ============= //

const resloveAwaiter = (generator) => {
    // Fire generator for the first time
    const { value, done } = generator.next();
    if (done) return; // Check if it's done
    const reslover = (asyncFn) => {
        if (asyncFn.then) {
            asyncFn.then(data => {
                const {value, done} = generator.next(data);
                // Check if the generator is not finished yet and call reslover recursively
                if (!done) reslover(value);
            });
        } else if (typeof asyncFn === 'function') { // Must be a cb
            asyncFn(data => {
                const {value, done} = generator.next(data);
                // Check if the generator is not finished yet and call reslover recursively
                if (!done) reslover(value);
            });
        }
    }
    reslover(value);
}
resloveAwaiter(asyncContext()); // Invoke the reslover right away

// ============= Fake methods ============= //

function output(data) {
    const p = document.createElement('p');
    p.textContent = data;
    document.body.appendChild(p);
}

function fakeLongPromise (){
    return new Promise(res => {
        setTimeout(res.bind(null, 'Hi from promise!'), 1000);
    });
}

function fakeLongCb (cb) {
    setTimeout(() => cb('Hi from cb!'), 1000);
}

// ============= async ============= //

function* asyncContext() {
    let data = yield fakeLongPromise();
    output(data);

    data = yield fakeLongCb;
    output(data);

    data = yield fakeLongPromise();
    output(data);

    data = yield fakeLongCb;
    output(data);

    data = yield fakeLongPromise();
    output(data);

    data = yield fakeLongCb;
    output(data);

    data = yield fakeLongPromise();
    output(data);

    data = yield fakeLongCb;
    output(data);

    output('DONE !');
}
