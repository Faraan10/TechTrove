import React from "react";
import { IconButton } from "@chakra-ui/react";
import { MdOutlineFavorite, MdOutlineFavoriteBorder } from "react-icons/md";
import { useSelector, useDispatch } from "react-redux";
import { toggleFavourites } from "../redux/actions/productActions";

const Header = () => {
	const { favouritesToggled } = useSelector((state) => state.product);
	const dispatch = useDispatch();

	return (
		<>
			{favouritesToggled ? (
				<IconButton
					onClick={() => dispatch(toggleFavourites(false))}
					icon={<MdOutlineFavorite size="20px" />}
					variant="ghost"
				/>
			) : (
				<IconButton
					onClick={() => dispatch(toggleFavourites(true))}
					icon={<MdOutlineFavoriteBorder size="20px" />}
					variant="ghost"
				/>
			)}
		</>
	);
};

export default Header;
