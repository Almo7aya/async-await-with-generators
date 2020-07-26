// ============= Fake methods ============= //

function output(data) {
    const p = document.createElement('p');
    p.textContent = data;
    document.body.appendChild(p);
}

function fakeLongPromise() {
    return new Promise(res => {
        setTimeout(res.bind(null, 'Hi from promise!'), 1000);
    });
}

function fakeLongCb(cb) {
    setTimeout(() => cb('Hi from cb!'), 1000);
}

// ============= async ============= //

resloveAwaiter(function* asyncContext() {
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
});
