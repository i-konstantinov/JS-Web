
const TripService = require('../services/trip');


function preload() {
    return async function (req, res, next) {
        const id = req.params.id;
        try {
            const trip = await TripService.getTripById(id);
            res.locals.trip = trip;
            next();
        } catch (err) {
            res.redirect('/404');
        }
    };
}

module.exports = preload;