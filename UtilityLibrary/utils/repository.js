

/**
 * Author - Mangesh Balkawade : 7378336345
 * A generic repository class to handle common database operations using Sequelize.
 * This class implements methods for CRUD operations, soft deletion, and more.
 */

class Repository {

    model = null;
    primaryKey = null;
    softDeleteKey = null;
    softDeleteDefaultValue = false;

    messages = {
        // Data Success Messages
        DataNotAvailable: "No data available. Please check your request.",
        // Data Error Messages
        DataExists: "Data already exists. Please check your request.",
        ForeignKeyConstraintError: "Invalid data: Please check the associated foreign keys.",
    }

    /**
     * Initializes a new instance of the Repository class.
     * @param {Model} model - The Sequelize model to be used for database operations.
     * @param {string|null} [softDeleteKey=null] - The key used for soft deletion.
     * @param {boolean} [softDeleteDefaultValue=false] - The default value for the soft delete key.
     * @param {object|null} [messages=null] - Custom messages for various operations.
     */
    constructor(model, softDeleteKey = null, softDeleteDefaultValue = false, messages = null) {
        this.model = model;
        this.primaryKey = this.model.primaryKeyAttribute;
        this.softDeleteKey = softDeleteKey;
        if (messages) {
            Object.assign(this.messages, messages);
        }
        this.softDeleteDefaultValue = softDeleteDefaultValue;

    }

    /**
     * Saves a single record to the database.
     * @param {object} data - The data to be saved.
     * @param {Transaction|null} [transaction=null] - The transaction to be used.
     * @returns {Promise<object>} - The saved data.
     * @throws Will throw an error if the save operation fails.
     */
    saveData = async (data, transaction = null) => {
        try {
            let savedData = await this.model.create(data, { transaction });
            return savedData;
        } catch (error) {
            throw error;
        }
    }

    /**
     * Saves multiple records to the database.
     * @param {Array<object>} data - The data to be saved.
     * @param {Transaction|null} [transaction=null] - The transaction to be used.
     * @returns {Promise<Array<object>>} - The saved data.
     * @throws Will throw an error if the save operation fails.
     */
    saveBulkData = async (data, transaction = null) => {
        try {
            let savedData = await this.model.bulkCreate(data, { transaction });
            return savedData;
        }
        catch (error) {
            throw error;
        }
    }

    /**
     * Updates a record by its ID.
     * @param {number|string} id - The ID of the record to update.
     * @param {object} data - The new data for the record.
     * @param {boolean} [softDeleteOption=this.softDeleteDefaultValue] - Whether to check for soft deletion.
     * @param {Transaction|null} [transaction=null] - The transaction to be used.
     * @returns {Promise<boolean>} - True if the update was successful.
     * @throws Will throw an error if the record is not found or the update operation fails.
     */
    updateDataById = async (id, data, softDeleteOption = this.softDeleteDefaultValue, transaction = null) => {
        try {
            let whereCondition = {};
            whereCondition[this.primaryKey] = id;

            if (softDeleteOption) {
                whereCondition[this.softDeleteKey] = 0;
            }

            let existData = await this.model.findOne({
                where: whereCondition,
                transaction
            });

            if (!existData) {
                throw new Error(this.messages.DataNotAvailable);
            }

            Object.assign(existData, data);
            await existData.save({ transaction });
            return true;
        } catch (error) {
            throw error;
        }
    }

    /**
     * Updates multiple records based on a condition.
     * @param {object} condition - The condition to match records.
     * @param {object} data - The new data for the records.
     * @param {boolean} [softDeleteOption=this.softDeleteDefaultValue] - Whether to check for soft deletion.
     * @param {Transaction|null} [transaction=null] - The transaction to be used.
     * @returns {Promise<[number, object[]]>} - The number of affected rows and affected rows data.
     * @throws Will throw an error if the update operation fails.
     */
    updateDataWithCondition = async (condition, data, softDeleteOption = this.softDeleteDefaultValue, transaction = null) => {
        try {
            if (softDeleteOption) {
                condition[this.softDeleteKey] = 0;
            }

            let updatedData = await this.model.update(data, {
                where: condition,
                transaction
            });
            return updatedData;
        }
        catch (error) {
            throw error;
        }
    }

    /**
     * Deletes multiple records based on a condition.
     * @param {object} condition - The condition to match records.
     * @param {boolean} [softDeleteOption=this.softDeleteDefaultValue] - Whether to perform a soft delete.
     * @param {Transaction|null} [transaction=null] - The transaction to be used.
     * @returns {Promise<number>} - The number of rows affected.
     * @throws Will throw an error if the delete operation fails.
     */
    deleteDataWithCondition = async (condition, softDeleteOption = this.softDeleteDefaultValue, transaction = null) => {
        try {
            let removedRows = 0;

            if (softDeleteOption) {
                condition[this.softDeleteKey] = 0;
                removedRows = await this.model.update(
                    { [this.softDeleteKey]: 1 },
                    { where: condition, transaction }
                );
                removedRows = removedRows?.[0];
            } else {
                removedRows = await this.model.destroy({
                    where: condition,
                    transaction
                });
            }

            return removedRows;
        }
        catch (error) {
            throw error;
        }
    }

    /**
     * Deletes a single record by its ID.
     * @param {number|string} id - The ID of the record to delete.
     * @param {boolean} [softDeleteOption=this.softDeleteDefaultValue] - Whether to perform a soft delete.
     * @param {Transaction|null} [transaction=null] - The transaction to be used.
     * @returns {Promise<boolean>} - True if the delete was successful.
     * @throws Will throw an error if the record is not found or the delete operation fails.
     */
    deleteDataById = async (id, softDeleteOption = this.softDeleteDefaultValue, transaction = null) => {
        try {
            let whereCondition = { [this.primaryKey]: id };

            if (softDeleteOption) {
                whereCondition[this.softDeleteKey] = 0;
            }

            let data = await this.model.findOne({
                where: whereCondition,
                transaction
            });

            if (!data) {
                throw new Error(this.messages.DataNotAvailable);
            }

            if (softDeleteOption) {
                data[this.softDeleteKey] = 1;

                await data.save({ transaction });
            } else {
                data.destroy({ transaction });
            }

            return true;
        } catch (error) {
            throw error;
        }
    }

    /**
     * Retrieves a single record by its ID.
     * @param {number|string} id - The ID of the record to retrieve.
     * @param {boolean} [softDeleteOption=this.softDeleteDefaultValue] - Whether to check for soft deletion.
     * @param {Transaction|null} [transaction=null] - The transaction to be used.
     * @returns {Promise<object|null>} - The retrieved record, or null if not found.
     * @throws Will throw an error if the retrieval operation fails.
     */
    getDataById = async (id, softDeleteOption = this.softDeleteDefaultValue, transaction = null) => {
        try {
            let whereCondition = { [this.primaryKey]: id };

            if (softDeleteOption) {
                whereCondition[this.softDeleteKey] = 0;
            }

            let data = await this.model.findOne({
                where: whereCondition,
                transaction
            });
            return data;
        } catch (error) {
            throw error;
        }
    }

    /**
     * Retrieves a single record by its ID with specific attributes.
     * @param {number|string} id - The ID of the record to retrieve.
     * @param {Array<string>} attributes - The attributes to retrieve.
     * @param {boolean} [softDeleteOption=this.softDeleteDefaultValue] - Whether to check for soft deletion.
     * @param {Transaction|null} [transaction=null] - The transaction to be used.
     * @returns {Promise<object|null>} - The retrieved record, or null if not found.
     * @throws Will throw an error if the retrieval operation fails.
     */
    getDataByIdWithAttributes = async (id, attributes, softDeleteOption = this.softDeleteDefaultValue, transaction = null) => {
        try {
            let whereCondition = { [this.primaryKey]: id };

            if (softDeleteOption) {
                whereCondition[this.softDeleteKey] = 0;
            }

            let data = await this.model.findOne({
                where: whereCondition,
                attributes,
                transaction
            });
            return data;
        }
        catch (error) {
            throw error;
        }
    }

    /**
     * Retrieves all records from the database.
     * @param {string} [orderBy=this.primaryKey] - The field to order by.
     * @param {string} [orderDir="DESC"] - The direction to order by (ASC or DESC).
     * @param {boolean} [softDeleteOption=this.softDeleteDefaultValue] - Whether to check for soft deletion.
     * @param {Transaction|null} [transaction=null] - The transaction to be used.
     * @returns {Promise<Array<object>>} - The retrieved records.
     * @throws Will throw an error if the retrieval operation fails.
     */
    getAllData = async (orderBy = this.primaryKey, orderDir = "DESC", softDeleteOption = this.softDeleteDefaultValue, transaction = null) => {
        try {
            let whereCondition = {};

            if (softDeleteOption) {
                whereCondition[this.softDeleteKey] = 0;
            }

            let data = await this.model.findAll({
                where: whereCondition,
                transaction,
                order: [[orderBy, orderDir]]
            });

            return data;
        }
        catch (error) {
            throw error;
        }
    }

    /**
     * Retrieves all records with specific attributes from the database.
     * @param {Array<string>} attributes - The attributes to retrieve.
     * @param {string} [orderBy=this.primaryKey] - The field to order by.
     * @param {string} [orderDir="DESC"] - The direction to order by (ASC or DESC).
     * @param {boolean} [softDeleteOption=this.softDeleteDefaultValue] - Whether to check for soft deletion.
     * @param {Transaction|null} [transaction=null] - The transaction to be used.
     * @returns {Promise<Array<object>>} - The retrieved records.
     * @throws Will throw an error if the retrieval operation fails.
     */
    getAllDataWithAttributes = async (attributes, orderBy = this.primaryKey, orderDir = "DESC", softDeleteOption = this.softDeleteDefaultValue, transaction = null) => {
        try {
            let whereCondition = {};

            if (softDeleteOption) {
                whereCondition[this.softDeleteKey] = 0;
            }

            let data = await this.model.findAll({
                where: whereCondition,
                transaction,
                attributes,
                order: [[orderBy, orderDir]]
            });

            return data;
        }
        catch (error) {
            throw error;
        }
    }

    /**
     * Retrieves all records based on a condition.
     * @param {object} condition - The condition to match records.
     * @param {string} [orderBy=this.primaryKey] - The field to order by.
     * @param {string} [orderDir="DESC"] - The direction to order by (ASC or DESC).
     * @param {Transaction|null} [transaction=null] - The transaction to be used.
     * @returns {Promise<Array<object>>} - The retrieved records.
     * @throws Will throw an error if the retrieval operation fails.
     */
    getAllDataWithCondition = async (condition, orderBy = this.primaryKey, orderDir = "DESC", transaction = null) => {
        try {
            let data = await this.model.findAll({
                where: condition,
                transaction,
                order: [[orderBy, orderDir]]
            });

            return data;
        }
        catch (error) {
            throw error;
        }
    }

    /**
     * Retrieves all records with specific attributes based on a condition.
     * @param {object} condition - The condition to match records.
     * @param {Array<string>} attributes - The attributes to retrieve.
     * @param {string} [orderBy=this.primaryKey] - The field to order by.
     * @param {string} [orderDir="DESC"] - The direction to order by (ASC or DESC).
     * @param {boolean} [softDeleteOption=this.softDeleteDefaultValue] - Whether to check for soft deletion.
     * @param {Transaction|null} [transaction=null] - The transaction to be used.
     * @returns {Promise<Array<object>>} - The retrieved records.
     * @throws Will throw an error if the retrieval operation fails.
     */
    getAllDataWithConditionAndAttributes = async (condition, attributes, orderBy = this.primaryKey, orderDir = "DESC", softDeleteOption = this.softDeleteDefaultValue, transaction = null) => {
        try {
            if (softDeleteOption) {
                condition[this.softDeleteKey] = 0;
            }

            let data = await this.model.findAll({
                where: condition,
                transaction,
                attributes,
                order: [[orderBy, orderDir]]
            });

            return data;
        }
        catch (error) {
            throw error;
        }
    }

    /**
     * Retrieves a single record based on a condition.
     * @param {object} condition - The condition to match the record.
     * @param {string} [orderBy=this.primaryKey] - The field to order by.
     * @param {string} [orderDir="DESC"] - The direction to order by (ASC or DESC).
     * @param {boolean} [softDeleteOption=this.softDeleteDefaultValue] - Whether to check for soft deletion.
     * @param {Transaction|null} [transaction=null] - The transaction to be used.
     * @returns {Promise<object|null>} - The retrieved record, or null if not found.
     * @throws Will throw an error if the retrieval operation fails.
     */
    getSingleDataWithCondition = async (condition, orderBy = this.primaryKey, orderDir = "DESC", softDeleteOption = this.softDeleteDefaultValue, transaction = null) => {
        try {
            if (softDeleteOption) {
                condition[this.softDeleteKey] = 0;
            }

            let data = await this.model.findOne({
                where: condition,
                transaction,
                order: [[orderBy, orderDir]]
            });

            return data;
        }
        catch (error) {
            throw error;
        }
    }

    /**
     * Retrieves a single record with specific attributes based on a condition.
     * @param {object} condition - The condition to match the record.
     * @param {Array<string>} attributes - The attributes to retrieve.
     * @param {string} [orderBy=this.primaryKey] - The field to order by.
     * @param {string} [orderDir="DESC"] - The direction to order by (ASC or DESC).
     * @param {boolean} [softDeleteOption=this.softDeleteDefaultValue] - Whether to check for soft deletion.
     * @param {Transaction|null} [transaction=null] - The transaction to be used.
     * @returns {Promise<object|null>} - The retrieved record, or null if not found.
     * @throws Will throw an error if the retrieval operation fails.
     */
    getSingleDataWithConditionAndAttributes = async (condition, attributes, orderBy = this.primaryKey, orderDir = "DESC", softDeleteOption = this.softDeleteDefaultValue, transaction = null) => {
        try {
            if (softDeleteOption) {
                condition[this.softDeleteKey] = 0;
            }

            let data = await this.model.findOne({
                where: condition,
                transaction,
                attributes,
                order: [[orderBy, orderDir]]
            });

            return data;
        }
        catch (error) {
            throw error;
        }
    }

    /**
     * Retrieves records with pagination based on a condition.
     * @param {object} condition - The condition to match records.
     * @param {number} page - The page number to retrieve.
     * @param {number} pageSize - The number of records per page.
     * @param {string} [orderBy=this.primaryKey] - The field to order by.
     * @param {string} [orderDir="DESC"] - The direction to order by (ASC or DESC).
     * @param {boolean} [softDeleteOption=this.softDeleteDefaultValue] - Whether to check for soft deletion.
     * @param {Transaction|null} [transaction=null] - The transaction to be used.
     * @returns {Promise<{count: number, rows: Array<object>}>} - The retrieved records with count and rows.
     * @throws Will throw an error if the retrieval operation fails.
     */
    getDataWithPaginationAndCondition = async (condition, page, pageSize, orderBy = this.primaryKey, orderDir = "DESC", softDeleteOption = this.softDeleteDefaultValue, transaction = null) => {
        try {
            let offset = (page - 1) * pageSize;

            if (softDeleteOption) {
                condition[this.softDeleteKey] = 0;
            }

            let data = await this.model.findAndCountAll({
                where: condition,
                limit: pageSize,
                offset,
                distinct: true,
                order: [[orderBy, orderDir]],
                transaction
            });

            return data;
        }
        catch (error) {
            throw error;
        }
    }

    /**
     * Retrieves records with pagination and specific attributes based on a condition.
     * @param {object} condition - The condition to match records.
     * @param {number} page - The page number to retrieve.
     * @param {number} pageSize - The number of records per page.
     * @param {Array<string>} attributes - The attributes to retrieve.
     * @param {string} [orderBy=this.primaryKey] - The field to order by.
     * @param {string} [orderDir="DESC"] - The direction to order by (ASC or DESC).
     * @param {boolean} [softDeleteOption=this.softDeleteDefaultValue] - Whether to check for soft deletion.
     * @param {Transaction|null} [transaction=null] - The transaction to be used.
     * @returns {Promise<{count: number, rows: Array<object>}>} - The retrieved records with count and rows.
     * @throws Will throw an error if the retrieval operation fails.
     */
    getDataWithPaginationAndConditionAndAttributes = async (condition, page, pageSize, attributes, orderBy = this.primaryKey, orderDir = "DESC", softDeleteOption = this.softDeleteDefaultValue, transaction = null) => {
        try {
            let offset = (page - 1) * pageSize;

            if (softDeleteOption) {
                condition[this.softDeleteKey] = 0;
            }

            let data = await this.model.findAndCountAll({
                where: condition,
                limit: pageSize,
                offset,
                attributes,
                distinct: true,
                order: [[orderBy, orderDir]],
                transaction
            });
            return data;
        }
        catch (error) {
            throw error;
        }
    }

    /**
 * Checks if any record exists that matches a given condition.
 * @param {object} condition - The condition to check.
 * @param {boolean} [softDeleteOption=this.softDeleteDefaultValue] - Whether to apply soft delete condition.
 * @param {Transaction|null} [transaction=null] - Optional transaction.
 * @returns {Promise<boolean>} - Returns true if any record exists, otherwise false.
 * @throws Will throw an error if the check operation fails.
 */
    dataExists = async (condition, softDeleteOption = this.softDeleteDefaultValue, transaction = null) => {
        try {
            if (softDeleteOption) {
                condition[this.softDeleteKey] = 0;
            }

            let count = await this.model.count({
                where: condition,
                transaction
            });

            return count > 0;
        }
        catch (error) {
            throw error;
        }
    }

    /**
     * Retrieves the total count of records that match a given condition.
     * @param {object} condition - The condition to match records.
     * @param {boolean} [softDeleteOption=this.softDeleteDefaultValue] - Whether to apply soft delete condition.
     * @param {Transaction|null} [transaction=null] - Optional transaction.
     * @returns {Promise<number>} - The total count of records.
     * @throws Will throw an error if the count operation fails.
     */
    getTotalCount = async (condition, softDeleteOption = this.softDeleteDefaultValue, transaction = null) => {
        try {
            if (softDeleteOption) {
                condition[this.softDeleteKey] = 0;
            }

            let count = await this.model.count({
                where: condition,
                transaction
            });

            return count;
        } catch (error) {
            throw error;
        }
    }

    /**
     * Retrieves the keys of the model's attributes.
     * @returns {Promise<Array<string>>} - The list of attribute keys.
     * @throws Will throw an error if the operation fails.
     */
    getModelKeys = async () => {
        try {
            let keys = Object.keys(await this.model.describe());
            return keys;
        } catch (error) {
            throw error;
        }
    }

    /**
     * Retrieves the maximum value of a specified field for records that match a given condition.
     * @param {object} condition - The condition to match records.
     * @param {string} field - The field to find the maximum value of.
     * @param {boolean} [softDeleteOption=this.softDeleteDefaultValue] - Whether to apply soft delete condition.
     * @param {Transaction|null} [transaction=null] - Optional transaction.
     * @returns {Promise<number|null>} - The maximum value of the specified field.
     * @throws Will throw an error if the retrieval operation fails.
     */
    getMaxData = async (condition, field, softDeleteOption = this.softDeleteDefaultValue, transaction = null) => {
        try {
            if (softDeleteOption) {
                condition[this.softDeleteKey] = 0;
            }

            let data = await this.model.max(
                field,
                {
                    where: condition,
                    transaction
                }
            );

            return data;
        }
        catch (error) {
            throw error;
        }
    }

}

module.exports = Repository;
