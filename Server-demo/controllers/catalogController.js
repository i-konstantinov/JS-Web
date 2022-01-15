const { IncomingForm } = require('formidable');
const { html, getItems, addItem, deleteItem } = require('../util');

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
    ${data.map(el => `<li>Name: ${el.name}; Color: ${el.color} <a href="/delete?id=${el.id}">[&#x1F5D1; Delete]</a></li>`).join('\n')}
</ul>`;


function catalogController(req, res) {
    const data = getItems();
    res.write(html(catalogPage(data)));
    res.end();
}

function createController(req, res) {
    // създаваме нова formData
    // бодито на res идва като поток, на части
    // функцията parse е async, но не връща промис, а работи с подаден callback
    // игнорираме първият парам 'err' в този случай
    const form = new IncomingForm();
    form.parse(req, (err, fields) => {
        // callback-а се задейства след като заявката е обработена
        console.log(fields);

        // добавя новият item в data-та      
        addItem(fields.name, fields.color);

        // добавяме статус и header location за пренасочване
        res.writeHead(301, {
            "Location": "/catalog"
        });
        
        // приключваме заявката
        res.end();
    });
}

// req.url.searchParams: URLSearchParams { 'id' => 'eff62ed5' }
// това е мапер, достъпваме информацияра в него , чрез метода гет
function deleteController(req, res) {
    const id = req.url.searchParams.get('id');
    deleteItem(id);
    res.writeHead(301, {
        "Location": "/catalog"
    });
    res.end();
}

module.exports = {
    catalogController,
    createController,
    deleteController
};