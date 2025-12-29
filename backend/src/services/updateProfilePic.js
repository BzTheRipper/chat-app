const connect_TO_DB = require("../lib/connectDB.js");

async function updateProfilePic(userId, profilePicUrl) {
    const connect = await connect_TO_DB();
    await connect.changeUser({ database: "chatapp" });

    const sql = `
        UPDATE users 
        SET profilePic = ?
        WHERE user_id = ?
    `;

    const [result] = await connect.query(sql, [profilePicUrl, userId]);

    return result.affectedRows > 0;
}

module.exports = updateProfilePic;