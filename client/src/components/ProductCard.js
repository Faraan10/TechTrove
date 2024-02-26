import React, { useState, useEffect } from "react";
import { Box, Image, Text, Badge, Flex, IconButton, Skeleton, useToast, Tooltip } from "@chakra-ui/react";
import { BiExpand } from "react-icons/bi";
import { addToFavourites, removeFromFavourites } from "../redux/actions/productActions";
import { useSelector, useDispatch } from "react-redux";
import { MdOutlineFavorite, MdOutlineFavoriteBorder } from "react-icons/md";
import { Link } from "react-router-dom";
import { addCartItem } from "../redux/actions/cartActions";
import { TbShoppingCartPlus } from "react-icons/tb";

const ProductCard = ({ product, loading }) => {
	const [isShown, setIsShown] = useState(false);
	const { favourites } = useSelector((state) => state.product);
	const dispatch = useDispatch();
	const { cartItems } = useSelector((state) => state.cart);
	const toast = useToast();
	const [cartPlusDisabled, setCartPlusDisabled] = useState(false);

	useEffect(() => {
		const item = cartItems.find((cartItem) => cartItem.id === product._id);
		if (item && item.qty === product.stock) {
			setCartPlusDisabled(true);
		}
	}, [product, cartItems]);

	const addItem = (id) => {
		if (cartItems.some((cartItem) => cartItem.id === id)) {
			const item = cartItems.find((cartItem) => cartItem.id === id);
			dispatch(addCartItem(id, item.qty + 1));
		} else {
			dispatch(addCartItem(id, 1));
		}
		toast({
			description: "Item has been added.",
			status: "success",
			isClosable: true,
		});
	};
	return (
		<Skeleton isLoaded={!loading}>
			<Box
				_hover={{ transform: "scale(1.1)", transitionDuration: "0.5s" }}
				borderWidth="1px"
				overflow="hidden"
				p="4"
				shadow="md"
			>
				<Image
					onMouseOver={() => setIsShown(true)}
					onMouseOut={() => setIsShown(false)}
					src={product.images[isShown && product.images.length === 2 ? 1 : 0]}
					fallbackSrc="https://via.placeholder.com/150"
					alt={product.name}
					height="170px"
				/>
				{product.stock < 5 ? (
					<Badge colorScheme="yellow">only {product.stock} left</Badge>
				) : product.stock < 1 ? (
					<Badge colorScheme="red">Sold Out</Badge>
				) : (
					<Badge colorScheme="green">In stock</Badge>
				)}
				{product.productIsNew && (
					<Badge ml="2" colorScheme="purple">
						new
					</Badge>
				)}
				<Text noOfLines={1} fontSize="xl" fontWeight="semibold" mt="2">
					{product.brand} {` `} {product.name}
				</Text>
				<Text noOfLines={1} fontSize="md" color="gray.600">
					{product.subtitle}
				</Text>
				<Flex justify="space-between" alignItems="center" mt="2">
					<Badge colorScheme="cyan">{product.category}</Badge>
					<Text fontSize="xl" fontWeight="semibold" color="cyan.600">
						${product.price}
					</Text>
				</Flex>
				<Flex justify="space-between" mt="2">
					{favourites.includes(product._id) ? (
						<IconButton
							icon={<MdOutlineFavorite size="20px" />}
							colorScheme="cyan"
							size="sm"
							onClick={() => dispatch(removeFromFavourites(product._id))}
						/>
					) : (
						<IconButton
							icon={<MdOutlineFavoriteBorder size="20px" />}
							colorScheme="cyan"
							size="sm"
							onClick={() => dispatch(addToFavourites(product._id))}
						/>
					)}

					<IconButton
						icon={<BiExpand size="20" />}
						as={Link}
						to={`/product/${product._id}`}
						colorScheme="cyan"
						size="sm"
					/>

					<Tooltip
						isDisabled={!cartPlusDisabled}
						hasArrow
						label={
							!cartPlusDisabled
								? "You have reached the maximum quantity of the product. "
								: product.stock <= 0
								? "Out of stock"
								: ""
						}
					>
						<IconButton
							isDisabled={product.stock <= 0 || cartPlusDisabled}
							onClick={() => addItem(product._id)}
							icon={<TbShoppingCartPlus size="20" />}
							colorScheme="cyan"
							size="sm"
						/>
					</Tooltip>
				</Flex>
			</Box>
		</Skeleton>
	);
};

export default ProductCard;
