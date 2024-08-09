// src/pages/DashboardPage.jsx
import Dashboard from "@/app/dashboard/__components/Dashboard";
import Sidebar from "@/component/Sidebar";
import React from "react";
import { AiOutlineBell, AiOutlineDashboard } from "react-icons/ai";
import { BsCurrencyDollar } from "react-icons/bs";
import { IoMdPeople } from "react-icons/io";
import Sider from "./__components/Sider";

const DashboardPage = () => {
	return (
		<div className=" min-h-screen flex">
			<Dashboard />
		</div>
	);
};

export default DashboardPage;
