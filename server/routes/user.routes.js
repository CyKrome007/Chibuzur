import express from 'express';
import {getMyProfile, login, logout, register, searchUser} from '../controllers/user.js';
import {singleAvatar} from "../middlewares/multer.js";
import {isAuthenticated} from "../middlewares/auth.js";
import {loginValidator, registerValidator, validateHandler} from "../lib/validators.js";

const app = express.Router();

app.post('/register', singleAvatar, registerValidator(), validateHandler, register);
app.post('/login', loginValidator(), validateHandler, login);

app.use(isAuthenticated);
app.get('/profile', getMyProfile);
app.get('/logout', logout);
app.get('/search', searchUser);

export default app;
