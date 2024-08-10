import type { Metadata } from "next";
import { Quicksand } from "next/font/google";
import "../globals.css";
import Sidebar from "@/app/static/Sidebar";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { Provider } from "react-redux";
import Sider from "./__components/Sider";

const quick = Quicksand({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Go Market",
	description: "Revolutionizing food shopping",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={quick.className}>
				<div className=" flex">
					<Sider />
					<div className="flex-1 md:ml-64 p-3">{children}</div>
				</div>
			</body>
		</html>
	);
}
