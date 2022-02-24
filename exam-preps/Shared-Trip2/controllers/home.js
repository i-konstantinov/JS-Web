const { isUser } = require('../middleware/guards');
const { getMyTrips } = require('../services/trip');

const router = require('express').Router();

router.get('/', (req, res) => {
    res.render('home', {
        title: 'Home Page',
    });
});


router.get('/profile/:id', isUser(), async (req, res) => {
    const trips = await getMyTrips(req.params.id);
    res.locals.user.tripCount = trips.length;
    res.render('profile', {
        title: "Profile Page",
        trips
    });
});


module.exports = router;