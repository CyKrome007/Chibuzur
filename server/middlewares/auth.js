import {TryCatch} from "./error.js";
import {ErrorHandler} from "../utils/utility.js";
import jwt from "jsonwebtoken";

const isAuthenticated = (req, res, next) => {
    const token = req.cookies[process.env.COOKIE];
    // console.log('token in auth.js', token);

    if(!token)
        return next(new ErrorHandler('Please Login To Access Profile', 400));

    const decodedData = jwt.verify(token, process.env.JWT_SECRET);

    req.userId = decodedData._id;

    // console.log(req.userId);

    next();
};

export { isAuthenticated };