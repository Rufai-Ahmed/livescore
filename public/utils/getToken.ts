import { store } from "@/public/utils/store";
import { useSelector } from "react-redux";
export const getToken = () => {
	const token = JSON.parse(localStorage.getItem("token")!)?.token;

	return token;
};
