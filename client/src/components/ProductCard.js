import React, { useState } from "react";
import { Box, Image, Text, Badge, Flex, IconButton, Skeleton } from "@chakra-ui/react";
import { BiExpand } from "react-icons/bi";
import { addToFavourites, removeFromFavourites } from "../redux/actions/productActions";
import { useSelector, useDispatch } from "react-redux";
import { MdOutlineFavorite, MdOutlineFavoriteBorder } from "react-icons/md";
import { Link } from "react-router-dom";

const ProductCard = ({ product, loading }) => {
	const [isShown, setIsShown] = useState(false);
	const { favourites } = useSelector((state) => state.product);
	const dispatch = useDispatch();
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
				</Flex>
			</Box>
		</Skeleton>
	);
};

export default ProductCard;
