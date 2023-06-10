const mongoose = require("mongoose");
require("dotenv").config();

const dbConnection = mongoose.connect(process.env.MONGODB_URL);

module.exports = {
    dbConnection
}
