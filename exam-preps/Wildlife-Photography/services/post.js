const Post = require('../models/Post');


async function getAllPosts() {
    return Post.find({});
}


async function getMyPosts(userId) {
    return Post.find({})
            .where('author')
            .equals(userId)
            .populate('author', 'firstName lastName');
}


async function getPostById(id) {
    return Post.findById(id)
            .populate('author', 'firstName lastName')
            .populate('votes', 'email');
}


async function createPost(data) {
    const post = new Post(data);
    await post.save();
}


async function editPostById(id, post) {
    const existing = await Post.findById(id);

    existing.title = post.title;
    existing.keyword = post.keyword;
    existing.location = post.location;
    existing.date = post.date;
    existing.image = post.image;
    existing.description = post.description;

    await existing.save();
}


async function deletePost(id) {
    return Post.findByIdAndDelete(id);
}


async function vote(postId, userId, voteValue) {
    const post = await Post.findById(postId);
    
    if (post.votes.includes(userId)) {
        throw new Error('User already voted');
    }

    post.rating += voteValue;
    post.votes.push(userId);
    await post.save();
}


module.exports = {
    createPost,
    getAllPosts,
    getMyPosts,
    getPostById,
    editPostById,
    deletePost,
    vote
}

/**{
    _id: new ObjectId("620bc9e8cdb703a61161902f"),
    title: 'aaaaaa',
    keyword: 'aaaaaa',
    location: 'N.A.',
    date: '01.01.0011',
    image: 'http://asd.com',
    description: 'descrip descrip',
    author: new ObjectId("620ba02e4bc039e4756153fc"),
    votes: [],
    rating: 0,
    __v: 0
  } */