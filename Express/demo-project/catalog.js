const { Router } = require('express');

const router = Router();

// ако след catalog няма друго
router.get('/', (req, res) => {
    res.sendFile(__dirname + '/sample-catalog.html');
});

router.get('/catalog/:productID', (req, res) => {
    const paramsObj = req.params;
    console.log(paramsObj)
    res.send(`Product ID: ${paramsObj.productID}`);
});

router.get('/catalog/:productID/details', (req, res) => {
    const paramsObj = req.params;
    res.send(`Details for product: ${paramsObj.productID}`);
});

router.get('/catalog/:category/:productID', (req, res) => {
    const paramsObj = req.params;
    console.log(paramsObj);
    res.send(`In catalog >>> Category: ${paramsObj.category} >>> Product: ${paramsObj.productID}`);
});

// ненаименован / default експорт
module.exports = router;