export const API_V1:string = "/api/v1/";
export const BYTES:number = 16;
export const ITERATION:number = 1000;
export const KEY_LENGTH:number= 64;
export const DIGEST:string = "sha512";
export const ROLES: string[] = ["admin","user"];
export const TYPES: string[] = ["banner","logo","social-media","privacy-policy","ads"];


// Http response
export const RFC = {
    // OK
    H200 : 200,
    // Created
    H201 : 201,
    // Not Found
    H401 : 401,
    // Not Found
    H404 : 404,
    // Forbidden
    H403 : 403,
    // Conflict
    H409 : 409,
    // Precondition Failed
    H412 : 412,
    // Unsupported media type
    H415 : 415,
    // Internal Server Error
    H500 : 500,

}

// Success Messages
export const USER_CREATED = "User created successfully!";
export const USER_UPDATED = "User updation successfully!";
export const LOGIN_SUCCESS = "Logged in successfully!";
export const FOUND_USERSDATA = "Data successfully found";
export const DELETE_USERSDATA = "Data delete successfully";
// Errors Messages
export const VALIDATION_ERROR = "Validation error!";
export const INTERNAL_ERROR = "Internal server error!";
export const UNAUTHORIZED_ACCESS = "Unauthorized access!";
export const JWT_NOT_FOUND = "token not found!";
export const INVALID_USER = "Invalid username or password!";

// Validation Messages
export const USER_EXISTS = "User already exists!";

// Successfull listing Messages
export const COMMON_SUCCESS = "successfully executed!";
export const COMMON_ERROR = "Something went wrong. Please check your params.";
