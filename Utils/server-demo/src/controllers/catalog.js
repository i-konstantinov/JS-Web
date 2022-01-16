const { loadFragment, render } = require("../view");
const { getProducts, createProduct, getProductById, updateProduct } = require('../data');

module.exports = {
    async catalog(req, res) {
        const products = await getProducts();
        loadFragment('catalog', (fragment) => {
            const result = fragment.replace('{{{items}}}', products.map(p => `<li>${p.name} - ${p.price} <a href="/edit?id=${p._id}">[Edit]</a></li>`).join('\n'));
            
            const html = render(result, 'Catalog');

            res.html(html);
        })
    },

    createGet(req, res) {
        loadFragment('create', (fragment) => {
            res.html(render(fragment, "Create Product"))
        });
    },

    createPOST(req, res) {
        let body = '';
        req.on('data', (chunk) => {
            body += chunk.toString();
        });
        
        req.on('end', async () => {
            /*
            const formData = body
                .split('&')
                .map(part => part.split('='))
                .reduce((result, [key, val]) => Object.assign(result, { [key]: decodeURIComponent(val.split('+').join(' ')) }), {});
            */
            
            const rawFormData = body.split('&').map(part => part.split('='));
            const formData = {};
            rawFormData.forEach(el => Object.assign(formData, {[el[0]]: el[1]}));
            
            await createProduct({
                name: formData.name,
                price: Number(formData.price)
            });
            res.redirect('/catalog');
        })
    },

    async editGet(req, res) {
        const productId = req.url.searchParams.get('id');
        const product = await getProductById(productId);
        
        loadFragment('edit', (fragment) => {
            const result = fragment
                .replace('{{{_id}}}', productId)
                .replace('{{{name}}}', product.name)
                .replace('{{{price}}}', product.price);
            
                res.html(render(result, "Edit Item"))
        });
    },

    async editPost(req, res) {
        const productId = req.url.searchParams.get('id');
        
        let body = '';
        req.on('data', (chunk) => {
            body += chunk.toString();
        });
        
        req.on('end', async () => {

            const rawFormData = body.split('&').map(part => part.split('='));
            const formData = {};
            rawFormData.forEach(el => Object.assign(formData, {[el[0]]: el[1]}));
            
            await updateProduct(productId, {
                name: formData.name,
                price: Number(formData.price)
            });
            res.redirect('/catalog');
        })
    }
};