const connect_TO_DB = require("../lib/connectDB.js");

async function getUserExcept(loggedInUserId) {
    const connect = await connect_TO_DB();
    await connect.changeUser({ database: "chatapp" });

    const sql = `
        select user_id, fullName, email, profilePic, created_at
        from users
        where user_id != ?
    `;

   const [rows] = await connect.query(sql, [loggedInUserId]);

   return rows;

};

module.exports = getUserExcept;