import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";

import notesRoutes from "./routes/notesRoutes.js";
import {connectDB} from "./config/db.js";
import rateLimiter from "./middleware/rateLimiter.js";

// get environment variables
dotenv.config();

// setup express app and port number
const app = express();
const PORT = process.env.PORT || 5001;
const __dirname = path.resolve();

// setup cors
if (process.env.NODE_ENV !== "production") {
    app.use(
        cors({
            origin: "http://localhost:5173",
        })
    );
}

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

if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../frontend/dist")));

    app.get("*", (req, res) => {
        res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
    });
}

// connect to mongodb and start listening
connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server running on ${PORT}`);
    });
});
