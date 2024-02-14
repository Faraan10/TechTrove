import React from "react";
import { ChakraProvider } from "@chakra-ui/react";
import ProductsScreen from "./screens/ProductsScreen";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";

function App() {
	return (
		<ChakraProvider>
			<BrowserRouter>
				<Header />
				<Routes>
					<Route path="/" element={<ProductsScreen />} />
				</Routes>
			</BrowserRouter>
		</ChakraProvider>
	);
}

export default App;
