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
  CATEGORY_NOT_FOUND: {
    code: "CATEGORY_NOT_FOUND",
    message: "Category not found",
    status: 404,
  },
  MISSING_OR_INVALID_AUTHORIZATION_HEADER: {
    code: "MISSING_OR_INVALID_AUTHORIZATION_HEADER",
    message: "Missing or invalid authorization header",
    status: 401,
  },
  PRODUCT_NOT_FOUND: {
    code: "PRODUCT_NOT_FOUND",
    message: "Product not found",
    status: 404,
  },
  PRODUCT_IMAGE_NOT_FOUND: {
    code: "PRODUCT_IMAGE_NOT_FOUND",
    message: "Product image not found",
    status: 404,
  },
  NO_FILE_UPLOADED: {
    code: "NO_FILE_UPLOADED",
    message: "No file uploaded",
    status: 400,
  },
  USER_DOESNT_HAVE_ANY_CATEGORIES: {
    code: "USER_DOESNT_HAVE_ANY_CATEGORIES",
    message: "User doesn't have any categories",
    status: 400,
  },
  INVALID_PRODUCT_NAME: {
    code: "INVALID_PRODUCT_NAME",
    message: "Contains invalid name",
    status: 400,
  },
  INVALID_PRODUCT_PRICE: {
    code: "INVALID_PRODUCT_PRICE",
    message: "Contains invalid price",
    status: 400,
  },
  INVALID_PRODUCT_CATEOGORY_ID: {
    code: "INVALID_PRODUCT_CATEOGORY_ID",
    message: "Contains invalid category id",
    status: 400,
  },
  CSV_CONTAINS_INVALID_ROWS: {
    code: "CSV_CONTAINS_INVALID_ROWS",
    message: "CSV contains invalid rows",
    status: 400,
  },
};
