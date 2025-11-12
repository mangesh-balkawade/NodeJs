const { Op } = require("sequelize");

/**
 * Author - Mangesh Balkawade : 7378336345
 * Controller class that manages HTTP request handling for CRUD operations.
 * Author : Mangesh Balkawade
 */

class Controller {

  service = null;
  logEnable = false;
  primaryKey = null;

  message = {
    DataNotAvailable: "No data available. Please check your request.",
    DataCreated: "Data saved successfully.",
    DataDeleted: "Data deleted successfully.",
    DataUpdated: "Data updated successfully.",
    DataFetched: "Data fetched successfully.",

    // Data Error Messages
    DataExists: "Data already exists. Please check your request.",
    UnableToSaveData: "Unable to save data.",
    UnableToFetchData: "Unable to fetch data.",
    UnableToUpdateData: "Unable to update data.",
    UnableToDeleteData: "Unable to delete data.",
    UnableToGetDataById: "Unable to get data by ID.",
    ForeignKeyConstraintError: "Invalid data: Please check the associated foreign keys.",

    InternalServerError: "Server issue, try after some time.",
  };

  /**
   * Constructor to initialize the Controller with the necessary service and configurations.
   * @param {object} service - The service instance to be used by the controller.
   * @param {string} primaryKey - The primary key of the data model.
   * @param {boolean} [logEnable=false] - Whether to enable logging of errors.
   * @param {object|null} [messages=null] - Custom messages to override the default ones.
   */
  constructor(service, primaryKey, logEnable = false, messages = null) {
    this.service = service;
    if (messages) {
      Object.assign(this.message, messages);
    }
    this.logEnable = logEnable;
    this.primaryKey = primaryKey;
  }

  /**
   * Handles the creation of new data.
   * @param {object} req - The request object containing the data to be saved.
   * @param {object} res - The response object to send the result.
   * @returns {Promise<object>} - Returns the saved data and a success message.
   */
  saveData = async (req, res) => {
    try {
      let data = req.body;
      let saveData = await this.service.saveData(data);
      return this.handleSuccess(res, { saveData }, 201, this.message.DataCreated);
    } catch (error) {
      return this.handleError(res, error);
    }
  }

  /**
   * Handles the updating of existing data by ID.
   * @param {object} req - The request object containing the data to be updated.
   * @param {object} res - The response object to send the result.
   * @returns {Promise<object>} - Returns the updated data and a success message.
   */
  updateData = async (req, res) => {
    try {

      let { id } = req.params;

      let existData = await this.service.dataExists({ [this.primaryKey]: id });

      if (!existData) {
        return this.handleError(res, null, 400, this.message.DataNotAvailable);
      }

      let data = req.body;
      let updatedData = await this.service.updateDataById(id, data);

      return this.handleSuccess(res, { updatedData }, 200, this.message.DataUpdated);
    } catch (error) {
      return this.handleError(res, error);
    }
  }

  /**
   * Handles the deletion of data by ID.
   * @param {object} req - The request object containing the ID of the data to be deleted.
   * @param {object} res - The response object to send the result.
   * @returns {Promise<object>} - Returns a success message if the data is deleted.
   */
  deleteData = async (req, res) => {
    try {
      let { id } = req.params;
      let existData = await this.service.dataExists({ [this.primaryKey]: id });

      if (!existData) {
        return this.handleError(res, null, 400, this.message.DataNotAvailable);
      }

      await this.service.deleteDataById(id);

      return this.handleSuccess(res, {}, 200, this.message.DataDeleted);
    } catch (error) {
      return this.handleError(res, error);
    }
  }

  /**
   * Fetches data by ID.
   * @param {object} req - The request object containing the ID of the data to be fetched.
   * @param {object} res - The response object to send the result.
   * @returns {Promise<object>} - Returns the fetched data.
   */
  getDataById = async (req, res) => {
    try {
      let { id } = req.params;
      let data = await this.service.getDataById(id);

      if (!data) {
        return this.handleError(res, null, 400, this.message.DataNotAvailable);
      }

      return this.handleSuccess(res, { data });
    } catch (error) {
      return this.handleError(res, error);
    }
  }

  /**
   * Fetches all data.
   * @param {object} req - The request object.
   * @param {object} res - The response object to send the result.
   * @returns {Promise<object>} - Returns all the fetched data.
   */
  getAllData = async (req, res) => {
    try {
      let data = await this.service.getAllData();
      return this.handleSuccess(res, { data });
    } catch (error) {
      return this.handleError(res, error);
    }
  }

  /**
   * Fetches paginated data with optional sorting.
   * @param {object} req - The request object containing pagination and sorting information.
   * @param {object} res - The response object to send the result.
   * @returns {Promise<object>} - Returns the paginated data and pagination details.
   */
  getAllDataWithPagination = async (req, res) => {
    try {
      let {
        page = 1, limit = 10, orderBy = this.primaryKey, orderDir = "DESC", searchBy = "", searchColumns = []
      } = req.query;

      let condition = {};

      if (typeof searchColumns == 'string') {
        searchColumns = JSON.parse(searchColumns);
      }

      if (searchBy) {
        let searchCondition = [];

        // If specific columns are provided for searching
        if (searchColumns.length > 0) {
          searchColumns.forEach(column => {
            searchCondition.push({
              [column]: {
                [Op.like]: `%${searchBy}%`
              }
            });
          });
        } else {
          // If no specific columns are provided, search across all columns
          searchColumns = await this.service.getModelKeys();
          searchColumns.forEach(column => {
            searchCondition.push({
              [column]: {
                [Op.like]: `%${searchBy}%`
              }
            });
          });
        }

        // Add the search conditions to the main condition using the OR operator
        condition[Op.or] = searchCondition;
      }


      let data = await this.service.getDataWithPaginationAndCondition(condition, +page, +limit, orderBy, orderDir);

      let totalPages = Math.ceil(data.count / limit);

      data = {
        data: data.rows,
        currentPage: page,
        limit,
        totalCount: data.count,
        totalPages,
      }

      return this.handleSuccess(res, { data });
    } catch (error) {
      return this.handleError(res, error);
    }
  }

  /**
   * Handles errors and sends error responses.
   * @param {object} res - The response object to send the error result.
   * @param {Error|null} error - The error object (optional).
   * @param {number} [status=500] - The HTTP status code.
   * @param {string} [message=this.message.InternalServerError] - The error message to send.
   * @returns {object} - Sends a JSON response with the error details.
   */
  handleError = (res, error, status = 500, message = this.message.InternalServerError) => {
    if (this.logEnable && error) {
      console.log("Message: ", error.message);
      console.log("Stack: ", error.stack);
    }

    return res.status(status).json({
      data: {},
      message,
      status
    });
  }

  /**
   * Handles successful operations and sends success responses.
   * @param {object} res - The response object to send the success result.
   * @param {object} data - The data to send in the response.
   * @param {number} [status=200] - The HTTP status code.
   * @param {string} [message=this.message.DataFetched] - The success message to send.
   * @returns {object} - Sends a JSON response with the success details.
   */
  handleSuccess = (res, data, status = 200, message = this.message.DataFetched) => {
    return res.status(status).json({
      data,
      message,
      status
    });
  }
}

module.exports = Controller;
