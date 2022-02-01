const { Schema, model, Types: { ObjectId } } = require('mongoose');

// създаваме колекция от публикации с релации към друга колекция
// comments: казваме че колекцията ще има comments 
// типът на коментс ще е масив от обекти
// ref => релация към "име-на-модела"
const postSchema = new Schema({
    title: { type: String, minlength: 3 },
    content: { type: String, required: true },
    comments: { type: [ObjectId], default: [], ref: 'Comment' }
});

const Post = model('Post', postSchema);
module.exports = Post;