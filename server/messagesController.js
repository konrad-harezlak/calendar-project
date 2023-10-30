const Message = require('./messageModel');

sendMessage = async (req, res) => {
  const { recipient, content } = req.body;
  const sender = req.user.userId;
  const newMessage = new Message({ sender, recipient, content });
  try {
    await newMessage.save();
    res.status(201).json(newMessage);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Nie udało się wysłać wiadomości.' });
  }
};

getMessages = async (req, res) => {
  const recipientId = req.params.recipientId;
  const senderId = req.user.userId;
  try {
    const messages = await Message.find({  
      $or: [
        { sender: senderId, recipient: recipientId },
        { sender: recipientId, recipient: senderId }
      ]});
    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ error: 'Nie udało się pobrać wiadomości.' });
  }
};

module.exports = {
  sendMessage,
  getMessages
}