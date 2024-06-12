import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useSignup } from "../hooks/useSignup";

const eyeIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke-width="1.5"
    stroke="currentColor"
    className="w-6 h-6"
  >
    <path
      stroke-linecap="round"
      stroke-linejoin="round"
      d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
    />
    <path
      stroke-linecap="round"
      stroke-linejoin="round"
      d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
    />
  </svg>
);

const eyeOffIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke-width="1.5"
    stroke="currentColor"
    className="w-6 h-6"
  >
    <path
      stroke-linecap="round"
      stroke-linejoin="round"
      d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88"
    />
  </svg>
);

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { signup, error, isLoading } = useSignup();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await signup(email, password);
  };

  const navigate = useNavigate();

  return (
    <>
      <div className=" lg:grid  sm:flex sm:flex-1 sm:flex-col bg-[#FFE6C7] min-h-full lg:grid-cols-2 justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm lg:mt-40">
          <img className="w-auto mx-auto h-36" alt="Note Master" />
          <h2 className="mt-10 text-4xl font-bold leading-9 tracking-tight text-center text-gray-900">
            Create a new Account
          </h2>
        </div>

        <div className="mt-32 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-black"
              >
                Email address :
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  autoComplete="email"
                  required
                  className="block w-full rounded-md border-0 py-1.5 px-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#454545] sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Password :
                </label>
              </div>
              <div className="relative mt-2 rounded-md shadow-sm">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  autoComplete="current-password"
                  required
                  className="block w-full rounded-md border-0 py-1.5 px-1.5 text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#454545] sm:text-sm sm:leading-6 pr-10"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 flex items-center px-2 focus:outline-none"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? eyeOffIcon : eyeIcon}
                </button>
              </div>
            </div>

            <div>
              <button
                disabled={isLoading}
                className="flex w-full justify-center rounded-md bg-[#FF6000] px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-[#FFA559] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign Up
              </button>
            </div>
            {error && <div className="font-semibold text-red-600">{error}</div>}
            <div>
              <button
                type="reset"
                onClick={() => {
                  navigate("/");
                }}
                className="flex w-full justify-center rounded-md bg-[#454545] px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-[#807f7f] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Cancel
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-[#454545]">
            Already have an Account?{" "}
            <a
              href="/login"
              className="font-semibold ml-1 leading-6 text-[#FF6000] hover:text-[#FFA559]"
            >
              Login here
            </a>
          </p>
        </div>
      </div>
    </>
  );
};

export default Register;
