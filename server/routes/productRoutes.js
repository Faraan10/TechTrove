import express from "express";
import Product from "../models/Products.js";

const productRoutes = express.Router();

const getProducts = async (req, res) => {
	const products = await Product.find({});

	res.status(200).json({
		products,
		pagination: {},
	});
};

productRoutes.route("/").get(getProducts);

export default productRoutes;