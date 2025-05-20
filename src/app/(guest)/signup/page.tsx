"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import SignupForm from "./components/signupForm";
import { register } from "./actions";
import { SignupFormData } from "./types";

export default function Signup() {
  const router = useRouter();
  const [formData, setFormData] = useState<SignupFormData>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formObj = new FormData();

    formObj.append("first_name", formData.firstName);
    formObj.append("last_name", formData.lastName);
    formObj.append("email", formData.email);
    formObj.append("password", formData.password);
    formObj.append("confirmPassword", formData.confirmPassword);

    try {
      const response = await register(formObj);
      if (response.formError) {
        console.log(response.formError);
        toast.error(response.formError, { duration: 3500 });
      } else {
        toast.success("Succesfully created your account.", { duration: 3500 });
        console.log(response.data);
        setTimeout(() => {
          router.push("/home");
        }, 500);
      }
    } catch (error) {
      toast.error("Something went wrong: " + String(error), { duration: 2000 });
    }
  };

  return (
    <>
      <div className="bg-[#E4EDF1] min-h-screen flex flex-col gap-6 justify-center items-center">
        <SignupForm
          formData={formData}
          handleInputChange={handleInputChange}
          handleSubmit={handleSubmit}
        />
      </div>
    </>
  );
}
