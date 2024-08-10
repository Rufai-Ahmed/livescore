import type { Metadata } from "next";
import { Quicksand } from "next/font/google";
import "./globals.css";
import Sidebar from "@/app/static/Sidebar";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import AuthGuard from "./components/AuthGuard";
import { Provider } from "react-redux";
import StoreProvider from "./StoreProvider";
import Header from "./static/Header";

const quick = Quicksand({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Livescore",
	description: "Revolutionizing Online Scoreboard",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={quick.className}>
				<StoreProvider>
					<AuthGuard>
						<ToastContainer
							position="top-right"
							autoClose={5000}
							hideProgressBar={false}
							newestOnTop={false}
							closeOnClick
							theme="light"
						/>

						{children}
					</AuthGuard>
				</StoreProvider>
			</body>
		</html>
	);
}
