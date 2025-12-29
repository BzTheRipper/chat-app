const getUserExcept = require("../services/getAllUsersIdWithoutMine");
const { findById } = require("../validators/ifExist");

const getUsersForSideBar = async (req, res) => {
    try {
        const loggedInUserId = req.user.user_id;

        const filteredUsers = await getUserExcept(loggedInUserId);

        res.status(200).json(filteredUsers);

    } catch (err) {
        console.log("Error in getUsersForSideBar, message.controller.js", err);
        res.status(500).json({ errorMessage: "Internal Server Error in getUsersForSideBar, message.controller.js" });
    }
};

const getMessages = async (req, res) => {
    try {
        const { id: userToChatId } = req.params;
        const myId = req.user.user_id;

        //const messages = 

    } catch (err) {
        console.log("Error in getMessages, message.controller.js", err);
        res.status(500).json({ errorMessage: "Internal Server Error in getMessages, message.controller.js" });
    }
};

module.exports = { getUsersForSideBar, getMessages };