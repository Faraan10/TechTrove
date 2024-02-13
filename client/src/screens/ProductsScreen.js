import React, { useState, useEffect } from "react";
import { Box, Center, Wrap, WrapItem } from "@chakra-ui/react";
import axios from "axios";
import ProductCard from "../components/ProductCard";
import { useSelector, useDispatch } from "react-redux";
import { getProducts } from "../redux/actions/productActions";

const ProductsScreen = () => {
	const { loading, error, products, pagination } = useSelector((state) => state.product);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getProducts());
	}, [dispatch]);
	return (
		<>
			{products.length > 1 && (
				<Box>
					<Wrap spacing="30px" justify="center" minHeight="80vh" mx={{ base: "12", md: "20", lg: "32" }}>
						{products.map((product) => (
							<WrapItem key={product._id}>
								<Center w="250px" h="450px">
									{/* looping for each product */}
									<ProductCard product={product} loading={loading} />
								</Center>
							</WrapItem>
						))}
					</Wrap>
				</Box>
			)}
		</>
	);
};

export default ProductsScreen;
