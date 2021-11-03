import express from "express";


import { login, changePassword, edit, registerUser, userData, userDelete, userEdit } from "../controllers/Users.controller";

import { jwtMiddleware } from "../middlewares/jwt.middleware";

let users_router = express.Router();

// User Login
users_router.post('/login', login);
//User Register
users_router.post('/registerUser', registerUser);
//user data access
users_router.get("/userdata", userData);
//User data edit
users_router.post("/useredit", jwtMiddleware, userEdit);
//User data delete
users_router.post("/userdelete", jwtMiddleware, userDelete);
// User Change Password
users_router.post('/change-password', jwtMiddleware, changePassword);

export {
    users_router
};