import Message from "../models/message.model.js";
import User from "../models/user.model.js";

export const getChatUsersController = async (req, res) => {
  const userID = req.user._id;
  console.log("UserID", userID);

  try {
    const filteredUsers = await User.find({ _id: { $ne: userID } }).select(
      "-password"
    );
    res.status(200).json(filteredUsers);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getUserMessagesController = async (req, res) => {
  const myID = req.user._id;
  const { id: receiverId } = req.params;
  try {
    const messages = await Message.find({
      $or: [
        {
          senderId: myID,
          receiverId: receiverId,
        },
        {
          senderId: receiverId,
          receiverId: myID,
        },
      ],
    });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const postMessageController = async (req, res) => {
  const { _id } = req.user;
  const { id: recieverId } = req.params;
  const { text, image } = req.body;
  try {
    let imageUrl;
    if (image) {
      const cloudinaryResponse = await cloudinary.uploader.upload(profilePic);
      imageUrl = cloudinaryResponse.secure_url;
    }

    await Message.create({
      senderId: _id,
      receiverId: recieverId,
      text: text,
      image: imageUrl,
    });
    // return res.status(200)
    // realtime functionality happens with help of socket io.
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};
