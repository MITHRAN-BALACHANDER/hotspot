let users = [];

const addUsers = (id, name, room) => {
    try {
        if (!name || !room) {
            return { error: 'Name and room are required!' };
        }

        name = name.trim().toLowerCase();
        room = room.trim().toLowerCase();
        const existingUser = users.find(each => each.name === name && each.room === room);
        if (existingUser) {
            return { error: 'User already exists in the room!' };
        }
        const user = { id, name, room};
        users.push(user);
        console.log('User added:', user);

        return { user };
    } catch (error) {
        console.error('Error in addUsers:', error);
        return { error: 'Internal server error' };
    }
};

const removeUser = (id) => {
    const findIdx = users.findIndex(each => each.id === id);

    if (findIdx >= 0) {
        return users.splice(findIdx, 1)[0];
    }

    return null;
};

const getUser = (id) => {
    return users.find(each => each.id === id);
};

module.exports = {
    addUsers,
    removeUser,
    getUser
};