export const ERROR_RESPONSE = {
  PASSWORD_AND_CONFIRM_PASSWORD_DO_NOT_MATCH: {
    code: "PASSWORD_AND_CONFIRM_PASSWORD_DO_NOT_MATCH",
    message: "Password and Confirm Password do not match",
    status: 400,
  },
  USER_ALREADY_EXISTS: {
    code: "USER_ALREADY_EXISTS",
    message: "User already exists",
    status: 409,
  },
  INVALID_EMAIL_OR_PASSWORD: {
    code: "INVALID_EMAIL_OR_PASSWORD",
    message: "Invalid email or password",
    status: 401,
  },
};
