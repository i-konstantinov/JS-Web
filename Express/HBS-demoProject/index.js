const express = require('express');
const hbs = require('express-handlebars');

const homeController = require('./src/home');
const catalogRouter = require('./src/catalog');
const aboutController = require('./src/about');

const app = express();

app.engine('.hbs', hbs.create({ extname: '.hbs' }).engine);
app.set('view engine', '.hbs');

// urlencoded e фактори функция, която инициализира middleware с някаква конфигурация /{ extended: true }/
// това връща функция, която ще прихваща req и res;
// middlewareа взима req, прочита потока, парсва го и
// го вкарва в на req.body /body е св-во на req/
// накрая вика next()
// всеки следващ хендлър по веригата ще има достъп до това body (хендлъра може да е контролер или middleware);
app.use(express.urlencoded({ extended: true }));

app.use('/content', express.static('static'));

app.get('/', homeController);

app.use('/catalog', catalogRouter);

app.get('/about', aboutController);

app.listen(3000, () => console.log('Server listening on port 3000'));


// Home page
// Catalog page
// - list of products
// - create product
// - edit product
// - delete product
// *shopping cart
// About page