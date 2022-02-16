const { Schema, model, Types: { ObjectId } } = require('mongoose');

const DATE_PATTERN = /^(\d{2})\.(\d{2})\.(\d{4})$/;

const postSchema = new Schema({
    title: { type: String, minlength: [6, "Title is required and must be at least 6 characters long"] },
    keyword: { type: String, minlength: [6, "Keyword is required and must be at least 6 characters long"] },
    location: { type: String, required: true, maxlength: [15, "Location must not be more than 15 characters long"] },
    date: {
        type: String,
        required: [true, "Date of creation is required"],
        validate: {
            validator(value) {
                return DATE_PATTERN.test(value);
            },
            message: "Date must be in the following format: 'dd.mm.year'"
        }
    },
    image: {
        type: String,
        required: [true, "Image path is required"],
        validate: {
            validator(value) {
                if (value.startsWith('http://') || value.startsWith('https://')) {
                    return true;
                }
                return false;
            },
            message: "Enter a valid image url"
        }
    },
    description: { type: String, minlength: [8, "Description must be at least 8 characters long"] },
    author: { type: ObjectId, ref: "User", required: true },
    votes: { type: [ObjectId], ref: "User", default: [] },
    rating: { type: Number, default: 0 }
});

const Post = model('Post', postSchema);

module.exports = Post;