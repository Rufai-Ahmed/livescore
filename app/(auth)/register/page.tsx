"use client";
import { inputs } from "@/public/data/data";
import Image from "next/image";
import { FormEvent, useState } from "react";
import { toast } from "react-toastify";
import { useRegisterMutation } from "@/public/utils/authApi";
import { API_URL } from "@/public/utils/constant";
import { useRouter } from "next/navigation";

const RegisterForm = ({ setStage }: any) => {
	const router = useRouter();

	const [register, { isLoading, isError, error }]: any =
		useRegisterMutation();

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const formData = new FormData(e.currentTarget);
		const data = {
			username: formData.get("email"),
			password: formData.get("password"),
		};

		try {
			const userData = await register(data)
				.unwrap()
				.then((res: any) => res?.admin && router.push("/login"));

			console.log("User Data:", userData);
		} catch (err) {
			console.error("Failed to register:", err);
			toast(err as any);
		}
	};

	if (isLoading)
		return (
			<div className="w-full flex items-center justify-center ">
				Loading...
				<div className="loading-spinner loader" />
			</div>
		);
	if (error) return <div>Error: {error.message}</div>;

	return (
		<main className="w-full h-screen flex justify-center items-center">
			<section className="md:w-[400px] w-[90%] h-full flex flex-col justify-center">
				<center className="text-center w-full h-[90%] flex flex-col items-center justify-between">
					<div className="w-full flex items-center flex-col text-[20px] space-y-3">
						<div className="w-[80px] h-[80px] flex items-center justify-center rounded-full border-4 border-gray-300 bg-[#ffffff]">
							<Image
								alt="Tundra Logo"
								height={100}
								width={100}
								className="w-[35px] object-contain h-[35px]"
								src={"/assets/go.jpg"}
							/>
						</div>
						<b>Personal Details</b>
						<small>We just need you to fill in some details.</small>
					</div>
					<form
						onSubmit={handleSubmit}
						className="space-y-3"
					>
						{inputs.map((el: any, i: number) => (
							<input
								key={i}
								type={el.type}
								required={true}
								placeholder={el.placeholder}
								name={el?.name}
								className="duration-300 w-[90%] md:w-[400px] h-[40px] rounded-md border border-gray-400 outline-gray-500 pl-3"
							/>
						))}

						<button
							type="submit"
							className="w-full bg-[#a82036] rounded-md duration-300 hover:bg-[#f04e66] text-white text-[20px] font-semibold py-2 cursor-pointer"
							disabled={isLoading}
						>
							{isLoading ? "Registering..." : "Register"}
						</button>
					</form>
					<div className="space-y-4 w-[80%] md:w-full text-[18px]">
						<small>
							For further, you may visit the Help Center or contact
							our customer service team.
						</small>
					</div>
				</center>
			</section>
		</main>
	);
};

export default RegisterForm;
