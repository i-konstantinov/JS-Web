const app = require('express')();
const handlebars = require('express-handlebars');
const hbs = handlebars.create({ extname: '.hbs' });

// казваме на app-a да използва hbs като view engine
// подаваме и разширението, за което да се върже и самият engine;
app.engine('.hbs', hbs.engine);
// казваме на конфигурационната променлива "view engine", какви разширения да търси;
app.set('view engine', '.hbs');

// handlebars очаква да намери папка layout в папка views
// можем да прескочим това чрез {layout: false}
app.get('/', (req, res) => {
    res.render('home', {layout: false});
});

app.listen(3000);