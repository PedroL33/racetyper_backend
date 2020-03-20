const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const resultsSchema = new Schema({
    wpm: {type: Number, required: true},
    accuracy: {type: Number, required: true},
    user_id: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    played_at: {type: Number}
})

module.exports = mongoose.model('Result', resultsSchema)
