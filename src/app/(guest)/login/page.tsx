"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { login } from "./action";
import { LoginForm } from "./_components/loginForm";
import toast from "react-hot-toast";

type LoginFormData = {
  email: string;
  password: string;
};

export default function Login() {
  console.log("here");
  const router = useRouter();
  const [formData, setFormData] = useState<LoginFormData>({
    email: "",
    password: "",
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formObj = new FormData();
    formObj.append("email", formData.email);
    formObj.append("password", formData.password);

    try {
      const info = await login(formObj);
      console.log("got info");
      if (info.data?.id) {
        toast.success("Sucessfully logged in.", {
          duration: 3000,
        });
        console.log("info");
        setTimeout(() => {
          router.push("/home");
        }, 500);
      } else {
        console.log(info);
        toast.error("Error logging in, please double check credentials.", {
          duration: 3500,
        });
      }
    } catch (error) {
      toast.error("Something went wrong: " + String(error), { duration: 2000 });
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div className="bg-lightBlue min-h-screen flex flex-col gap-6 justify-center items-center">
      <div className="text-5xl font-bold text-[#1F1F1F]">Log In</div>
      <LoginForm
        formData={formData}
        handleInputChange={handleInputChange}
        handleSubmit={handleSubmit}
      />
    </div>
  );
}
