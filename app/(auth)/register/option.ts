"use server";
import { FormEvent } from "react";

export const handleSubmit = async (
  e: FormEvent<HTMLFormElement>,
  register: any
) => {
  e.preventDefault();
  const formData = new FormData(e.currentTarget);
  const data = {
    firstName: formData.get("firstName"),
    lastName: formData.get("lastName"),
    email: formData.get("email"),
    number: formData.get("number"),
    prefix: formData.get("prefix"),
  };

  try {
    const userData = await register(data).unwrap();
    localStorage.setItem("authToken", userData.token);

    console.log("User Data:", userData);
  } catch (err) {
    console.error("Failed to register:", err);
  }
};
