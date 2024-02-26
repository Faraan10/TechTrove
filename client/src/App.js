import React from "react";
import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import LandingScreen from "./screens/LandingScreen";
import ProductsScreen from "./screens/ProductsScreen";
import ProductScreen from "./screens/ProductScreen";
import CartScreen from "./screens/CartScreen";
import Footer from "./components/Footer";

function App() {
	return (
		<ChakraProvider>
			<BrowserRouter>
				<Header />
				<Routes>
					<Route path="/" element={<LandingScreen />} />
					<Route path="/products" element={<ProductsScreen />} />
					<Route path="/product/:id" element={<ProductScreen />} />
					<Route path="/cart" element={<CartScreen />} />
				</Routes>
				<Footer />
			</BrowserRouter>
		</ChakraProvider>
	);
}

export default App;
