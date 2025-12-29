const connect_TO_DB = require("../lib/connectDB.js");
const fs = require("fs/promises");
const path = require("path");

async function insertUser(fullName, email, password) {

    try {
        const connect = await connect_TO_DB();
        await connect.changeUser({ database: "chatapp" });

        const insertUserSql = await fs.readFile(path.join(__dirname, "../schemas/insertUserInfo.sql"), "utf8");

        const [result] = await connect.query(insertUserSql, [fullName, email, password]);

        return result.insertId;

    } catch (err) {
        console.log(err);
    }

};

module.exports = insertUser;