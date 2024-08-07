import React, { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, Link } from "react-router-dom";
import { loginFunc } from "../services/BlogService";

const Login = () => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const promise = new Promise(async (resolve, reject) => {
      try {
        let response = await loginFunc(credentials);

        if (response.authToken) {
          localStorage.setItem("token", response.authToken);
          resolve();
          navigate("/");
        } else {
          reject(new Error(response.error || "Login failed"));
        }
      } catch (error) {
        console.error("Error during login:", error);
        reject(error);
      }
    });

    await toast.promise(promise, {
      loading: "Loading...",
      success: "Login Success",
      error: (err) => err.message || "An unexpected error occurred",
    });

    setCredentials({ email: "", password: "" });
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
          Sign in to your account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form
          className="space-y-6"
          action="#"
          method="POST"
          onSubmit={handleSubmit}
        >
          <div>
            <label
              for="email"
              className="block text-sm font-medium leading-6 text-gray-200"
            >
              Email address
            </label>
            <div className="mt-2">
              <input
                id="email"
                name="email"
                type="email"
                autocomplete="email"
                required
                className="block w-full  font-bold rounded-md border-0 py-1.5 text-gray-700 shadow-sm ring-1 ring-inset ring-gray-600 placeholder:text-gray-800 focus:ring-2 focus:ring-inset focus:ring-red-600 sm:text-sm sm:leading-6 px-5"
                value={credentials.email}
                onChange={onChange}
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label
                for="password"
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
                autocomplete="current-password"
                required
                className="block w-full font-bold rounded-md border-0 py-1.5 text-gray-700 shadow-sm ring-1 ring-inset ring-gray-800 placeholder:text-gray-600 focus:ring-2 focus:ring-inset focus:ring-red-600 sm:text-sm sm:leading-6 px-5"
                value={credentials.password}
                onChange={onChange}
              />
            </div>
          </div>

          <div className="bg-red-500 rounded-md hover:bg-red-900 focus:outline-none focus:ring-2 focus:ring-red-200 transition-colors duration-200">
            <button
              type="submit"
              className="w-full text-white font-bold py-2 px-4 rounded "
            >
              Sign in
            </button>
          </div>
        </form>

        <p className="mt-10 text-center text-sm text-gray-500">
          SignUp{" "}
          <Link
            href="#"
            className="font-semibold leading-6 text-red-600 hover:text-red-500"
          >
            Don't Have Account?
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
