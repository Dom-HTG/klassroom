const mongoose = require('mongoose');
const { number, string } = require('zod');

const GroupRoomSchema = mongoose.Schema({
    members: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        }
    ],
    creator: {
        type: string,
        required: true
    }, 
    participants: {
        type: number,
        default: 0
    }
}, { timestamps: true });


module.exports = GroupRoomModel;

const PrivateRoomSchema = mongoose.Schema({
    roomID: { // Room ID will be the concatenation of both members IDs.
        type: string,
        required: true
    },
    members: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        }
    ],
})


const GroupRoomModel = mongoose.model('groupRoom', GroupRoomSchema);
const PrivateRoomModel = mongoose.model('privateRoom', PrivateRoomSchema);