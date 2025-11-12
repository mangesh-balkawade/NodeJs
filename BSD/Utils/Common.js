const moment = require("moment");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
const Messages = require("../Helpers/Messages");
const LogServices = require("../Services/LogServices");
const ApiResponse = require("../Helpers/ApiResponse");

// Get current date/time
const getDateTime = async (type, datetime = "") => {
    try {
        if (datetime) {
            var specificDate = moment(datetime);
        } else {
            var specificDate = moment();
        }
        var formateddate = specificDate;
        switch (type) {
            case "db":
                formateddate = specificDate.format("YYYY-MM-DD HH:mm:ss");
                break;
            case "show":
                formateddate = specificDate.format("YYYY-MM-DD hh:mm:ss A");
                break;
            case "dbdate":
                formateddate = specificDate.format("YYYY-MM-DD");
                break;
            default:
                formateddate = specificDate.format("YYYY-MM-DD HH:mm:ss");
                break;
        }
        return formateddate;
    }
    catch (error) {
        await LogServices.saveLog(error);
        throw new Error("Unable To Get Formated Date");
    }
};

// Generate JWT token
//expiresIn = "30 days"
const generateToken = async (payload, expiresIn = "1d") => {
    try {
        const token = jwt.sign(
            payload,
            process.env.JWT_SECRET,
            {
                expiresIn,
            }
        );
        console.log(payload);
        return token;
    } catch (error) {
        await LogServices.saveLog(error);
        throw new Error(Messages.UnableToCreateJWTToken);
    }
};

// Verify JWT token
const verifyToken = async (token) => {
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        return decoded;
    } catch (error) {
        await LogServices.saveLog(error);
        throw new Error("Unable To Verify Token");
    }
};

// Send email
const sendEmail = async (email, subject, message) => {
    try {
        const transporter = nodemailer.createTransport({
            // Specify your email service provider configuration
            // For example, for Gmail:
            service: "gmail",
            auth: {
                user: "your-email@gmail.com",
                pass: "your-password",
            },
        });

        const mailOptions = {
            from: "your-email@gmail.com",
            to: email,
            subject,
            text: message,
        };

        await transporter.sendMail(mailOptions);
        console.log("Email sent successfully.");
    } catch (error) {
        await LogServices.saveLog(error);
        throw new Error("Unable To Send An Email");
    }
};

// Encrypt password
const encryptPassword = async (password) => {
    try {
        const salt = await bcrypt.genSalt(10);
        const encryptedPassword = await bcrypt.hash(password, salt);
        return encryptedPassword;
    } catch (error) {
        await LogServices.saveLog(error);
        throw new Error("Unable To Encrypt Password");
    }
};

// Compare password with encrypted password
const comparePasswords = async (password, encryptedPassword) => {
    try {
        const isMatch = await bcrypt.compare(password, encryptedPassword);
        return isMatch;
    } catch (error) {
        await LogServices.saveLog(error);
        throw new Error("Unable To Copmare Password");
    }
};

// Random Number Generator
function generateRandomNumber(digits) {
    const min = 10 ** (digits - 1);
    const max = 10 ** digits - 1;
    return Math.floor(min + Math.random() * (max - min + 1));
}

const handleServerError = async (res, error) => {
    await LogServices.saveLog(error);
    if (error?.parent?.errno == '1452') {
        return ApiResponse.foreignKeyConstraintError(res);
    }
    else {
        return ApiResponse.serverIssueResponse(res, error);
    }
}

function generateUniqueNo() {
    const currentDate = new Date();

    const year = String(currentDate.getFullYear()).slice(-2);
    const month = String(currentDate.getMonth() + 1);
    const day = String(currentDate.getDate());

    const timestamp = Date.now();
    const lastFourDigits = String(timestamp).slice(-4);

    return `${year}${month}${day}-${lastFourDigits}${generateRandomNumber(3)}`;
}

module.exports = {
    getDateTime,
    generateRandomNumber,
    generateToken,
    handleServerError,
    comparePasswords,
    encryptPassword,
    verifyToken,
    sendEmail,
    generateUniqueNo
}