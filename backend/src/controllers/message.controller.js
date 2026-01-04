const getUserExceptMe = require("../services/getAllUsersIdWithoutMine");
const { findById } = require("../validators/ifExist");
const gettingSenderAndRecieverMessages = require('../services/getSenderRecieverIdMessages.js');
const { cloudinary } = require("../lib/cloudinary.js");

const getUsersForSideBar = async (req, res) => {
    try {
        const loggedInUserId_Mine = req.user.user_id;

        const filteredUsersExceptMe = await getUserExceptMe(loggedInUserId_Mine);

        res.status(200).json(filteredUsersExceptMe);

    } catch (err) {
        console.log("Error in getUsersForSideBar, message.controller.js", err);
        res.status(500).json({ errorMessage: "Internal Server Error in getUsersForSideBar, message.controller.js" });
    }
};

const getMessages = async (req, res) => {
    try {
        const { id: userToChatId } = req.params;
        const myId = req.user.user_id;

        const messages = await gettingSenderAndRecieverMessages(myId, userToChatId);

        res.status(200).json(messages)

    } catch (err) {
        console.log("Error in getMessages, message.controller.js", err);
        res.status(500).json({ errorMessage: "Internal Server Error in getMessages, message.controller.js" });
    }
};

const sendMessage = async (req, res) => {
    try{
        const {text, image} = req.body;
        const {id: receiverId} = req.params;
        const senderId = req.user.user_id;

        let imageUrl;
        if(image){
            const uploadResponse = await cloudinary.uploader.upload(image);
            imageUrl = uploadResponse.secure_url;
        }

        const newMessage = new Message({
            senderId,
            receiverId,
            text,
            image: imageUrl,
        });

        await newMessage.save();

        // todo: realtime functionality goes here => socket.io

        res.status(201).json(newMessage);

    }catch(err){
        console.log("Error in message.controller.js, sendMessage", err);
        res.status(500).json({ErrorMessage:"Internal Server Error inside message.controller.js, sendMessage"})
    }
}

module.exports = { getUsersForSideBar, getMessages, sendMessage };