const connect_TO_DB = require("../lib/connectDB.js");
const fs = require("fs/promises");
const path = require("path");

async function userSchema(){
    try{

        const connect = await connect_TO_DB();
        await connect.changeUser({database: "chatapp"});
        console.log("Changed Database to chatapp");
        const readUserSchemaFile = await fs.readFile(path.join(__dirname, "../schemas/userTable.sql"), "utf8");

        // Creating user schema after reading the user table schema file
        await connect.query(readUserSchemaFile);
        console.log("Created User Table Successfully or Existed");

    }catch(err){
        console.log(err);
    }
};

module.exports = userSchema;