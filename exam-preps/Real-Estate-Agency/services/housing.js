const Housing = require('../models/Housing');


async function createHome(data) {
    const home = new Housing(data);
    await home.save();
}


async function getAllHomes() {
    return Housing.find({}).lean();
}



async function getHomeById(id) {
    return Housing.findOne({})
        .where('_id').equals(id)
        .lean();
}

async function getHomeByIdAndPopulate(id) {
    return Housing.findOne({})
        .where('_id').equals(id)
        .populate('rentedAHome', 'name')
        .lean();
}



async function updateHomeById(id, home) {
    const existing = await Housing.findById(id);

    existing.homeName = home.homeName;
    existing.type = home.type;
    existing.year = home.year;
    existing.city = home.city;
    existing.homeImage = home.homeImage;
    existing.description = home.description;
    existing.availablePieces = home.availablePieces;

    await existing.save();
}


async function deleteHome(id) {
    await Housing.findByIdAndDelete(id);
}


async function rentHome(homeId, userId) {
    const home = await Housing.findById(homeId);

    const hasRented = home.rentedAHome.some(t => t._id == userId);
    const isOwner = home.owner == userId;

    if (hasRented || isOwner) {
        throw new Error("Can't rent this home");
    }

    if (home.availablePieces == 0) {
        throw new Error('No available pieces');
    }

    home.rentedAHome.push(userId);
    home.availablePieces -= 1;
    await home.save();
}


async function searchHomes(query) {
    return Housing.find({}).where('type').equals(query).lean();
}



module.exports = {
    createHome,
    getAllHomes,
    getHomeById,
    getHomeByIdAndPopulate,
    updateHomeById,
    deleteHome,
    rentHome,
    searchHomes
}