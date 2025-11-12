const { body, param, check, validationResult } = require("express-validator");

const validations = (req, res, next) => {
    const validationRules = [
        body("")
            .notEmpty()
            .withMessage("Please Provide ----"),
        body("")
            .notEmpty()
            .withMessage("Please Provide The ---"),
        body("")
            .notEmpty()
            .withMessage("Please Provide Pr Group Category")
            .matches(/^(Goods|Service|Project|Others)$/)
            .withMessage("Purchase Group Category must be 'Goods', 'Service', or 'Project'")

    ];

    Promise.all(validationRules.map((rule) => rule.run(req))).then(() => {
        const errors = validationResult(req);
        if (errors.isEmpty()) {
            next();
        } else {
            res.status(422).json(base_response(422, { errors: errors.array() }, "Invalid Data"));
        }
    });
};

module.exports = {
    validations
}