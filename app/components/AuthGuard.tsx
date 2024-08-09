"use client";
import { FC, PropsWithChildren, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Provider, useSelector } from "react-redux";
import Sidebar from "../static/Sidebar";
import { toast } from "react-toastify";
import StoreProvider from "../StoreProvider";
import Header from "../static/Header";

const AuthGuard: FC<PropsWithChildren> = ({ children }) => {
	const token = useSelector((state: any) => state.auth.refresh);

	const router = useRouter();
	const path = usePathname();

	useEffect(() => {
		if (!token) {
			const interval = setInterval(() => {
				toast.error("You're not logged in as an admin");
			}, 10000);

			if (path !== "/register") {
				router.push("/login");
			}
			return () => clearInterval(interval);
		}
	}, [router, token]);

	return (
		<div className="flex  justify-end">
			<main className={`w-full mt-14 p-6 `}>
				{token && <Header />}
				{children}
			</main>
		</div>
	);
};

export default AuthGuard;
