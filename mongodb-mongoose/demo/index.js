const mongoose = require('mongoose');

const Post = require('./models/Post');
const Comment = require('./models/Comment');


// за mongoose, стринга трябва да съдържа името на базата данни
const connectionString = 'mongodb://localhost:27017/myNewDatabase';


start();
async function start() {

    await mongoose.connect(connectionString, {
        useUnifiedTopology: true,
        useNewUrlParser: true
    });
    console.log('Database connected');

    /*
    const comment = await Comment.findOne({});
    const post = await Post.findOne({});
    post.comments.push(comment);
    await post.save();
    */

    // подаваме името на св-вото, което искаме да популираме
    // mongoose проверява в дефиницията му за ref и на къде сочи
    // прави заявка към съответната колекция и взима данните
    // заменя масива с ObjectId-та с масив с реалните инстанции
    const post = await Post.findOne({}).populate('comments', 'content');
    console.log(post);
}
