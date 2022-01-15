// този модул съдържа цялата логика по откриването 
// и изпълнението на контролер
// и улавянето на 404

const routes = {};

function main(req, res) {
    console.log('>>>', req.method, req.url);

    const url = new URL(req.url, `http://${req.headers.host}`);
    req.url = url;

    let handler;
    const actions = routes[url.pathname];
    if (actions) {
        handler = actions[req.method];
        if (typeof handler == 'function') {
            handler(req, res);
        } else {
            res.statusCode = 404;
            res.write(`<h1>${res.statusCode} Not Found!</h1>`);
            res.end();
        }
    }
}

// тази функция създава нов pathname и 
// свързва го със съответният контролер
// подава съответният метод
function register(method, pathname, handler) {
    if (routes[pathname] == undefined) {
        routes[pathname] = {}
    }
    routes[pathname][method] = handler;
}

function get(pathname, handler) {
    register('GET', pathname, handler);
}

function post(pathname, handler) {
    register('POST', pathname, handler);
}

module.exports = {
    main,
    get,
    post,
}