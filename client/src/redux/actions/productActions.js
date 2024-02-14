import {
	setProducts,
	setLoading,
	setError,
	setPagination,
	setFavourites,
	setFavouritesToggle,
} from "../slices/product";
import axios from "axios";

export const getProducts = (page, favouriteToggle) => async (dispatch) => {
	dispatch(setLoading());
	try {
		const { data } = await axios.get(`http://localhost:5000/api/products/${page}/${10}`);
		const { products, pagination } = data;
		dispatch(setProducts(products));
		dispatch(setPagination(pagination));
	} catch (error) {
		dispatch(
			setError(
				error.response && error.response.data.message
					? error.message.data.message
					: error.message
					? error.message
					: "An unexpected error has occoured. Please try again later."
			)
		);
	}
};

export const addToFavourites = (id) => async (dispatch, getState) => {
	const {
		product: { favourites },
	} = getState();

	const newFavourites = [...favourites, id];
	localStorage.setItem("favourites", JSON.stringify(newFavourites));
	dispatch(setFavourites(newFavourites));
};

export const removeFromFavourites = (id) => async (dispatch, getState) => {
	const {
		product: { favourites },
	} = getState();

	const newFavourites = favourites.filter((favouriteId) => favouriteId !== id);
	localStorage.setItem("favourites", JSON.stringify(newFavourites));
	dispatch(setFavourites(newFavourites));
};

export const toggleFavourites = (toggle) => async (dispatch, getState) => {
	const {
		product: { favourites, products },
	} = getState();

	if (toggle) {
		const filteredProducts = products.filter((product) => favourites.includes(product._id));
		dispatch(setFavouritesToggle(toggle));
		dispatch(setProducts(filteredProducts));
	} else {
		dispatch(setFavouritesToggle(false));
		dispatch(getProducts(1));
	}
};
