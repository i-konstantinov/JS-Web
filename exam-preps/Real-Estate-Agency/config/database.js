const mongoose = require('mongoose');

const dbName = 'RealEstateAgency';

const connectionString = `mongodb://localhost:27017/${dbName}`;

module.exports = async (app) => {
    try {
        await mongoose.connect(connectionString, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            autoIndex: false
        });
        console.log('DB connected');

        mongoose.connection.on('error', (err) => {
            console.error('Database error');
            console.error(err);
        })
    } catch (err) {
        console.error('Error connecting database');
        process.exit(1);
    }
};