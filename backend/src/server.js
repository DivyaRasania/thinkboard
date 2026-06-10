import express from "express";
import notesRoutes from "./routes/notesRoutes.js";
import {connectDB} from "./config/db.js";
import dotenv from "dotenv";
import rateLimiter from "./middleware/rateLimiter.js";

// get environment variables
dotenv.config();

// setup express app and port number
const app = express();
const PORT = process.env.PORT || 5001;

// enable middleware
app.use(express.json()); // middleware - runs between the request and the response; parses JSON bodies: req.body

// simple middleware eg:
/*
 * app.use((req, res, next) => {
 *     console.log(`Request method is ${req.method} and request URL is ${req.url}`);
 *     next();
 * })
 */

// enable rate limiting
app.use(rateLimiter);

// setup routes
app.use("/api/notes", notesRoutes);

// connect to mongodb and start listening
connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server running on ${PORT}`);
    });
});
