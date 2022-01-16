// модул за връзка с персистиращите данни - data service
// експортира методи за CRUD

// използваме промиси , защото четенето е дълъг процес и е по-добре да е асинхронен;
const fs = require('fs').promises;

async function readFile() {
    const data = JSON.parse((await fs.readFile('./data/products.json')).toString());
    return data;
}

async function getProducts() {
    const data = await readFile();
    return Object
    .entries(data)
    .map(([id, item]) => Object.assign({}, item, { _id: id }));
}


async function getProductById(id) {
    const data = await readFile();
    return data[id];
}


async function createProduct(product) {
    const data = await readFile();

    const _id = nextID();

    data[_id] = product;
    await fs.writeFile('./data/products.json', JSON.stringify(data, null, 2));
}


async function updateProduct(id, product) {
    const data = await readFile();
    data[id] = product;

    await fs.writeFile('./data/products.json', JSON.stringify(data, null, 2));
}

function nextID() {
    let newId = 'xxxxxxxx'.replace(/x/g, () => (Math.random() * 16 | 0).toString(16));
    return newId;
}


module.exports = {
    getProducts,
    createProduct,
    getProductById,
    updateProduct
}