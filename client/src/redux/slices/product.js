import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
	loading: false,
	error: null,
	products: [],
	product: null,
	pagination: {},
	favouritesToggled: true,
	reviewed: false,
	favourites: JSON.parse(localStorage.getItem("favourites")) ?? [], // if data present show data else empty array
};

export const productsSlice = createSlice({
	name: "products",
	initialState,
	reducers: {
		setLoading: (state) => {
			state.loading = true;
		},
		setProducts: (state, { payload }) => {
			state.loading = false;
			state.error = null;
			state.products = payload;
		},
		setProduct: (state, { payload }) => {
			state.product = payload;
			state.loading = false;
			state.error = null;
			state.reviewed = false;
		},
		setError: (state, { payload }) => {
			state.loading = false;
			state.error = payload;
		},
		setPagination: (state, { payload }) => {
			state.loading = false;
			state.error = null;
			state.pagination = payload;
		},
		setFavourites: (state, { payload }) => {
			state.favourites = payload;
		},
		setFavouritesToggle: (state, { payload }) => {
			state.favouritesToggled = payload;
		},
	},
});

export const { setLoading, setError, setProducts, setPagination, setFavourites, setFavouritesToggle, setProduct } =
	productsSlice.actions;

export default productsSlice.reducer;

export const productSelector = (state) => state.products;
