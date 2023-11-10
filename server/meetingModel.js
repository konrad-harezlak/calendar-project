const mongoose = require('mongoose');

const meetingSchema = new mongoose.Schema({
    title: { type: String, required: true },
    date: { type: Date, required: true },
    time: { type: String, required: true },
    endTime: { type: String, required: true },
    participants: { type: [String], required: true },
});

const Meeting = mongoose.model('Meeting', meetingSchema);

module.exports = Meeting;
