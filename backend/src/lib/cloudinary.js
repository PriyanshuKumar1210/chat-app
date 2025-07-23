/**cloudinary is just a bucket which is used to store the profile pic temporary */

import {v2 as cloudinary} from "cloudinary"
import {config} from 'dotenv'


config() //acess .env variables

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_API_SECRET
});

export default cloudinary;