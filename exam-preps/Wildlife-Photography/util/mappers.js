function mapErrors(err) {
    if (Array.isArray(err)) {
        return err;
    } else if (err.name == 'ValidationError') {
        return Object.values(err.errors).map(e => ({ msg: e.message }));
    } else if (typeof err.message == 'string') {
        return [{ msg: err.message }];
    } else {
        return [{ msg: 'Request error' }];
    }
}

function postViewModel(post) {
    const model = {
        id: post.id,
        title: post.title,
        keyword: post.keyword,
        location: post.location,
        date: post.date,
        image: post.image,
        description: post.description,
        author: post.author,
        votes: post.votes,
        rating: post.rating
    };

    if (model.author.firstName) {
        const cleanAuthor = {
            id: model.author._id.toString(),
            firstName: model.author.firstName,
            lastName: model.author.lastName
        }
        model.author = cleanAuthor;
    }

    if (model.votes.length > 0 && model.votes[0].email) {
        const cleanVotes = [];
        model.votes.forEach(v => cleanVotes.push(v.email));
        model.votes = cleanVotes.join(', ');
    }

    return model;
}

module.exports = {
    mapErrors,
    postViewModel
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