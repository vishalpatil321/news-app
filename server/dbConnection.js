const mongoose = require('mongoose');

const connectDb = async() => {
    try {
        await mongoose.connect(process.env.DATABASE_URL);
        console.log('Databse connected successfully.');
    } catch (error) {
        console.log(`Error is ${error} in database.`);
    };
};

module.exports = connectDb;