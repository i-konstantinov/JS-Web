const { Schema, model } = require('mongoose');


const carSchema = new Schema({
    name: { type: String, require: true },
    price: {
        type: Number,
        default: 0
    }
});

carSchema.methods.startEngine = function () {
    console.log(`${this.name} goes Vroom!`);
};

// подаваме име на свойството
// използваме get, подаваме callback => функция, която върши нещо;
carSchema.virtual('VAT').get((function () {
    return this.price * 0.2;
}));

carSchema.path("price").validate(function(value) {
        return value >= 0;
    },
    'Price cannot be negative!'
);

const Car = model('Car', carSchema);
module.exports = Car;