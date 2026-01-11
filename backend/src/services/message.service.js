const connect_TO_DB = require("../lib/connectDB.js");

let connect;

const createMessage = async ({ senderId, receiverId, text, image }) => {
    try {
        connect = await connect_TO_DB();
        await connect.changeUser({ database: "chatapp" });
        console.log("from message.service.js")

        const [result] = await connect.query(
            `INSERT INTO messages (senderId, receiverId, textMessages, image)
             VALUES (?, ?, ?, ?)`,
            [senderId, receiverId, text, image]
        );

        return {
            message_id: result.insertId,
            senderId,
            receiverId,
            text,
            image,
        };

    } catch (err) {
        console.log("Error in message.service.js, createMessage", err);
    }
};

module.exports = { createMessage };
