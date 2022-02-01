const mongoose = require('mongoose');

// за mongoose, стринга трябва да съдържа името на базата данни
const connectionString = 'mongodb://localhost:27017/myNewDatabase';


// с Mongoose
start();
async function start() {

    await mongoose.connect(connectionString, {
        useUnifiedTopology: true,
        useNewUrlParser: true
    });

    console.log('Database connected');

    const carSchema = new mongoose.Schema({
        name: String,
        price: Number
    });

    const Car = mongoose.model('Car', carSchema);

    const car = new Car({
        name: 'VW Golf 3',
        price: 2500
    });
    await car.save();

    const data = await Car.find({});
    console.log(data);
}