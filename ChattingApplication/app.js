const express = require("express");
const { Sequelize, DataTypes, Op } = require("sequelize");
const http = require("http");
const socketIO = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

// Create a Sequelize instance
const sequelize = new Sequelize(
  "your_database",
  "your_username",
  "your_password",
  {
    host: "your_host",
    dialect: "mysql",
  }
);

// Define the Conversation and Message models
const Conversation = sequelize.define("Conversation", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  participant1_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  participant1_type: {
    type: DataTypes.ENUM("employee", "customer"),
    allowNull: false,
  },
  participant2_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  participant2_type: {
    type: DataTypes.ENUM("employee", "customer"),
    allowNull: false,
  },
});

const Message = sequelize.define("Message", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  conversation_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  sender_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  sender_type: {
    type: DataTypes.ENUM("employee", "customer"),
    allowNull: false,
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  timestamp: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
});

// Establish associations between Conversation and Message models
Conversation.hasMany(Message, { foreignKey: "conversation_id" });
Message.belongsTo(Conversation, { foreignKey: "conversation_id" });

app.use(express.json());

// Socket.IO integration
io.on("connection", (socket) => {
  console.log("A user connected");

  // Handle new messages
  socket.on(
    "newMessage",
    async ({
      senderId,
      senderType,
      receiverId,
      receiverType,
      messageContent,
    }) => {
      try {
        // Check if conversation already exists
        let conversation = await Conversation.findOne({
          where: {
            [Op.or]: [
              {
                participant1_id: senderId,
                participant1_type: senderType,
                participant2_id: receiverId,
                participant2_type: receiverType,
              },
              {
                participant1_id: receiverId,
                participant1_type: receiverType,
                participant2_id: senderId,
                participant2_type: senderType,
              },
            ],
          },
        });

        let conversationId;
        if (conversation) {
          // Conversation already exists
          conversationId = conversation.id;
        } else {
          // Create a new conversation
          conversation = await Conversation.create({
            participant1_id: senderId,
            participant1_type: senderType,
            participant2_id: receiverId,
            participant2_type: receiverType,
          });
          conversationId = conversation.id;
        }

        // Insert the new message
        const createdMessage = await Message.create({
          conversation_id: conversationId,
          sender_id: senderId,
          sender_type: senderType,
          content: messageContent,
        });

        console.log("Message sent successfully!");
        io.emit("messageReceived", createdMessage); // Emit an event to all connected clients
      } catch (error) {
        console.error("Error sending message:", error);
      }
    }
  );

  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });
});

// Sync the Sequelize models with the database and start the server
sequelize.sync().then(() => {
  server.listen(3000, () => {
    console.log("Server started on port 3000");
  });
});

// const express = require("express");
// const { Sequelize, DataTypes, Op } = require("sequelize");
// const http = require("http");
// const socketIO = require("socket.io");

// const app = express();
// const server = http.createServer(app);
// const io = socketIO(server);

// // Create a Sequelize instance
// const sequelize = new Sequelize("chat", "root", "root", {
//   host: "localhost",
//   dialect: "mysql",
// });

// // Socket.IO integration
// io.on("connection", (socket) => {
//   console.log("A user connected");

//   // Handle new messages
//   socket.on(
//     "newMessage",
//     async ({
//       senderId,
//       senderType,
//       receiverId,
//       receiverType,
//       messageContent,
//     }) => {
//       try {
//         // Check if conversation already exists
//         let conversation = await Conversation.findOne({
//           where: {
//             [Op.or]: [
//               {
//                 participant1_id: senderId,
//                 participant1_type: senderType,
//                 participant2_id: receiverId,
//                 participant2_type: receiverType,
//               },
//               {
//                 participant1_id: receiverId,
//                 participant1_type: receiverType,
//                 participant2_id: senderId,
//                 participant2_type: senderType,
//               },
//             ],
//           },
//         });

//         let conversationId;
//         if (conversation) {
//           // Conversation already exists
//           conversationId = conversation.id;
//         } else {
//           // Create a new conversation
//           conversation = await Conversation.create({
//             participant1_id: senderId,
//             participant1_type: senderType,
//             participant2_id: receiverId,
//             participant2_type: receiverType,
//           });
//           conversationId = conversation.id;
//         }

//         // Insert the new message
//         const createdMessage = await Message.create({
//           conversation_id: conversationId,
//           sender_id: senderId,
//           sender_type: senderType,
//           content: messageContent,
//         });

//         console.log("Message sent successfully!");
//         io.emit("messageReceived", createdMessage); // Emit an event to all connected clients
//       } catch (error) {
//         console.error("Error sending message:", error);
//       }
//     }
//   );

//   socket.on("disconnect", () => {
//     console.log("A user disconnected");
//   });
// });

// // Define the Conversation and Message models
// const Conversation = sequelize.define("Conversation", {
//   id: {
//     type: DataTypes.INTEGER,
//     primaryKey: true,
//     autoIncrement: true,
//   },
//   participant1_id: {
//     type: DataTypes.INTEGER,
//     allowNull: false,
//   },
//   participant1_type: {
//     type: DataTypes.ENUM("employee", "customer"),
//     allowNull: false,
//   },
//   participant2_id: {
//     type: DataTypes.INTEGER,
//     allowNull: false,
//   },
//   participant2_type: {
//     type: DataTypes.ENUM("employee", "customer"),
//     allowNull: false,
//   },
// });

// const Message = sequelize.define("Message", {
//   id: {
//     type: DataTypes.INTEGER,
//     primaryKey: true,
//     autoIncrement: true,
//   },
//   conversation_id: {
//     type: DataTypes.INTEGER,
//     allowNull: false,
//   },
//   sender_id: {
//     type: DataTypes.INTEGER,
//     allowNull: false,
//   },
//   sender_type: {
//     type: DataTypes.ENUM("employee", "customer"),
//     allowNull: false,
//   },
//   content: {
//     type: DataTypes.TEXT,
//     allowNull: false,
//   },
//   timestamp: {
//     type: DataTypes.DATE,
//     defaultValue: DataTypes.NOW,
//   },
// });

// // Establish associations between Conversation and Message models
// Conversation.hasMany(Message, { foreignKey: "conversation_id" });
// Message.belongsTo(Conversation, { foreignKey: "conversation_id" });

// app.use(express.json());

// // Route to send a message
// app.post("/messages", async (req, res) => {
//   const { senderId, senderType, receiverId, receiverType, messageContent } =
//     req.body;

//   try {
//     // Check if conversation already exists
//     let conversation = await Conversation.findOne({
//       where: {
//         [Op.or]: [
//           {
//             participant1_id: senderId,
//             participant1_type: senderType,
//             participant2_id: receiverId,
//             participant2_type: receiverType,
//           },
//           {
//             participant1_id: receiverId,
//             participant1_type: receiverType,
//             participant2_id: senderId,
//             participant2_type: senderType,
//           },
//         ],
//       },
//     });

//     let conversationId;
//     if (conversation) {
//       // Conversation already exists

//       conversationId = conversation.id;
//     } else {
//       // Create a new conversation
//       conversation = await Conversation.create({
//         participant1_id: senderId,
//         participant1_type: senderType,
//         participant2_id: receiverId,
//         participant2_type: receiverType,
//       });
//       conversationId = conversation.id;
//     }

//     // Insert the new message
//     const createdMessage = await Message.create({
//       conversation_id: conversationId,
//       sender_id: senderId,
//       sender_type: senderType,
//       content: messageContent,
//     });

//     console.log("Message sent successfully!");
//     res.status(200).json({ message: "Message sent successfully!" });
//   } catch (error) {
//     console.error("Error sending message:", error);
//     res.status(500).json({ error: "Error sending message" });
//   }
// });

// // Route to retrieve conversation history
// app.get(
//   "/conversation/:participant1Id/:participant1Type/:participant2Id/:participant2Type",
//   async (req, res) => {
//     const {
//       participant1Id,
//       participant1Type,
//       participant2Id,
//       participant2Type,
//     } = req.params;

//     try {
//       const conversation = await Conversation.findOne({
//         where: {
//           [Op.or]: [
//             {
//               participant1_id: participant1Id,
//               participant1_type: participant1Type,
//               participant2_id: participant2Id,
//               participant2_type: participant2Type,
//             },
//             {
//               participant1_id: participant2Id,
//               participant1_type: participant2Type,
//               participant2_id: participant1Id,
//               participant2_type: participant1Type,
//             },
//           ],
//         },
//       });

//       if (!conversation) {
//         // Conversation not found
//         res.status(404).json({ error: "Conversation not found" });
//         return;
//       }

//       const messages = await Message.findAll({
//         where: {
//           conversation_id: conversation.id,
//         },
//         order: [["timestamp", "ASC"]],
//       });

//       res.status(200).json(messages);
//     } catch (error) {
//       console.error("Error retrieving conversation history:", error);
//       res.status(500).json({ error: "Error retrieving conversation history" });
//     }
//   }
// );

// // Sync the Sequelize models with the database and start the server
// sequelize.sync().then(() => {
//   app.listen(3000, () => {
//     console.log("Server started on port 3000");
//   });
// });
