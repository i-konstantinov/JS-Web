// променливата /тук fs/ можем да я кръстим както искаме;
const fs = require('fs');

// readFileSync == синхронната версия на readFile метода;
// подаваме пътя до файла и енкодинга -опционално /default == utf-8/
// readFileSync ще върне буфер, затова .toString();
/*
const file = fs.readFileSync('./file.txt');
console.log(file.toString());
*/
// достъпът до файловата сис е асинхронен /дълго продължаващ процес/
// синхронната версия блокира приложението, докато чете от файловата сист / DB
// защото всичко се изпълнява стъпка по стъпка


// асинхронна версия
// подаваме пътя , encoding='utf8' /по подразбиране/
// подаваме и опции или колбек, който да ни върне някакъв резултат, той приема поне два параметъра /ПЪРВИЯТ ВИНАГИ Е ERROR/
// ако всичко е ок, няма error и четем данните
fs.readFile('./file.txt', (err, data) => {
    if (err == null) {
        console.log(data.toString());
    }
});


// вариант с async/await, вместо колбек
/*
async function start() {
    const data = await fs.readFile('./file.txt');
    console.log(data.toString());
}
start();
*/

// readdir връща масив
const list = fs.readdirSync('./');
console.log(list);


const filePath = './data.json';
// // парсваме, защото readFile връща стринг
// let data = JSON.parse(fs.readFileSync(filePath));
// console.log(data);

// // редактираме / променяме файла
// data.age++

// // writeFile винаги пренаписва целият файл!
// // ако не превърнем в стринг, интерпретатора автоматично ще направи data.toString()
// // което на обект ще върне [Object object]
// // първият парам == информацията, която ще записваме
// // вторият == replacer
// // колко знака индентация да сложи при форматирането на файла, за да го видим на няколко реда /за по-прегледно/
// fs.writeFileSync(filePath, JSON.stringify(data, null, 2));

// let modifiedData = JSON.parse(fs.readFileSync(filePath));
// console.log(modifiedData);

// async вариант с колбеци
fs.readFile(filePath, (err, dataAsText) => {
    const data = JSON.parse(dataAsText);
    console.log('read complete', data);

    data.age++;

    fs.writeFile(filePath, JSON.stringify(data, null, 2), (err) => {
        console.log('write complete', data);
    });
});