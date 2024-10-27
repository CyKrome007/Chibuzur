import express from "express";
import userRoute from "./routes/user.routes.js";
import chatRoute from "./routes/chat.routes.js";
import {connectDB} from "./utils/features.js";
import dotenv from "dotenv";
import {errorMiddleware} from "./middlewares/error.js";
import cookieParser from "cookie-parser";
import {createUser} from "./seeders/user.seed.js";
import {createGroupChats, createMessages, createSingleChats} from "./seeders/chat.seed.js";

dotenv.config({
    path: "./.env",
})

const dbURI = process.env.DATABASE_URI;
const port = process.env.PORT || 3000;

connectDB(dbURI);

// createSingleChats(10);
// createGroupChats(10);
// createMessages(50);

// createUser(10);

const app = express();

app.use('/', express.json());
app.use(cookieParser());

app.use('/user', userRoute);
app.use('/chat', chatRoute);

app.get("/", (req, res) => {
    res.send("Hello World!");
})

app.use(errorMiddleware);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
