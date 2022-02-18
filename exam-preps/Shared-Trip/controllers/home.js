const { getAllTrips, getTripById, getMyTrips } = require('../services/trip');
const { tripViewModel } = require('../util/mappers');
const { isUser } = require('../middleware/guards');

const router = require('express').Router();


router.get('/', (req, res) => {
    res.render('home', { title: 'Home Page' });
});


router.get('/catalog', async (req, res) => {
    const data = await getAllTrips();
    const trips = data.map(tripViewModel);

    res.render('catalog', {
        title: "Shared Trips",
        trips
    });
});


router.get('/details/:id', async (req, res) => {
    try {
        const data = await getTripById(req.params.id);
        const trip = tripViewModel(data);

        if (req.session.user) {
            trip.user = {};

            if (req.session.user._id == trip.creator.id) {
                trip.user.isCreator = true;
            } else if (trip.buddies.some(b => b.id == req.session.user._id)) {
                trip.user.hasJoined = true;
            } else if (trip.seats > 0) {
                trip.user.canJoin = true;
                trip.user.buddyID = req.session.user._id;
            }
        }

        res.render('details', {
            title: "Trip Details",
            trip
        });
    } catch (err) {
        console.error(err);
        res.redirect('/404');
    }
});


router.get('/profile', isUser(), async (req, res) => {
    const data = await getMyTrips(req.session.user._id);
    const trips = [];
    data.forEach(t => trips.push({
        startPoint: t.startPoint,
        endPoint: t.endPoint,
        date: t.date,
        time: t.time
    }));
    const profile = {
        email: req.session.user.email,
        gender: req.session.user.gender,
        tripsCount: trips ? trips.length : 0,
        trips: trips
    };

    res.render('profile', {
        title: "Profile page",
        profile
    });
});


module.exports = router;