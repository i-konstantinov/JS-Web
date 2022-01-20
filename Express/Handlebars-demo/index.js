const app = require('express')();
const handlebars = require('express-handlebars');
const hbs = handlebars.create({ extname: '.hbs' });

// казваме на app-a да използва hbs като view engine
// подаваме и разширението, за което да се върже и самият engine;
app.engine('.hbs', hbs.engine);
// казваме на конфигурационната променлива "view engine", какви разширения да търси;
app.set('view engine', '.hbs');

let counter = 0;

const products = [
    { name: 'Hammer', price: 12},
    { name: 'Saw', price: 15.50},
    { name: 'ScrewDriver', price: 9},
    { name: 'Knife', price: 7.79}
];

app.get('/', (req, res) => {
    res.locals = {
        numberOfVisits: counter++,
        items: products
    };
    res.render('home', {
        layout: false,
    });
});

app.listen(3000);