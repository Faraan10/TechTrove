import React, { useEffect } from "react";
import { IconButton, Box, Flex, HStack, Icon, Stack, Text, useColorModeValue, useDisclosure } from "@chakra-ui/react";
import { BsPhoneFlip } from "react-icons/bs";
import { Link } from "react-router-dom";
import { MdOutlineFavorite, MdOutlineFavoriteBorder } from "react-icons/md";
import { useSelector, useDispatch } from "react-redux";
import NavLink from "./NavLink";
import ColorModeToggle from "./ColorModeToggle";
import { BiUserCheck } from "react-icons/bi";
import { toggleFavourites } from "../redux/actions/productActions";
import { CloseIcon, HamburgerIcon } from "@chakra-ui/icons";

const Links = [
	{ name: "Products", route: "/products" },
	{ name: "Hot Deals", route: "/hot-deals" },
	{ name: "Contact", route: "/contact" },
	{ name: "Services", route: "/services" },
];

const Header = () => {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const { favouritesToggled } = useSelector((state) => state.product);
	const dispatch = useDispatch();

	useEffect(() => {}, [favouritesToggled, dispatch]);

	return (
		<>
			<Box bg={useColorModeValue("cyan.300", "gray.900")} px="4">
				<Flex h="16" alignItems="center" justifyContent="space-between">
					<Flex display={{ base: "flex", md: "none" }} alignItems="center">
						<IconButton
							bg="parent"
							size="md"
							icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
							onClick={isOpen ? onClose : onOpen}
						/>
					</Flex>
					<HStack spacing="8" alignItems="center">
						<Box alignItems="center" display="flex" as={Link} to="/">
							<Icon as={BsPhoneFlip} h="6" w="6" color={useColorModeValue("black", "yellow.200")} />
							<Text as="b">Tech Trove</Text>
						</Box>
						<HStack as="nav" spacing="1" display={{ base: "none", md: "flex" }}>
							{Links.map((link) => (
								<NavLink route={link.route} key={link.route}>
									<Text fontWeight="medium">{link.name}</Text>
								</NavLink>
							))}
							<ColorModeToggle />
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
						</HStack>
					</HStack>
					<Flex alignItems="center">
						<BiUserCheck />
					</Flex>
				</Flex>
				<Box display="flex">
					{isOpen && (
						<Box pb="4" display={{ md: "none" }}>
							<Stack as="nav" spacing="4">
								{Links.map((link) => (
									<NavLink route={link.route} key={link.route}>
										<Text fontWeight="medium">{link.name}</Text>
									</NavLink>
								))}
							</Stack>
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
							<ColorModeToggle />
						</Box>
					)}
				</Box>
			</Box>
		</>
	);
};

export default Header;
