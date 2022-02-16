const { isUser } = require('../middleware/guards');
const { getAllPosts, getMyPosts, getPostById } = require('../services/post');
const { postViewModel } = require('../util/mappers');

const router = require('express').Router();

router.get('/', (req, res) => {
    res.render('home', {
        title: 'Home Page',
    });
});


router.get('/catalog', async (req, res) => {
    const posts = (await getAllPosts()).map(postViewModel);

    res.render('catalog', {
        title: "All Posts",
        posts
    });
});


router.get('/catalog/:id', async (req, res) => {
    try {
        let post = await getPostById(req.params.id);
        post = postViewModel(post);
        
        if (req.session.user) {
            post.user = {};
            
            if (req.session.user._id == post.author.id) {
                post.user.isAuthor = true;
            } else if (post.votes.includes(req.session.user.email)) {
                post.user.hasVoted = true;
            }
        }

        console.log(post);
        res.render('details', {
            title: post.title,
            post
        });
    } catch (err) {
        console.error(err);
        res.redirect('/404');
    }
});


router.get('/profile/:id', isUser(), async (req, res) => {
    const userId = req.params.id;
    try {
        const posts = (await getMyPosts(userId)).map(postViewModel);
        res.render('profile', {
            title: "My post.",
            posts
        })
    } catch (err) {
        console.log(err);
        res.redirect('/404');
    }
});


module.exports = router;