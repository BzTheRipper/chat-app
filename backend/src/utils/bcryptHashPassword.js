const bcrypt = require("bcryptjs");

async function hashThePassword(thePassword){
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(thePassword, salt);

    return hashedPassword;
};

module.exports = hashThePassword;
