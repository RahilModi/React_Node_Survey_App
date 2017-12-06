const mongoose = require('mongoose');
const {Schema} = mongoose;
const recipientSchema = require('./recipient');

const surveySchema = new Schema({
    title: String,
    body: Sting,
    subject: String,
    recipients: [recipientSchema],
    yes: {type: Number, default: 0},
    no: {type: Number, default: 0},
    _user: {type: Schema.Types.ObjectId, red: 'User'},
    dateSent: Date,
    lastResponded: Date
});


mongoose.model('surveys',surveySchema);