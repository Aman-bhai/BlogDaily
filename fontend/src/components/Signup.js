import React, { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, Link } from "react-router-dom";
import { signUpFunc } from "../services/BlogService";

const Signup = () => {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
    username: "",
  });
  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await signUpFunc(credentials)
      console.log(response)
      const json = await response.json();
      console.log(json)

      if (response.ok) {
        toast.success("SignUp Success");
        localStorage.setItem("token", json.authToken);
        setCredentials({ email: "", password: "", username: "" });
        navigate("/");
      } else {
        toast.error(json.error || "SignUp Failed");
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.");
      console.error("Error:", error);
    }
  };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
      <img
          className="mx-auto h-10 w-auto"
          src="/blogdaily.png"
          alt="Your Company"
        />
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-200">
          Sign Up to your account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" method="POST" onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium leading-6 text-gray-200"
            >
              Username
            </label>
            <div className="mt-2">
              <input
                id="username"
                name="username"
                type="text"
                autoComplete="username"
                required
                className="block w-full font-bold rounded-md border-0 py-1.5 text-gray-700 shadow-sm ring-1 ring-inset ring-gray-600 placeholder:text-gray-800 focus:ring-2 focus:ring-inset focus:ring-red-600 sm:text-sm sm:leading-6 px-5"
                value={credentials.username}
                onChange={onChange}
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium leading-6 text-gray-200"
            >
              Email address
            </label>
            <div className="mt-2">
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="block w-full font-bold rounded-md border-0 py-1.5 text-gray-700 shadow-sm ring-1 ring-inset ring-gray-600 placeholder:text-gray-800 focus:ring-2 focus:ring-inset focus:ring-red-600 sm:text-sm sm:leading-6 px-5"
                value={credentials.email}
                onChange={onChange}
              />
            </div>
          </div>
          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-6 text-gray-200"
              >
                Password
              </label>
            </div>
            <div className="mt-2">
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="block w-full font-bold rounded-md border-0 py-1.5 text-gray-700 shadow-sm ring-1 ring-inset ring-gray-800 placeholder:text-gray-600 focus:ring-2 focus:ring-inset focus:ring-red-600 sm:text-sm sm:leading-6 px-5"
                value={credentials.password}
                onChange={onChange}
              />
            </div>
          </div>

          <div className="flex w-full justify-center rounded-md bg-red-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-red-900">
            <button type="submit" className="w-full">
              Sign Up
            </button>
          </div>
        </form>

        <p className="mt-10 text-center text-sm text-gray-500">
          Sign In{" "}
          <Link
            to="/login"
            className="font-semibold leading-6 text-red-600 hover:text-red-500"
          >
            Already Have an Account?
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
