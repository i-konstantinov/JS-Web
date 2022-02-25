
const housingService = require('../services/housing');


function preload(populate) {
    return async function (req, res, next) {
        const id = req.params.id;
        let home;
        if (populate) {
            home = await housingService.getHomeByIdAndPopulate(id);
        } else {
            home = await housingService.getHomeById(id);
        }

        if (!home) {
            res.redirect('/404');
        } else {
            res.locals.home = home;
            next();
        }
    };
}

module.exports = preload;