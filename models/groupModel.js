const mongoose = require('mongoose');

const groupSchema = mongoose.Schema({
    users: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        }
    ],
    creator: {
        type: string,
        required: true
    }
}, { timestamps: true });

const GroupModel = mongoose.Schema('Group', groupSchema);

module.exports = GroupModel;