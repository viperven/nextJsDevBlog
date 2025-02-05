const validator = require("validator");

const validateVerifyOtp =  (email, otp) => {
  let customError = new Error();

  if (!email || !otp) {
    customError.message = "Please provide both email and otp!";
    customError.statusCode = 400;
    throw customError;
  }
  if (!validator.isEmail(email)) {
    customError.message = "Invalid email address!";
    customError.statusCode = 400;
    throw customError;
  }
  if (!validator.isLength(otp, { min: 6, max: 6 })) {
    customError.message = "Invalid OTP!";
    customError.statusCode = 400;
    throw customError;
  }
};

const validateSendOtp =  ( name, email) => {
  let customError = new Error();
  if (!email || !name) {
    customError.message = "name and Email is required";
    customError.statusCode = 400;
    throw customError;
  }

  if (!validator.isEmail(email)) {
    customError.message = "Invalid email address!";
    customError.statusCode = 400;
    throw customError;
  }
};

const validteRegister =  (name, email, password) => {
  let customError = new Error();

  if (!name || !email || !password) {
    customError.message = "name , email and password are mandatory";
    customError.status = 400;
    throw customError;
  }

  if (!validator.isLength(password, { min: 6 })) {
    customError.message = "Invalid OTP!";
    customError.statusCode = 400;
    throw customError;
  }
};

const validateLogin =  ( email, password) => {
  let customError = new Error();

  if (!email || !password) {
    customError.message = "name , email and password are mandatory";
    customError.status = 400;
    throw customError;
  }
  if (!validator.isEmail(email)) {
    customError.message = "Invalid email address!";
    customError.statusCode = 400;
    throw customError;
  }
};

module.exports = {
  validateVerifyOtp,
  validateSendOtp,
  validteRegister,
  validateLogin,
};
