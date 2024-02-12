import express from "express";
const app = express();
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import connection from "./db.js";

// Routes
import productRoutes from "./routes/productRoutes.js";

connection();

app.use(express.json());
app.use(cors());

// localhost://5000/api/products
app.use("/api/products", productRoutes);

app.get("/", (req, res) => {
	res.send("Hello");
});

app.listen(process.env.PORT, () => {
	console.log("Listening on port", process.env.PORT);
});
