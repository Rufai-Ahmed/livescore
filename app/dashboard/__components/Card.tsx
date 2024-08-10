import React from "react";
import { BiTrendingUp } from "react-icons/bi";

interface CardProps {
	title: string;
	content: string;
}

const Card: React.FC<CardProps> = ({ title, content }) => (
	<div className="bg-white col-span-2 lg:col-span-1 p-4 rounded-lg shadow-md flex gap-5 items-center">
		<BiTrendingUp
			size={25}
			color="red"
		/>
		<div>
			<h3 className="text-[12px] font-semibold">{title}</h3>
			<p className="text-[20px] font-bold">{content}</p>
		</div>
	</div>
);

export default Card;
