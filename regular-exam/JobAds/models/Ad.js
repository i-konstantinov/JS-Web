const { Schema, model, Types: { ObjectId } } = require('mongoose');


const adSchema = new Schema({
    headline: { type: String, minlength: [4, "The Headline should be a minimum of 4 characters long"] },
    location: { type: String, minlength: [8, "The Location should be a minimum of 8 characters long"] },
    companyName: { type: String, minlength: [3, "The Company name should be at least 3 characters"] },
    companyDescription: { type: String, required: true, maxlength: [40, "The Company description should be a maximum of 40 characters long"] },
    author: { type: ObjectId, ref: "User", required: true },
    usersApplied: { type: [ ObjectId ], ref: "User", required: true }
});


const Ad = model('Ad', adSchema);

module.exports = Ad;