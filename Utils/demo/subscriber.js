const observer = require('./observer');


function subscribe() {
    observer.on('alert', (data) => {
        console.log('event received');
        // console.log(data);
    })
}

subscribe();
