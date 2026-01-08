const connect_TO_DB = require("../lib/connectDB.js");
const fs = require("fs/promises");
const path = require("path");

let connect;

async function findByEmail(email) {
    try {

        connect = await connect_TO_DB();
        await connect.changeUser({ database: "chatapp" });
        // optional.....may create problem in deployment
        const readCheckEmailExists = await fs.readFile(path.join(__dirname, "../schemas/checkEmailExists.sql"), "utf8");
        // optional.....may create problem in deployment
        const [rows] = await connect.query("SELECT * FROM users WHERE email = ? LIMIT 1", [email]);
        const rowLength = rows.length > 0;
        return rows[0];

    } catch (err) {
        console.log(err);
    }
};

async function findById(user_id) {
    try {

        connect = await connect_TO_DB();
        await connect.changeUser({ database: "chatapp" });
        const [rows] = await connect.query("SELECT * FROM users WHERE user_id = ? LIMIT 1", [user_id]);
        const rowLength = rows.length > 0;
        return rows[0];

    } catch (err) {
        console.log(err);
    }
};



module.exports = {findByEmail, findById};