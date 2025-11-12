const express = require("express");
const Customer = require("../Models/Customer");
const functionModule = require("../Config/CommonConfig");
const Employee = require("../Models/Employee");
const { Sequelize } = require("sequelize");
const { StatusCodes } = require("http-status-codes");
require("dotenv").config();

const app = express();

// Model
Employee.paginationData = async function (skip, page_limit, filterObj) {
  let employeesData = await Employee.findAll({
    where: filterObj,
    limit: page_limit,
    offset: skip,
  });
  return employeesData;
};

// filtering and pagination api
app.get(
  "/v1/customer/getAvailableHelpers/:page",
  functionModule.verifyJwtToken,
  async (req, res) => {
    try {
      if (req.loginType == "customer") {
        let exist_customer = await Customer.findByEmail(req.emailId);
        if (exist_customer) {
          let page = Number(req.params.page) || 1;
          let skip = (page - 1) * Number(process.env.page_limit);
          let filterObj = {};
          filterObj.status = 1;
          if (req.body.country) filterObj.country = req.body.country;
          if (req.body.state) filterObj.state = req.body.state;
          if (req.body.city) filterObj.city = req.body.city;
          if (req.body.minAge && req.body.maxAge) {
            filterObj.age = {
              [Sequelize.Op.between]: [req.body.minAge, req.body.maxAge],
            };
          } else if (req.body.minAge) {
            filterObj.age = {
              [Sequelize.Op.gte]: req.body.minAge,
            };
          } else if (req.body.maxAge) {
            filterObj.age = {
              [Sequelize.Op.lte]: req.body.maxAge,
            };
          }

          if (req.body.role) {
            filterObj.role = {
              [Sequelize.Op.like]: `%${req.body.role}%`,
            };
          }
          if (req.body.workSchedule) {
            filterObj.workSchedule = {
              [Sequelize.Op.like]: `%${req.body.workSchedule}%`,
            };
          }
          if (req.body.provience) {
            filterObj.provience = {
              [Sequelize.Op.like]: `%${req.body.provience}%`,
            };
          }

          if (req.body.minSal && req.body.maxSal) {
            filterObj.salary = {
              [Sequelize.Op.and]: [
                Sequelize.literal(
                  `CAST(SUBSTRING_INDEX(salary, '-', 1) AS UNSIGNED) >= ${req.body.minSal}`
                ),
                Sequelize.literal(
                  `CAST(SUBSTRING_INDEX(salary, '-', -1) AS UNSIGNED) <= ${req.body.maxSal}`
                ),
              ],
            };
          } else if (req.body.minSal) {
            filterObj.salary = {
              [Sequelize.Op.and]: [
                Sequelize.literal(
                  `CAST(SUBSTRING_INDEX(salary, '-', 1) AS UNSIGNED) >= ${req.body.minSal}`
                ),
                Sequelize.literal(
                  `CAST(SUBSTRING_INDEX(salary, '-', -1) AS UNSIGNED) <= ${100000000}`
                ),
              ],
            };
          } else if (req.body.maxSal) {
            filterObj.salary = {
              [Sequelize.Op.and]: [
                Sequelize.literal(
                  `CAST(SUBSTRING_INDEX(salary, '-', 1) AS UNSIGNED) >= ${0}`
                ),
                Sequelize.literal(
                  `CAST(SUBSTRING_INDEX(salary, '-', -1) AS UNSIGNED) <= ${req.body.maxSal}`
                ),
              ],
            };
          }

          let employeeLength = await Employee.findAll({
            where: filterObj,
          });
          let employeeData = await Employee.paginationData(
            skip,
            Number(process.env.page_limit),
            filterObj
          );
          let filteredEmployeeData = [];
          for (let index = 0; index < employeeData.length; index++) {
            let employee = {};
            employee.role =
              employeeData[index].role != undefined
                ? employeeData[index].role.split(",")
                : null;
            employee.workSchedule =
              employeeData[index].workSchedule != undefined
                ? employeeData[index].workSchedule.split(",")
                : null;
            employee.workExperience = employeeData[index].workExperience;
            employee.salary = employeeData[index].salary;
            employee.country = employeeData[index].country;
            employee.bio = employeeData[index].bio;
            employee.empId = employeeData[index].empId;
            employee.profileImageUrl = employeeData[index].profileImageUrl;
            employee.name = employeeData[index].name;
            employee.emailId = employeeData[index].emailId;
            filteredEmployeeData.push(employee);
          }

          res.status(StatusCodes.OK).json({
            employeeData: filteredEmployeeData,
            statuscode: StatusCodes.OK,
            noOfEmployees: employeeLength.length,
            success: "Employees Information Has Send",
          });
        } else {
          res.status(StatusCodes.UNAUTHORIZED).json({
            statuscode: StatusCodes.UNAUTHORIZED,
            error: "Unauthorised Access : Customer Not Found",
          });
        }
      } else {
        res.status(StatusCodes.UNAUTHORIZED).json({
          statuscode: StatusCodes.UNAUTHORIZED,
          error: "Unauthorised Access : Invalid Login Type",
        });
      }
    } catch (err) {
      console.log(err);
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        statuscode: StatusCodes.INTERNAL_SERVER_ERROR,
        error: "Unable To Get CustomerRequest",
      });
    }
  }
);

app.get(
  "/v1/customer/getCustomerAvailableHelperProfile/:empId",
  functionModule.verifyJwtToken,
  async (req, res) => {
    try {
      if (req.loginType == "customer") {
        let exist_customer = await Customer.findByEmail(req.emailId);
        if (exist_customer) {
          let empId = Number(req.params.empId);
          let employee = await Employee.findByPk(empId);
          if (employee == undefined) {
            res.status(StatusCodes.BAD_REQUEST).json({
              employeeData: employee,
              statuscode: StatusCodes.BAD_REQUEST,
              error: "Unable To Get Helper Info",
            });
          } else {
            let employeeData = {};
            employeeData.name = employee.name;
            employeeData.age = employee.age;
            employeeData.emailId = employee.emailId;
            employeeData.phoneNumber = employee.phoneNumber;
            employeeData.country = employee.country;
            employeeData.profileImageUrl = employee.profileImageUrl;
            employeeData.role =
              employee.role != undefined ? employee.role.split(",") : null;
            employeeData.workExperience = employee.workExperience;
            employeeData.workSchedule =
              employee.workSchedule != undefined
                ? employee.workSchedule.split(",")
                : null;
            employeeData.salary = employee.salary;
            employeeData.provience =
              employee.provience != undefined
                ? employee.provience.split(",")
                : null;
            employeeData.maritalStatus = employee.maritalStatus;
            employeeData.religion = employee.religion;
            employeeData.bio = employee.bio;
            employeeData.language =
              employee.language != undefined
                ? employee.language.split(",")
                : null;
            employeeData.skills =
              employee.skills != undefined ? employee.skills.split(",") : null;
            employeeData.personality =
              employee.personality != undefined ? personality.split(",") : null;
            employeeData.facebookAccount = employee.facebookAccount;
            employeeData.linkedinAccount = employee.linkedinAccount;
            employeeData.whatsappAccount = employee.whatsappAccount;
            employeeData.wechatAccount = employee.wechatAccount;
            employeeData.lineAccount = employee.lineAccount;
            employeeData.telegramAccount = employee.telegramAccount;
            res.status(StatusCodes.OK).json({
              success: "Employee Data Send",
              statuscode: StatusCodes.OK,
              employeeData: employeeData,
            });
          }
        } else {
          res.status(StatusCodes.UNAUTHORIZED).json({
            statuscode: StatusCodes.UNAUTHORIZED,
            error: "Unauthorised Access : Customer Not Found",
          });
        }
      } else {
        res.status(StatusCodes.UNAUTHORIZED).json({
          statuscode: StatusCodes.UNAUTHORIZED,
          error: "Unauthorised Access : Invalid Login Type",
        });
      }
    } catch (err) {
      console.log(err);
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        statuscode: StatusCodes.INTERNAL_SERVER_ERROR,
        error: "Unable To Get CustomerRequest",
      });
    }
  }
);

module.exports = app;
