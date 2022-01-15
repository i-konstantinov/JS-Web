// - тази функция дава шаблон за различни изгледи / страници;
// - чрез шаблона лесно можем да модифицираме елементите / съдържанието;
function html(body, title = "Demo") {
    return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <title>${title}</title>
    <body>
        <nav>
            <ul>
                <li><a href="/">Home</a></li>
                <li><a href="/about">About</a></li>
                <li><a href="/catalog">Catalog</a></li>
            </ul>
        </nav>
        ${body}
    </body>
    </html>`;
}

function addItem(name, color) {
    const id = nextID();
    console.log(`Id for the newly created: ${id}`)
    data[id] = {
        name, 
        color
    };
}

// .map > деструктурираме всеки елемент от масива от масиви data.entries
// > за всеки елемент създaваме нов обект, в/ху който слагаме всички св-ва на item
// > и един обект, в/ху който слагаме id
function getItems() {
    return Object
    .entries(data)
    .map(([id, item]) => Object.assign({}, item, { id }));
}

function deleteItem(id) {
    delete data[id];
}

// примерна функция за създаване на уникално ID от 8 шестнайсетични символа;
function nextID() {
    let newId = 'xxxxxxxx'.replace(/x/g, () => (Math.random() * 16 | 0).toString(16));
    while (Object.keys(data).includes(newId)) {
        newId = 'xxxxxxxx'.replace(/x/g, () => (Math.random() * 16 | 0).toString(16));
    }
    return newId;
}


// примерна, проста база данни
const data = {
    '9a419f23':{
        name: 'Item 1',
        color: 'white'
    },
    "7b14d2c1": {
        name: 'Item 2',
        color: 'green'
    },
    '5c38e6a2': {
        name: 'Item 3',
        color: 'red'
    }
};


module.exports = { 
    html,
    getItems,
    addItem,
    deleteItem
};