const { Schema, model } = require('mongoose');


const EMAIL_PATTERN = /^([a-zA-Z]+)@([a-zA-Z]+)\.([a-zA-Z]+)$/;


const userSchema = new Schema({
    email: { type: String, required: true, validate: {
        validator(value) {
            return EMAIL_PATTERN.test(value);
        },
        message: "Enter a valid email address"
    } },
    gender: { type: String, required: [true, "Gender is required"], validate: {
        validator(value) {
            return value == 'male' || value == 'female';
        },
        message: "Gender can be male or female"
    } },
    hashedPassword: { type: String, required: true }
});

userSchema.index({ email: 1 }, {
    unique: true,
    collation: {
        locale: 'en',
        strength: 2
    }
});

const User = model('User', userSchema);

module.exports = User;