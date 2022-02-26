const Ad = require('../models/Ad');


async function createAd(data) {
    const ad = new Ad(data);
    await ad.save();
    return ad;
}


async function getAllAds() {
    return Ad.find({}).lean();
}



async function getAdById(id) {
    return Ad.findOne({})
            .where('_id').equals(id)
            .lean();
}


async function getAdByIdAndPopulate(id) {
    return Ad.findOne({})
            .where('_id').equals(id)
            .populate('author', 'email description')
            .populate('usersApplied', 'email description')
            .lean();
}


// async function getMyTrips(userId) {
//     const trips = await Trip.find({}).where('creator').equals(userId)
//     .lean();
//     return trips;
// }



async function updateAdById(id, newAd) {
    const existing = await Ad.findById(id);

    existing.headline = newAd.headline;
    existing.location = newAd.location;
    existing.companyName = newAd.companyName;
    existing.companyDescription = newAd.companyDescription;
    
    await existing.save();
}


async function deleteAd(id) {
    console.log('servis')
    await Ad.findByIdAndDelete(id);
}


async function searchAds(search) {
    const data = await Ad.find({}).populate('author', 'email').lean();
    const results = [];
    for (let ad of data) {
        if (ad.author.email.toLowerCase() == search.toLowerCase()) {
            results.push(ad);
        }
    }
    return results;
}


async function applyForAJob(adId, userId) {
    const ad = await Ad.findById(adId);

    const hasApplied = ad.usersApplied.some(user => user._id == userId);
    const isAuthor = ad.author._id == userId;
    
    if (hasApplied || isAuthor) {
        throw new Error('Cannot apply for this job!');
    }

    ad.usersApplied.push(userId);
    
    await ad.save();
}



module.exports = {
    createAd,
    getAllAds,
    getAdById,
    getAdByIdAndPopulate,
    updateAdById,
    deleteAd,
    searchAds,
    applyForAJob
}