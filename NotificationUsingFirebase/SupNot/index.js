const dotenv = require('dotenv');
const { initializeApp, applicationDefault } = require('firebase-admin/app');
const { getMessaging } = require('firebase-admin/messaging');
const cors = require('cors')
const express = require("express");

// Load environment variables from .env file
dotenv.config();

// Set GOOGLE_APPLICATION_CREDENTIALS if using a service account key file
// process.env.GOOGLE_APPLICATION_CREDENTIALS = '/path/to/your/serviceAccountKey.json';

const app = express();
app.use(express.json());
app.use(cors({ origin: "*" }));

let data = {
    name: "mangesh",
    id: 20
}

let data1 = JSON.stringify(data);
console.log(data1);

app.post("/send", async (req, res) => {
    try {
        const receivedToken = req.body.fcmToken;

        const message = {
            notification: {
                title: "FCM Notification",
                body: 'This is a Test Notification',
            },
            data: {
                data1
            },
            token: receivedToken,
        };

        const response = await getMessaging().send(message);
        console.log("Successfully sent message:", response);

        return res.status(200).json({
            message: "Successfully sent message",
            token: receivedToken,
        });
    } catch (error) {
        res.status(500).send(error);
        console.log("Error sending message:", error);
    }
});

initializeApp({
    credential: applicationDefault(),
    projectId: process.env.FIREBASE_PROJECT_ID,
});

app.listen(3000, function () {
    console.log("Server started on port 3000");
});
