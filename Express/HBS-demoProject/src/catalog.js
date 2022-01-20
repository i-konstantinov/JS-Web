// директно създаваме руутър
const router = require('express').Router();
const { getProducts, createProduct, updateProduct, getProductById } = require('./data');

// getProducts е async, затова и контролера е async
router.get('/', async (req, res) => {
    const products = await getProducts();
    res.locals = {
        title: "Catalog",
        products: products
    };
    res.render('catalog');
});

router.get('/create', (req, res) => {
    res.render('create');
});

router.post('/create', async (req, res) => {
    const product = {
        name: req.body.name,
        price: req.body.price,
        promoted: req.body.promoted ? true : false
    };
    createProduct(product);
    res.redirect('/catalog');
});

router.get('/edit/:id', async (req, res) => {
    const productId = req.params.id;
    const product = await getProductById(productId);
    res.locals = {
        product, 
        productId
    };
    res.render('edit');
});

module.exports = router;