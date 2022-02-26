const { Schema, model, Types: { ObjectId } } = require('mongoose');


const EMAIL_PATTERN = /^([a-zA-Z]+)@([a-zA-Z]+)\.([a-zA-Z]+)$/;

const userSchema = new Schema({
    email: { type: String, required: true, validate: {
        validator(v) {
            return EMAIL_PATTERN.test(v);
        }, 
        message: "Enter a valid email"
    } },
    hashedPassword: { type: String, required: true },
    description: { type: String, required: true, maxlength: [40, "The description of skills should be a maximum of 40 characters long"] },
    myAds: { type: [ ObjectId ], ref: "Ad", required: true, default: [] }
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