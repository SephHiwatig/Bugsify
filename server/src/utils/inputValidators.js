var validator = require("email-validator");
var passwordValidator = require('password-validator');

// Validates required fields:
// username, firstname, lastname, email, password
const isUserInfoValid = (userInfo) => {
    // Verify that all fields has value
    const requiredFields = Object.keys(userInfo);
    const isValid = requiredFields.every(field => userInfo[field]);
    return isValid;
};

const isPasswordValid = (password) => {
    const schema = new passwordValidator();
    schema
    .is().min(6)                                    // Minimum length 8
    .has().uppercase()                              // Must have uppercase letters
    .has().lowercase()                              // Must have lowercase letters
    .has().digits(1)                                // Must have at least 2 digits
    .has().not().spaces()                           // Should not have spaces

    return schema.validate(password);
};

const isEmailValid = (email) => {
    return validator.validate(email);
};

module.exports = {
    isPasswordValid,
    isEmailValid,
    isUserInfoValid
}