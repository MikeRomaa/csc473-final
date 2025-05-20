"use client";

type LoginFormData = {
  email: string;
  password: string;
};

interface LoginFormProps {
  formData: LoginFormData;
  handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}

export const LoginForm: React.FC<LoginFormProps> = ({
  formData,
  handleInputChange,
  handleSubmit,
}) => {
  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col w-[300px] md:w-[400px] text-[#1F1F1F]"
      >
        <label className="text-2xl font-bold mb-2" htmlFor="email">
          Email
        </label>
        <input
          className="border-2 border-jetBlack bg-lightBlue p-2 pl-4 rounded-lg mb-5"
          id="email"
          name="email"
          type="email"
          placeholder="Enter your email"
          value={formData.email}
          onChange={handleInputChange}
          required
        />
        <label className="text-2xl font-bold mb-2" htmlFor="password">
          Password
        </label>
        <input
          className="border-2 border-[#1F1F1F] text-[#1F1F1F] bg-lightBlue p-2 pl-4 rounded-lg mb-5"
          id="password"
          name="password"
          type="password"
          placeholder="Enter your password"
          value={formData.password}
          onChange={handleInputChange}
          required
        />
        <button className="w-full mt-3 h-14 flex justify-center items-center rounded-md text-white bg-[#091834] transition-colors duration-300 ">
          <p className="font-bold text-base md:text-xl">Log In</p>
        </button>
      </form>
    </div>
  );
};
