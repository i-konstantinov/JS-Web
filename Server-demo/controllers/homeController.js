const { html } = require('../util');

// само "тялото" на page-овете;
const homePage = `
<h1>Home</h1>
<p>Hello JS world!</p>`;

const aboutPage = `
<h1>About</h1>
<p>This is an intro to Node.js!</p>`;


function homeController(req, res) {
    res.write(html(homePage));
    res.end();
}

function aboutController(req, res) {
    res.write(html(aboutPage));
    res.end();
}

module.exports = {
    homeController, 
    aboutController
};