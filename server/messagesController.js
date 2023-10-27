const Message = require('./messageModel');

exports.sendMessage = async (req, res) => {
  const { sender, recipient, content } = req.body;
  try {
    const newMessage = new Message({ sender, recipient, content });
    await newMessage.save();
    res.status(201).json(newMessage);
  } catch (error) {
    res.status(500).json({ error: 'Nie udało się wysłać wiadomości.' });
  }
};

exports.getMessages = async (req, res) => {
  try {
    const messages = await Message.find({ recipient: req.params.recipientId });
    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ error: 'Nie udało się pobrać wiadomości.' });
  }
};
