const connect_TO_DB = require('../lib/connectDB.js');
const path = require('path');
const fs = require('fs/promises');

async function gettingSenderAndRecieverMessages(myId, userToChatId) {
    const connect = await connect_TO_DB();
    await connect.changeUser({ database: "chatapp" });

    const readMessageSenderAndRecieverIdSchema = await fs.readFile(path.join(__dirname, "../schemas/getSenderAndRecieverIdSchema.sql"), "utf8");

    const [rows] = await connect.query(readMessageSenderAndRecieverIdSchema, [myId, userToChatId, userToChatId, myId]);

    return rows;

}

module.exports = gettingSenderAndRecieverMessages;