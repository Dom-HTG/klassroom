const mongoose = require('mongoose');

const NotifSchema = mongoose.Schema({
    title: {
        type: string,
        required: true
    },
    description: {
        type: string,
        required: true
    },
    groupID: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Group',
            required: true
        }
    ], 
    status: { // PENDING || SUCCESS || FAILED
        type: string,
        required: true
    },
    type: { // Means of transmitting the notification (email || phone)
        type: string,
        required: true
    }
});

const NotifModel = mongoose.model('Notification', NotifSchema);

module.exports = NotifModel;