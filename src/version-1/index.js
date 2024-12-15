import authMiddleware from "../middleware/auth.js";
import Router from "express";
import _auth from "./Auth/index.js";
import _admin from "./Admin/index.js";
import _products from "./Product/index.js";
import _user from "./User/index.js";
const app = Router();
// without middleware routes

const skipAuthRoutes = (req, res, next) =>
{
    try
    {
        // Parse the full URL
        const parsedUrl = new URL(req.url, `http://${req.headers.host}`);
        const path = parsedUrl.pathname;
        if (path && path.startsWith('/auth/'))
        {
            return next(); 
        }
        authMiddleware.authMiddleware(req, res, next);
    }
    catch (error)
    {
        res.status(500).send('Internal Server Error');
    }
};

app.use(skipAuthRoutes);
// Apply the conditional middleware to all routes

app.use("/auth", _auth);
app.use("/admin", _admin);
app.use('/product', _products);
app.use('/user', _user);

export default app;