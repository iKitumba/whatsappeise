import Message from "../models/Message.js";

export const newMessage = async (req, res) => {
  const { receiver_id } = req.params;

  const { user_id } = req;
  const newMessage = new Message({
    sender_id: user_id,
    receiver_id,
    text: req.body.text,
  });

  try {
    const savedMessage = await newMessage.save();
    const senderUser = req.connectedUsers[user_id];
    const receiverUser = req.connectedUsers[receiver_id];
    if (senderUser || receiverUser) {
      req.io.to(receiverUser).emit("message", savedMessage);
    }

    return res.json(savedMessage);
  } catch (error) {
    return res.status(500).json({ message: "Error creating message", error });
  }
};

export const getMessages = async (req, res) => {
  const { receiver_id } = req.params;
  const { user_id } = req;
  try {
    const messages = await Message.find({
      $or: [
        {
          $and: [{ sender_id: user_id }, { receiver_id: receiver_id }],
        },
        {
          $and: [{ sender_id: receiver_id }, { receiver_id: user_id }],
        },
      ],
    });

    return res.json(messages);
  } catch (error) {
    return res.status(500).json({ message: "Error getting messages", error });
  }
};
