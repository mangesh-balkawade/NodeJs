const nodemailer = require('nodemailer');

async function sendEmail(to) {
    // Create a transporter using SMTP
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'mangeshbalkawade07@gmail.com',
            pass: 'sidr vsia wcfr tldm'
        }
    });

    // Email options
    const mailOptions = {
        from: 'mangeshbalkawade07@gmail.com',
        to,
        subject: 'Hi Mangesh Redis Checking',
        text: 'Redis IS Working'
    };

    try {
        // Send email
        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent:', info.response);
    } catch (error) {
        console.error('Error:', error);
    }
}

module.exports = sendEmail;