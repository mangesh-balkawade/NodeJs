const { StatusCodes } = require("http-status-codes");
const Messages = require("./Messages");

function baseResponse(
    res,
    success,
    data,
    message = null,
    error = null,
    statuscode = StatusCodes.OK
) {
    const response = {
        success,
        data,
    };

    if (message) {
        response.message = message;
    }
    if (error) {
        response.error = error;
    }
    res.status(statuscode).json(response);
}

function saveResponse(res, savedData, message = Messages.DataSaved) {
    baseResponse(
        res,
        true,
        savedData,
        {
            message,
            statuscode: StatusCodes.CREATED,
        },
        null,
        StatusCodes.CREATED
    );
}

function updateResponse(res, updateEntityData, message = Messages.DataUpdated) {
    baseResponse(
        res,
        true,
        updateEntityData,
        {
            message,
            statuscode: StatusCodes.OK,
        },
        null,
        StatusCodes.OK
    );
}

function deleteResponse(res, message = Messages.DataDeleted) {
    baseResponse(
        res,
        true,
        {},
        {
            message,
            statuscode: StatusCodes.OK,
        },
        null,
        StatusCodes.OK
    );
}

function serverIssueResponse(res, error) {
    baseResponse(
        res,
        false,
        {},
        {
            message: Messages.InternalServerError,
            statuscode: StatusCodes.INTERNAL_SERVER_ERROR,
        },
        error !== undefined ? error.message : null,
        StatusCodes.INTERNAL_SERVER_ERROR
    );
}

function dataNotAvailable(res, message = Messages.DataNotAvailable) {
    baseResponse(
        res,
        false,
        {},
        {
            message,
            statuscode: StatusCodes.BAD_REQUEST,
        },
        null,
        StatusCodes.BAD_REQUEST
    );
}

function sendDataResponse(res, data, message = Messages.DataFetched) {
    baseResponse(
        res,
        true,
        data,
        {
            message,
            statuscode: StatusCodes.OK,
        },
        null,
        StatusCodes.OK
    );
}

function invalidCredentialResponse(res) {
    baseResponse(
        res,
        false,
        {},
        {
            message: Messages.InvalidCredentials,
            statuscode: StatusCodes.BAD_REQUEST,
        },
        null,
        StatusCodes.BAD_REQUEST
    );
}

function dataAlreadyExists(res, message = Messages.DataExists) {
    baseResponse(
        res,
        false,
        {},
        { message, statuscode: StatusCodes.CONFLICT },
        null,
        StatusCodes.CONFLICT
    );
}

function unAuthorizedResponse(res, message = Messages.Forbidden) {
    baseResponse(
        res,
        false,
        {},
        {
            message,
            statuscode: StatusCodes.FORBIDDEN,
        },
        null,
        StatusCodes.FORBIDDEN
    );
}

function validationsResponse(res, errorsArray) {
    baseResponse(
        res,
        false,
        {},
        {
            message: Messages.InvalidData,
            statuscode: StatusCodes.UNPROCESSABLE_ENTITY,
        },
        {
            errorsArray,
        },
        StatusCodes.UNPROCESSABLE_ENTITY
    );
}

function badRequestResponse(res, message = Messages.BadResponse) {
    baseResponse(
        res,
        false,
        {},
        {
            message,
            statuscode: StatusCodes.BAD_REQUEST,
        },
        null,
        StatusCodes.BAD_REQUEST
    );
}

function foreignKeyConstraintError(res, message = Messages.ForeignKeyConstraintError) {
    baseResponse(
        res,
        false,
        {},
        {
            message,
            statuscode: StatusCodes.BAD_REQUEST,
        },
        null,
        StatusCodes.BAD_REQUEST
    );
}


module.exports = {
    baseResponse,
    saveResponse,
    updateResponse,
    deleteResponse,
    serverIssueResponse,
    dataNotAvailable,
    sendDataResponse,
    invalidCredentialResponse,
    dataAlreadyExists,
    unAuthorizedResponse,
    validationsResponse,
    badRequestResponse,
    foreignKeyConstraintError

};
