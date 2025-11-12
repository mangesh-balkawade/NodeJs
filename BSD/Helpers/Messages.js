const Messages = {
    // Server Issue Messages
    InternalServerError: "Internal Server Error",

    // JWT Messages
    UnableToCreateJWTToken: "Unable to create a JWT Token",
    InvalidJWTToken: "Invalid JWT Token",
    JWTTokenRequired: "Please provide a JWT Token",
    Forbidden: "You do not have permission to access this module",

    // Entities Success Messages
    DataNotAvailable: "No data is associated with the given ID",
    DataSaved: "Data saved successfully",
    DataDeleted: "Data deleted successfully",
    DataUpdated: "Data updated successfully",
    DataFetched: "Data fetched successfully",

    InvalidCredentials: "Invalid email or password",
    LoginSuccessful: "User login successful",

    // Entities Error Messages
    DataExists: "An Data is already associated with the given ID",
    UnableToSaveData: "Unable to save data",
    UnableToGetData: "Unable to fetch data",
    UnableToUpdateData: "Unable to update data",
    UnableToDeleteData: "Unable to delete data",
    UnableToGetDataById: "Unable to get data by ID",

    // Validation Messages
    InvalidEmail: "Please provide a valid email address",
    InvalidPassword: "Please provide a password in a valid format",
    InvalidPasswordConfirmPassword: "Password and confirm password do not match",
    InvalidData: "Please provide valid data or data is not in a valid format",
    IdRequired: "Please provide an ID",
    PositiveValuesRequired: "Please provide a value greater than or equal to 0",

    // Required Messages
    EmailRequired: "Email address is required",
    PasswordRequired: "Password is required",
    ConfirmPasswordRequired: "Confirm password is required",
    NameRequired: "Name is required",
    PhoneNumberRequired: "Phone number is required",
    CountryRequired: "Country is required",
    StateRequired: "State is required",
    CityRequired: "City is required",
    ZipRequired: "Zip code is required",
    CompanyNameRequired: "Company name is required",
    DepartmentRequired: "Department is required",
    PositionRequired: "Position is required",
    RoleRequired: "Role is required",
    ModuleAccessRequired: "Module access is required",

    OrganisationExist: "An organization with this name already exists. Please try another name.",
    OrganisationRequired: "Organization name is required",
    RoleExisted: "The role you are creating already exists",
    RoleNotAllowed: "You are not allowed to create this role",
    RoleNotExist: "The role does not exist",
    ForeignKeyConstraintError: "Please Provide Valid Values For Selected Ids",
    BadResponse: "Provide Valid Values Or You Are Not Allowed To Used The given Values",
};

module.exports = Messages;
