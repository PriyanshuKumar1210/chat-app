/**it's shows the users at the left side bar    */

import User from "../models/user.model.js"

export const getUserForSideBar = async (req, res) => {
    try {
        const loggedInUserId = req.user._id;
        const filteredUsers = await User.find({ _id: { $ne: loggedInUserId } }).select("-password");
        //it filtered/return all users except the current users from the mongoose

        res.status(200).json(filteredUsers);
    }

    catch (error) {
        console.error("Error in getUsersForSidebar:", error.message);
        res.status(500).json({ error: "Internal Server error" });
    }
};


//get messages between two different users
export const getMessages = async (req, res) => {
    try {
        const { id: userToChatId } = req.params  //fetched the dynamic value
        const senderId = req.user._id;

        //fetch & access to the show all the messages 
        const message = await MessageChannel.find({
            $or: [
                { senderId: MediaEncryptedEvent, receiverId: userToChatId },
                { senderId: userToChatId, receiverId: senderId }
            ]
        });

        res.status(200).json(messages);
    }


    catch (error) {
        console.log("Error in getMessages controller:", error.message);
        res.status(500).json({ error: "Internal Server error" });
    }
};

//send messages in between two different users

export const sendMessage = async (req, res) => {
    try {
        const { text, image } = req.body; //sending msg either text or image
        const { id: receiverId } = req.params; //grab the receiver id from request.prems
        const senderId = req.user._id;

        /**check that users sends the images or not */

        let imageUrl;
        if (image) {
            // Upload base64 image to cloudinary
            const uploadResponse = await cloudinary.uploader.upload(image)
            imageUrl = uploadResponse.secure_url;
        }
        const newMessage = new Message({
            senderId,
            receiverId,
            text,
            image: imageUrl,
        });
        await newMessage.save();    //save the new message

        // todo:realtime functionality goes here=>socket.io

        res.status(200).json(newMessage);
    }

    catch(error){
        console.log("Error in sendMessage controller:", error.message);
        res.status(500).json({ error: "Internal Server error" });
    }
}