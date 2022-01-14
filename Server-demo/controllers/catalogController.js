const { IncomingForm } = require('formidable');
const { html, data } = require('../util');

const catalogPage = (data) => `
<h1>Catalog</h1>
<form method="POST" action="/create">
    <label>Name: <input type="text" name="name"></label>
    <label>Color:
        <select name="color">
            <option value="white">White</option>
            <option value="green">Green</option>
            <option value="red">Red</option>
        </select>
    </label>
    <input type="submit" value="Create item">
</form>
<ul>
    ${data.map(el => `<li>Name: ${el.name}; Color: ${el.color}</li>`).join('\n')}
</ul>`;


function catalogController(req, res) {
    res.write(html(catalogPage(data)));
    res.end();
}

function createController(req, res) {
    console.log('create here');

    // създаваме нова formData
    // бодито на res идва като поток, на части
    // функцията parse е async, но не връща промис, а работи с подаден callback
    // игнорираме първият парам 'err' в този случай
    const form = new IncomingForm();
    form.parse(req, (err, fields) => {
        // callback-а се задейства след като заявката е обработена
        console.log(fields);

        const item = {
            name: fields.name,
            color: fields.color
        };

        // добавя новият item
        data.push(item);

        // добавяме статус и header location за пренасочване
        res.writeHead(301, {
            "Location": "/catalog"
        });
        
        // приключваме заявката
        res.end();
    });
}

module.exports = {
    catalogController,
    createController
};