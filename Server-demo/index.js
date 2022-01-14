// основен модул

// 1. Зареждаме нужните модули
const http = require('http');
const router = require('./router');
const { homeController, aboutController } = require('./controllers/homeController');
const { catalogController, createController } = require('./controllers/catalogController')


// 2. ИНИЦИАЛИЗИРАНЕ НА СЪРВЪРА
// - на createServer метода му подаваме request-listener / callback == функция, която ще приеме информация за заявката, под формата на request и response;
// - в request , NodeJS , слага информация за заявката , както в променливата event, в event-listener, слага инфо за събитието; (тук са метода, url, headers и тн…);
// - в response , NodeJS, ще сложи колбеци, които да извикаме и по този начин, да върнем отговор;
const server = http.createServer(router.main);

router.get('/', homeController);
router.get('/about', aboutController);
router.get('/catalog', catalogController);
router.post('/create', createController);

// - трябва да зададем на сървъра порт, на който да слуша (на който ще се стартира);
// - стартираме го в терминал: node index.js;
server.listen(3000);

