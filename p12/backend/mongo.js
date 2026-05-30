const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/log_db');

const Log = mongoose.model('Log', {
    timestamp: Date,
    level: String,
    message: String
});
module.exports = Log;
