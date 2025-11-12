const { body, param, check, validationResult } = require("express-validator");
const Common = require("../Utils/Common");
const ApiResponse = require("../Helpers/ApiResponse");

const validateFields = (...fields) => {
    return async (req, res, next) => {

        const validationRules = fields.map((field) => body(field).notEmpty().withMessage(`Please provide ${field}`));

        try {
            await Promise.all(validationRules.map((rule) => rule.run(req)));

            const errors = validationResult(req);

            if (errors.isEmpty()) {
                next();
            } else {
                return ApiResponse.validationsResponse(res, errors.array());
            }

        } catch (error) {
            return await Common.handleServerError(res, error);
        }
    };
};


module.exports = {
    validateFields,
};
