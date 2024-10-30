const { ApiError } = require('../errors/apierror');

class RoomMananger {
    constructor(private, group) {
        // In-Memory storage for rooms.
        this.private = {};
        this.group = {};
    }

    // Method to add a private room.
    async createRoom(roomID, type) {
        // check for room type (private/group).
        if (type === 'private') {

        }else if (type === 'group') {

        } else {
            throw new ApiError('Invalid room type', 400);
        }
    }
}