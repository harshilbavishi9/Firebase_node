const { body } = require('express-validator')
const validateInputs = [
    body('name').matches(/^[a-zA-Z\s]+$/).withMessage('Name is invalid'),
    body('email').matches(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/).withMessage('Invalid email address'),
    body('phone').matches(/^[0-9]{10}$/).withMessage('Invalid phone number'),
];

module.exports = validateInputs