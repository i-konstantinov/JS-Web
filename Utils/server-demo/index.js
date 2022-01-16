const http = require('http');
const fs = require('fs');

const { get, post, match } = require('./src/router');
const { home } = require('./src/controllers/home');
const { catalog, createGet, createPOST, editGet, editPost } = require('./src/controllers/catalog');


get('/', home);
get('/catalog', catalog);
get('/create', createGet);
post('/create', createPOST);
get('/edit', editGet);
post('/edit', editPost);


http.createServer((req, res) => {
    if (req.url == '/favicon.ico') {
        fs.createReadStream('./static/favicon.ico').pipe(res);
    } else if (req.url.startsWith('/public/')) {
        fs.createReadStream(`./static/${req.url.slice(8)}`).pipe(res);
    } else {
        match(req, res);
    }
}).listen(3000);