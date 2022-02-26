
const adService = require('../services/ad');


function preload(populate) {
    return async function (req, res, next) {
        const id = req.params.id;
        let ad;
        if (populate) {
            ad = await adService.getAdByIdAndPopulate(id);
        } else {
            ad = await adService.getAdById(id);
        }
        
        res.locals.ad = ad;
        
        next();
    };
}

module.exports = preload;