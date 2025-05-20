"use client";

import { SignupFormData } from "../types";

interface SignupFormProps {
  formData: SignupFormData;
  handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}

const SignupForm: React.FC<SignupFormProps> = ({
  formData,
  handleInputChange,
  handleSubmit,
}) => {
  return (
    <div className="bg-[#E4EDF1] flex w-full h-screen items-center justify-center flex-col">
      <div className="text-5xl font-bold text-[#1F1F1F] pb-4 text-center mb-10">
        Sign Up
      </div>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col w-[300px] md:w-[400px] text-[#1F1F1F]"
      >
        <label className="text-2xl font-bold mb-2" htmlFor="firstName">
          First Name
        </label>
        <input
          className="border-2 border-[#1F1F1F] bg-lightBlue p-2 pl-4 rounded-lg mb-5"
          id="firstName"
          name="firstName"
          type="text"
          placeholder="Enter your first name"
          value={formData?.firstName}
          onChange={handleInputChange}
          required
        />
        <label className="text-2xl font-bold mb-2" htmlFor="lastName">
          Last Name
        </label>
        <input
          className="border-2 border-[#1F1F1F] bg-lightBlue p-2 pl-4 rounded-lg mb-5"
          id="lastName"
          name="lastName"
          type="text"
          placeholder="Enter your last name"
          value={formData?.lastName}
          onChange={handleInputChange}
          required
        />

        <label className="text-2xl font-bold mb-2" htmlFor="email">
          Email
        </label>
        <input
          className="border-2 border-[#1F1F1F] bg-lightBlue p-2 pl-4 rounded-lg mb-5"
          id="email"
          name="email"
          type="email"
          placeholder="Enter your email"
          autoComplete="username"
          value={formData?.email}
          onChange={handleInputChange}
          required
        />
        <label className="text-2xl font-bold mb-2" htmlFor="password">
          Password
        </label>
        <input
          className="border-2 border-[#1F1F1F] bg-lightBlue p-2 pl-4 rounded-lg mb-5"
          id="password"
          name="password"
          type="password"
          placeholder="Create a password"
          autoComplete="new-password"
          value={formData?.password}
          onChange={handleInputChange}
          required
        />
        <label className="text-2xl font-bold mb-2" htmlFor="password">
          Confirm Password
        </label>
        <input
          className="border-2 border-[#1F1F1F] bg-lightBlue p-2 pl-4 rounded-lg mb-5"
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          placeholder="Confirm password"
          autoComplete="new-password"
          value={formData?.confirmPassword}
          onChange={handleInputChange}
          required
        />
        <button className=" w-full mt-3 h-14 flex justify-center items-center rounded-md bg-[#091834] text-[#E4EDF1]">
          <p className="font-bold text-base md:text-xl">Next</p>
        </button>
      </form>
    </div>
  );
};
export default SignupForm;
