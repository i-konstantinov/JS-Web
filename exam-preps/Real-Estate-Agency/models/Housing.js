const { Schema, model, Types: { ObjectId } } = require('mongoose');


const housingSchema = new Schema({
    homeName: { type: String, minlength: [6, "Name should be at least 6 characters"] },
    type: { type: String, required: true, validate: {
        validator(value) {
            value = value.trim();
            return value == "Apartment" || value == 'Villa' || value == "House";
        },
        message: "Type can be on of the following: Apartment, Villa, House"
    }},
    year: { type: Number, required: true, validate: {
        validator(value) {
            return value > 1849 && value < 2022;
        },
        message: "Year should be between 1850 and 2021"
    } },
    city: { type: String, minlength: [4, "City name should be at least 4 characters"] },
    homeImage: { type: String, required: true, validate: {
        validator(value) {
            return value.startsWith('http://') || value.startsWith('https://');
        }, 
        message: "The Home Image should starts with http:// or https://"
    } },
    description: { type: String, required: true, maxlength: [60, "The Property Description should be a maximum of 60 characters long."] },
    availablePieces: { type: Number, required: true, validate: {
        validator(value) {
            return value > -1 && value < 11;
        },
        message: "The Available Pieces should be positive number (from 0 to 10)"
    } },
    rentedAHome: { type: [ ObjectId ], ref: "User", default: [] },
    owner: { type: ObjectId, ref: "User" }
});


const Housing = model('Housing', housingSchema);

module.exports = Housing;