function mapErrors(err) {
    if (Array.isArray(err)) {
        return err;
    } else if (err.name == 'ValidationError') {
        return Object.values(err.errors).map(e => ({ msg: e.message }));
    } else if (typeof err.message == 'string') {
        return [{ msg: err.message }];
    } else {
        return [{ msg: 'Request error' }];
    }
}


function tripViewModel(trip) {
    const model = {
        id: trip._id.toString(),
        startPoint: trip.startPoint,
        endPoint: trip.endPoint,
        date: trip.date,
        time: trip.time,
        carImage: trip.carImage,
        carBrand: trip.carBrand,
        seats: trip.seats,
        price: trip.price,
        description: trip.description,
        creator: trip.creator,
        buddies: trip.buddies
    };

    if (model.seats == 0) {
        model.seats = null;
    }

    if (model.buddies.length > 0 && model.buddies[0].email) {
        const cleanData = []
        model.buddies.forEach(b => cleanData.push({
            id: b._id,
            email: b.email
        }));
        model.buddies = cleanData;
    }

    if (model.creator.email) {
        const cleanData = {
            id: model.creator._id.toString(),
            email: model.creator.email,
            gender: model.creator.gender
        }
        model.creator = cleanData;
    } else {
        model.creator = model.creator.toString();
    }

    return model;
}

module.exports = {
    mapErrors,
    tripViewModel
}