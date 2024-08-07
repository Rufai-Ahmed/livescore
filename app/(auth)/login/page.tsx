"use client";

import { loginInputs } from "@/public/data/data";
import { iInput } from "@/interfaces";
import Image from "next/image";
import { FormEvent, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { setToken } from "../../../public/utils/slice";
import { useRouter } from "next/navigation";
import { useLoginMutation } from "@/public/utils/authApi";

const Login = ({ setStage }: any) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<boolean | null>(null);

  const router = useRouter();
  const dispatch = useDispatch();
  const refreshToken = useSelector((state: any) => state.auth.refresh);

  const [login, { isError }] = useLoginMutation();

  useEffect(() => {
    if (isError) {
      setError(!!isError);
      toast.error("Failed to login");
    }

    if (refreshToken) {
      router.push("/");
    }
  }, [isError, refreshToken]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData(e.currentTarget);
    const data = {
      email: formData.get("email"),
      password: formData.get("password"),
    };

    try {
      const userData = await login(data).unwrap();
      dispatch(setToken(userData.refresh));
      toast.success("Admin Logged in Successfully");
      setIsLoading(false);
      router.push("/");
    } catch (err: any) {
      setError(err.message);
      toast.error("Failed to login");
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="w-full flex items-center justify-center h-screen ">
        Loading...
        <div className="loading-spinner" />
      </div>
    );
  }

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
            <b>Login</b>
            <small>Please enter your login details.</small>
          </div>
          <form onSubmit={handleSubmit} className="space-y-3">
            {loginInputs.map((el: iInput, i: number) => (
              <input
                key={i}
                type={el.type}
                required={true}
                placeholder={el.placeholder}
                name={el.name}
                className="duration-300 w-[90%] md:w-[400px] h-[40px] rounded-md border border-gray-400 outline-gray-500 pl-3"
              />
            ))}

            <button
              type="submit"
              className="w-full bg-[#a82036] rounded-md duration-300 hover:bg-[#f04e66] text-white text-[20px] font-semibold py-2 cursor-pointer"
              disabled={isLoading}
            >
              {isLoading ? "Logging in..." : "Login"}
            </button>
          </form>
          <div className="space-y-4 w-[80%] md:w-full text-[18px]">
            <small>
              For further assistance, you may visit the Help Center or contact
              our customer service team.
            </small>
          </div>
        </center>
      </section>
    </main>
  );
};

export default Login;
