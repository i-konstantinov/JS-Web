const mongoose = require('mongoose');

const Car = require('./models/Car');

// за mongoose, стринга трябва да съдържа името на базата данни
const connectionString = 'mongodb://localhost:27017/myNewDatabase';


start();
async function start() {

    await mongoose.connect(connectionString, {
        useUnifiedTopology: true,
        useNewUrlParser: true
    });
    console.log('Database connected');

    // try {
    //     const car = new Car({
    //         name: 'Opel Vectra',
    //         price: -100
    //     });
    //     await car.save();
    // } catch (err) {
    //     console.log(err.message);
    //     console.log(err.errors)
    // }

    const data = await Car.find({});
    console.log(data);
    data.forEach(c => c.startEngine());
    data.forEach(c => console.log(`${c.name}'s VAT is ${c.VAT}`));
}