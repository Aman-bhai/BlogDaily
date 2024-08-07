import React, { useState } from "react";
import { Link } from "react-router-dom";
import FacebookRoundedIcon from "@mui/icons-material/FacebookRounded";
import GitHubIcon from "@mui/icons-material/GitHub";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import toast from "react-hot-toast";
import { contactSend } from "../services/BlogService";

const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = { name, email, message };

    const promise = new Promise(async (resolve, reject) => {
      try {
        const response = await contactSend(data);
        if (response.status === "success") {
          resolve();
        } else {
          reject();
        }
      } catch {
        reject();
      }
    });

    await toast.promise(promise, {
      loading: "Sending...",
      success: "Message Successfully Sent",
      error: "Error",
    });

    setName("");
    setEmail("");
    setMessage("");
  };

  return (
    <div className="text-white">
      <section className="body-font relative">
        <div className="container px-5 py-10 mx-auto">
          <div className="flex flex-col text-center w-full mb-12">
            <h1 className="sm:text-3xl text-2xl title-font mb-4 text-red-600 font-semibold">
              Contact Us
            </h1>
            <p className="lg:w-2/3 mx-auto leading-relaxed text-base">
              We would love to hear from you! Whether you have a question,
              feedback, or just want to say hello, feel free to reach out.
            </p>
          </div>
          <div className="lg:w-1/2 md:w-2/3 mx-auto">
            <div className="flex flex-wrap -m-2">
              <div className="p-2 w-1/2">
                <div className="relative">
                  <label
                    htmlFor="name"
                    className="leading-7 text-sm text-white"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-red-500 focus:bg-white focus:ring-2 focus:ring-red-200 text-base outline-none text-gray-900 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
              </div>
              <div className="p-2 w-1/2">
                <div className="relative">
                  <label
                    htmlFor="email"
                    className="leading-7 text-sm text-white"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-red-500 focus:bg-white focus:ring-2 focus:ring-red-200 text-base outline-none text-gray-900 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>
              <div className="p-2 w-full">
                <div className="relative">
                  <label
                    htmlFor="message"
                    className="leading-7 text-sm text-white"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-red-500 focus:bg-white focus:ring-2 focus:ring-red-200 h-32 text-base outline-none text-gray-900 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                  ></textarea>
                </div>
              </div>
              <div className="p-2 w-full">
                <button
                  className="bg-red-500 hover:bg-red-900 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-red-200"
                  onClick={handleSubmit}
                >
                  Submit
                </button>
              </div>
              <div className="p-2 w-full pt-8 mt-8 border-t border-gray-200 text-center">
                <Link
                  to="mailto:amansoni18860@email.com"
                  className="text-red-500"
                >
                  amansoni18860@email.com
                </Link>
                <p className="leading-normal my-5">
                  Aman Soni
                  <br />
                  Data Analyst or Web Developer
                </p>
                <span className="inline-flex">
                  <Link to="#" className="text-gray-400 hover:text-red-500">
                    <FacebookRoundedIcon />
                  </Link>
                  <Link
                    to="#"
                    className="ml-4 text-gray-400 hover:text-red-500"
                  >
                    <TwitterIcon />
                  </Link>
                  <Link
                    to="#"
                    className="ml-4 text-gray-400 hover:text-red-500"
                  >
                    <GitHubIcon />
                  </Link>
                  <Link
                    to="#"
                    className="ml-4 text-gray-400 hover:text-red-500"
                  >
                    <InstagramIcon />
                  </Link>
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
