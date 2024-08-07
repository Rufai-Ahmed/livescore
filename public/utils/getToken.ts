import { store } from "@/public/utils/store";
import { useSelector } from "react-redux";
export const getToken = () => {
	const state = JSON.parse(localStorage.getItem("token")!);

	return state;
};
