const mongoose = require('mongoose')

const Schema = mongoose.Schema

const waterContent = new Schema({
    Object: {
        type: String,
        unique: true,
        required: true,
    },
    WaterContent: {
        type: Number,
        required: true
    }
})

module.exports = mongoose.model('WaterContent', waterContent)