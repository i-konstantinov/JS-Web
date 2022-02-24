const { Schema, model, Types: { ObjectId } } = require('mongoose');


const tripSchema = new Schema({
    startPoint: { type: String, minlength: [4, "Start point must be at least 4 characters long"] },
    endPoint: { type: String, minlength: [4, "End point must be at least 4 characters long"] },
    date: { type: String, required: true },
    time: { type: String, required: true },
    carImage: { type: String, required: true, validate: {
        validator(value) {
            return value.startsWith('http://') || value.startsWith('https://');
        }, 
        message: "Enter a valid url address for image"
    } },
    carBrand: { type: String, minlength: [4, "Car brand should be at least 4 characters long"] },
    seats: { type: Number, required: true, validate: {
        validator(value) {
            return value >= 0 && value <= 4;
        }, 
        message: "Seats must be a number between 0 and 4"
    } },
    price: { type: Number, required: true, validate: {
        validator(value) {
            return value > 0 && value < 51;
        }, 
        message: "Price must be between 1 and 50"
    } },
    description: { type: String, minlength: [10, "Description must be at least 10 characters long"] },
    creator: { type: ObjectId, ref: "User"},
    buddies: { type: [ ObjectId ], ref: "User", default: [] }
});

const Trip = model('Trip', tripSchema);

module.exports = Trip;