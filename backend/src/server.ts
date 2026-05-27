import dotenv from "dotenv";
dotenv.config();
import app from "./app";

import { connectDB } from './config/db';
const port = process.env.PORT || 3000;

connectDB().then(() => {
    app.listen(port, () => {
        console.log(`Server running on port ${port}`);
    });
})