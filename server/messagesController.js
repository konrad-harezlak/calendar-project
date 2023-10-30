const Message = require('./messageModel');

sendMessage = async (req, res) => {
  const { recipient, content } = req.body;
  const sender=req.user.userId;
  console.log("costam "+sender+" - "+recipient+" - "+content);

  const newMessage = new Message({ sender, recipient, content });
  console.log(newMessage);
  try {
    await newMessage.save();
    res.status(201).json(newMessage);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Nie udało się wysłać wiadomości.' });
  }
};

getMessages = async (req, res) => {
  try {
    const messages = await Message.find({ recipient: req.params.recipientId });
    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ error: 'Nie udało się pobrać wiadomości.' });
  }
};

module.exports={
  sendMessage,
  getMessages
}