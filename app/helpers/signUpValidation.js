const yup = require('yup');
const { regExpEmail, regExpPassword } = require('./constants');

exports.signUpValidations = yup.object().shape({
  email: yup
    .string()
    .required('email is a required field')
    .email('email is a invalid field')
    .matches(regExpEmail, 'The email domain is incorrect'),
  password: yup
    .string()
    .required('password is a required field')
    .matches(regExpPassword, 'The password must be alphanumeric')
    .min(8, 'Password should be at least 8 chars long')
});
