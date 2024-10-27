const bcrypt = require('bcryptjs');

const matchPassword = async (password, hashPassword) => {
    const isMatch = await bcrypt.compare(password, hashPassword);
    return isMatch; // isMatch is  boolean value.
};

module.exports = matchPassword;