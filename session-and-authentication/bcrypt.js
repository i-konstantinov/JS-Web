const bcrypt = require('bcrypt');

const pass1 = '123';
start();

async function start() {
    // подаваме паролата, която ще хешираме
    // подаваме колко пъти да се завърти през "солта"
    const hash = await bcrypt.hash(pass1, 5);
    console.log(hash)

    // const hash = '$2b$10$mRcJ0cw8NW7a1tMz7BvrG.C3wZcPs32wsjpq4CSb5mX4XxW63aEHu';
    // console.log(await bcrypt.compare(pass1, hash)); // true

}