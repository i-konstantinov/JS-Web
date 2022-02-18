const Trip = require('../models/Trip');


async function createTrip(data) {
    const trip = new Trip(data);
    await trip.save();
}


async function getAllTrips() {
    return await Trip.find({});
}


async function getMyTrips(userId) {
    return await Trip.find({}).where('creator').equals(userId);
}


async function getTripById(id) {
    return await Trip.findOne({})
            .where('_id').equals(id)
            .populate('creator', 'email gender')
            .populate('buddies', 'email');
}


async function updateTripById(id, trip) {
    const existing = await Trip.findById(id);

    existing.startPoint = trip.startPoint;
    existing.endPoint = trip.endPoint;
    existing.date = trip.date;
    existing.time = trip.time;
    existing.carImage = trip.carImage;
    existing.carBrand = trip.carBrand;
    existing.seats = trip.seats;
    existing.price = trip.price;
    existing.description = trip.description;
    
    await existing.save();
}


async function deleteTrip(id) {
    await Trip.findByIdAndDelete(id);
}


async function joinTrip(tripId, userId) {
    const trip = await Trip.findById(tripId);
    
    const hasJoined = trip.buddies.find(b => b._id == userId);
    if (hasJoined) {
        throw new Error('User already joined the trip');
    }
    if (trip.seats == 0) {
        throw new Error('No available seats for this trip');
    }

    trip.buddies.push(userId);
    trip.seats -= 1;

    await trip.save();
}


module.exports = {
    createTrip,
    getAllTrips,
    getMyTrips,
    getTripById,
    updateTripById,
    deleteTrip,
    joinTrip
}