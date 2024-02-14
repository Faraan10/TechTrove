import express from "express";
import Product from "../models/Products.js";

const productRoutes = express.Router();

const getProducts = async (req, res) => {
	const page = parseInt(req.params.page); // for page number
	const perPage = parseInt(req.params.perPage); // no of items per page

	const products = await Product.find({});

	if (page && perPage) {
		const totalPages = Math.ceil(products.length / perPage);
		const startIndex = (page - 1) * perPage;
		const endIndex = startIndex + perPage;
		const paginatedProducts = products.slice(startIndex, endIndex);
		res.json({ products: paginatedProducts, pagination: { currentPage: page, totalPages } });
	} else {
		res.status(200).json({
			products,
			pagination: {},
		});
	}
};

// for users (getting an amount of products per page)
productRoutes.route("/:page/:perPage").get(getProducts);
// for admin (getting all products)
productRoutes.route("/").get(getProducts);

export default productRoutes;
