const router = require('express').Router();
const { isUser } = require('../middleware/guards');
const { mapErrors, postViewModel } = require('../util/mappers');
const { createPost, getPostById, editPostById, deletePost, vote } = require('../services/post');


router.get('/create', isUser(), (req, res) => {
    res.render('create', { title: "Create Post" });
});


router.post('/create', isUser(), async (req, res) => {
    const userId = req.session.user._id;
    const data = {
        title: req.body.title,
        keyword: req.body.keyword,
        location: req.body.location,
        date: req.body.date,
        image: req.body.image,
        description: req.body.description,
        author: userId
    }
    try {
        await createPost(data);
        res.redirect('/catalog');
    } catch (err) {
        const errors = mapErrors(err);
        res.render('create', {
            title: 'Create Post',
            data,
            errors
        });
    }
});


router.get('/edit/:id', isUser(), async (req, res) => {
    let post = await getPostById(req.params.id);
    
    if (!post) {
        return res.redirect('/404');
    }

    post = postViewModel(post);

    if (req.session.user._id != post.author.id) {
        return res.redirect('/login');
    }

    res.render('edit', {
        title: "Edit Post",
        post
    });
});

router.post('/edit/:id', isUser(), async (req, res) => {
    const existing = await getPostById(req.params.id);

    if (req.session.user._id != existing.author._id) {
        return res.redirect('/login');
    }

    const postId = req.params.id;
    const post = {
        title: req.body.title,
        keyword: req.body.keyword,
        location: req.body.location,
        date: req.body.date,
        image: req.body.image,
        description: req.body.description,
    }

    try {
        await editPostById(postId, post);
        res.redirect('/catalog/' + postId);
    } catch (err) {
        const errors = mapErrors(err);
        console.log(errors);
        
        post.id = postId;
        res.render('edit', {
            title: 'Edit Post',
            post,
            errors
        });
    }
});


router.get('/delete/:id', isUser(), async (req, res) => {
    const existing = await getPostById(req.params.id);
    if (req.session.user._id != existing.author._id) {
        return res.redirect('/login');
    }
    await deletePost(existing._id);
    res.redirect('/catalog');
});


router.get('/vote/:id/:type', isUser(), async (req, res) => {
    const postId = req.params.id;
    const userId = req.session.user._id;
    const voteValue = req.params.type == 'upvote' ? 1 : -1;

    try {
        await vote(postId, userId, voteValue);
        res.redirect('/catalog/' + postId);
    } catch (err) {
        const errors = mapErrors(err);
        console.log(errors);
        res.redirect('/catalog');
    }
});


module.exports = router;