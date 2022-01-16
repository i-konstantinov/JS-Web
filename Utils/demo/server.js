const http = require('http');

// създаваме сървъра, задаваме му порт
// проверяваме типа на request метода
// ако е POST, абонираме се за събитие, което носи данни /и логваме 'парчето' данни/
// данните идват като буфер, затова .toString()
// добавяме стринга към body;
// абонираме се и за събитие, което съобщава края на данните;
// парсваме стринга body в обект, за да можем да го модифицираме /но за write ни трябва str/
// задаваме вида на контента в хедърите
// "пишем" response-a и го приключваме
http.createServer((req, res) => {
    let body = '';
    
    if (req.method == 'GET') {
        res.write('OK');
        res.end();
    } else if (req.method == 'POST') {
        req.on('data', data => {
            console.log('Chunk >>>', data.toString());
            body += data;
        });
        req.on('end', () => {
            const bodyAsObj = JSON.parse(body);
            console.log(bodyAsObj);

            bodyAsObj.type += ' modified';

            res.writeHead(200, {
                'Content-Type': 'application/json'
            });
            res.write(JSON.stringify(bodyAsObj));
            res.end();
        });
    }
}).listen(3000);
