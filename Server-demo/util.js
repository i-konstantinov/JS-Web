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




// примерна, проста база данни
const data = [
    {
        name: 'Item 1',
        color: 'white'
    },
    {
        name: 'Item 2',
        color: 'green'
    },
    {
        name: 'Item 3',
        color: 'red'
    }
];


module.exports = { 
    html,
    data
};