const connect_TO_DB = require("../lib/connectDB");
const fs = require("fs/promises");
const path = require("path");

async function createChatAppSchema() {
    try {
        const connection = await connect_TO_DB();
        
        const readChatAppSchemaFile = await fs.readFile(path.join(__dirname, '../schemas/createSchemas.sql'), 'utf8');
        await connection.query(readChatAppSchemaFile);
        console.log("Chat-App Sechema Created Successfully or Existed");
    } catch (err) {
        console.log(err);
    }
};

module.exports = createChatAppSchema;
