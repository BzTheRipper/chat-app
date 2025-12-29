const connect_TO_DB = require("../lib/connectDB.js");
const fs = require("fs/promises");
const path = require("path");

async function messageSchema() {
    try{

        const connect = await connect_TO_DB();
        await connect.changeUser({database: "chatapp"});
        console.log("Changed Database to chatapp");

        const readMessageSchemaFile = await fs.readFile(path.join(__dirname, "../schemas/messageSchema.sql"), "utf8");

        // Creating message schema after reading the messageSchema file
        await connect.query(readMessageSchemaFile);
        console.log("Created Message Schema Successfully or Existed");

    }catch(err){
        console.log("Error int messageSchema", err);
        
    }
}

module.exports = messageSchema;