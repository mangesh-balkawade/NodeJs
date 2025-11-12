const ApiResponse = require("../Helpers/ApiResponse");
const jwt = require("jsonwebtoken");
const Common = require("../Utils/Common");
const Messages = require("../Helpers/Messages");

const jwtTokenMiddleware = async (req, res, next) => {
    try {

        if (!req.headers.authorization) {
            return ApiResponse.unAuthorizedResponse(res, Messages.JWTTokenRequired);
        }

        let token = req.headers.authorization.split(" ")[1];

        if (token === "null") {
            return ApiResponse.unAuthorizedResponse(res, Messages.JWTTokenRequired);
        }

        let payload = jwt.verify(token, process.env.JWT_SECRET);

        if (!payload) {
            return ApiResponse.unAuthorizedResponse(res, Messages.InvalidJWTToken);
        }

        let keys = Object.keys(payload);
        // console.log(payload);

        req.login = {};

        for (let key of keys) {
            req.login[key] = payload[key];
        }

        console.log(req.login);

        next();
    } catch (error) {
        return await Common.handleServerError(res, error);
    }
};

module.exports = jwtTokenMiddleware;