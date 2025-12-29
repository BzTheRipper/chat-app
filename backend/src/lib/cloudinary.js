const {v2: cloudinary} = require("cloudinary");

const {config} = require("dotenv");

config();

cloudinary.config({
    cloud_name: process.env.CLAUDINARY_CLOUD_NAME,
    api_key: process.env.CLAUDINARY_API_KEY,
    api_secret: process.env.CLAUDINARY_API_SECRET
});

module.exports = cloudinary;