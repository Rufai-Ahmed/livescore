import { useEffect, useState } from "react";
import moment from "moment";
import "moment/locale/en-gb";

interface ContentSection {
	title: string;
	content: JSX.Element;
}

const getDateRange = () => {
	const today = moment();
	const start = today.clone().subtract(3, "days");
	const end = today.clone().add(3, "days");
	const range = [];
	for (
		let m = start;
		m.isBefore(end) || m.isSame(end);
		m.add(1, "days")
	) {
		range.push(m.clone());
	}
	return range;
};

const contentSections: ContentSection[] = [
	{ title: "Draft", content: <div></div> },
	{ title: "Scheduled Content", content: <div></div> },
	{ title: "History", content: <div></div> },
	{ title: "Scheduled Content", content: <div></div> },
	{ title: "History", content: <div></div> },
	{ title: "Scheduled Content", content: <div></div> },
	{ title: "History", content: <div></div> },
];

const ContentSwitcher = () => {
	const [activeSection, setActiveSection] = useState<string>(
		contentSections[0].title
	);
	const [fadeIn, setFadeIn] = useState<boolean>(false);

	const handleButtonClick = (title: string) => {
		setFadeIn(false);
		setTimeout(() => {
			setActiveSection(title !== "Live" ? title : "Draft");
			setFadeIn(true);
		}, 200);
	};

	const activeContent = contentSections.find(
		(section) => section.title === activeSection
	);

	useEffect(() => {
		const timeout = setTimeout(() => {
			setFadeIn(true);
			clearTimeout(timeout);
		}, 200);
	}, []);

	const dateRange = getDateRange();

	return (
		<div className="flex flex-col">
			<div className="flex justify-between mb-4 overflow-auto">
				<button
					className={`px-4 py-2 mr-2 rounded-md bg-orange-500 text-white font-semibold `}
				>
					Live
				</button>
				{dateRange.map((date, i) => (
					<button
						key={date.format("YYYY-MM-DD")}
						className={`px-4 py-2 mr-2 rounded-md flex flex-col items-center text-gray-700 hover:bg-orange-500 hover:text-white font-semibold ${
							date.isSame(moment(), "day") ? "text-orange-500 " : ""
						}`}
						onClick={() =>
							handleButtonClick(
								contentSections[i % contentSections.length].title
							)
						}
					>
						<p className="text-[18px]">
							{date.isSame(moment(), "day")
								? "Today"
								: date.format("dddd").substring(0, 3)}
						</p>
						<div className="flex items-center gap-1 text-[14px]">
							<p>{date.format("D").substring(0, 3)}</p>
							<p>{date.format("MMM")}</p>
						</div>
					</button>
				))}
			</div>
			<div
				className={`flex-grow transition-opacity duration-200 ${
					fadeIn ? "opacity-100" : "opacity-0"
				}`}
			>
				{activeContent?.content}
			</div>
		</div>
	);
};

export default ContentSwitcher;
