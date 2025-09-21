import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
const uploadOnCloudinary = async (filePath) => {
    // Function to upload file to Cloudinary
    cloudinary.config({
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET,
    });
    try {
        const uploadResult = await cloudinary.uploader.upload(filePath);
        fs.unlinkSync(filePath); // Remove file from server after upload
        return uploadResult.secure_url;
    } catch (error) {
        fs.unlinkSync(filePath); // Remove file from server if upload fails
        return { status: 500, message: "Cloudinary upload failed" };
    }
}

export default uploadOnCloudinary;