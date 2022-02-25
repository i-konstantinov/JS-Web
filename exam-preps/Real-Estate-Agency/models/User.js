const { Schema, model } = require('mongoose');



const userSchema = new Schema({
    username: { type: String, minlength: [5, "The username should be at least 5 characters long"] },
    name: { type: String, required: true, validate: {
        validator(value) {
            return value.trim().split(' ').length == 2;
        },
        message: "The name should be in the following format -> (firstname lastname)"
    } },
    hashedPassword: { type: String, required: true }
});

userSchema.index({ username: 1 }, {
    unique: true,
    collation: {
        locale: 'en',
        strength: 2
    }
});

const User = model('User', userSchema);

module.exports = User;