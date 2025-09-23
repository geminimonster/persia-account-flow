import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import setupRoute from "./routes/setup.js";
import loginRoute from "./routes/login.js";

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use("/api/setup", setupRoute);
app.use("/api/login", loginRoute);

const PORT = 5000;
app.listen(PORT, () => console.log(`Backend running on http://localhost:${PORT}`));
