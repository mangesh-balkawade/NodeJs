const express = require("express");
const messages = require("../models/messges");
const {Op}=require("sequelize")

app = express();
app.post("/messages", async (req, res) => {
  const { senderId, receiverId, messageContent } = req.body;
  console.log(req.body);

  try {
    // Check if conversation already exists
    let conversation = await messages.Conversation.findOne({
      where: {
        [Op.or]: [
          { participant1_id: senderId, participant2_id: receiverId },
          { participant1_id: receiverId, participant2_id: senderId },
        ],
      },
    });

    let conversationId;
    if (conversation) {
      // Conversation already exists
      conversationId = conversation.id;
    } else {
      // Create a new conversation
      conversation = await messages.Conversation.create({
        participant1_id: senderId,
        participant2_id: receiverId,
      });
      conversationId = conversation.id;
    }

    // Insert the new message
    const createdMessage = await messages.Message.create({
      conversation_id: conversationId,
      sender_id: senderId,
      content: messageContent,
    });

    console.log("Message sent successfully!");
    res.status(200).json({ message: "Message sent successfully!" });
  } catch (error) {
    console.error("Error sending message:", error);
    res.status(500).json({ error: "Error sending message" });
  }
});

// Route to retrieve conversation history
app.get("/conversation/:participant1Id/:participant2Id", async (req, res) => {
  const { participant1Id, participant2Id } = req.params;

  try {
    const conversation = await messages.Conversation.findOne({
      where: {
        [Op.or]: [
          { participant1_id: participant1Id, participant2_id: participant2Id },
          { participant1_id: participant2Id, participant2_id: participant1Id },
        ],
      },
    });

    if (!conversation) {
      // Conversation not found
      res.status(404).json({ error: "Conversation not found" });
      return;
    }

    const message = await messages.Message.findAll({
      where: {
        conversation_id: conversation.id,
      },
      order: [["timestamp", "ASC"]],
    });

    res.status(200).json(message);
  } catch (error) {
    console.error("Error retrieving conversation history:", error);
    res.status(500).json({ error: "Error retrieving conversation history" });
  }
});

module.exports = app;
