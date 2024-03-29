import React from "react";
import { StarIcon } from "@chakra-ui/icons";

const Star = ({ rating = 0, star = 0 }) => {
	return (
		<div>
			<StarIcon color={rating >= star || rating === 0 ? "cyan.500" : "gray.200"} />
		</div>
	);
};

export default Star;
