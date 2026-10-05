require("dotenv").config();
const express = require('express');
const connectDB = require("./utils/db.js");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const authRouter = require("./routes/auth.route.js");
const productRoutes = require("./routes/product.route.js");
const cartRoutes = require("./routes/cart.route.js");
const wishlistRoutes = require("./routes/wishlist.route.js");
const paymentRoutes = require("./routes/payment.routes.js");
const orderRoutes = require("./routes/order.routes.js");
const contactRoutes = require("./routes/contact.routes.js");
const dashboardRoutes = require("./routes/dashboard.routes.js");
const userRoutes = require("./routes/user.routes.js");


const app = express();

app.use(cors({
    origin: [
        "https://cartify-eosin-chi.vercel.app",
        "http://localhost:5173"
    ],
    credentials: true
}))

app.use(express.json());
app.use(cookieParser())


app.use("/api/auth", authRouter);
app.use("/api/product", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/wishlist", wishlistRoutes);
app.use("/api/payment", paymentRoutes);
app.use("/api/order", orderRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/admin", userRoutes);


const PORT = process.env.PORT || 5000;

app.listen(PORT, ()=>{
    connectDB();
    console.log(`server is running on the port ${PORT}`);
})
