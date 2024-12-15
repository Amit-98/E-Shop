import express from 'express';
const app = express.Router();
import version1 from "./version-1/index.js";

app.use('/v1', version1);

export default app;