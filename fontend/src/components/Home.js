import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import CustomAlert from "./CustomAlert";
import Card from "./BlogCard";
import Modal from "./Modal";
import { fetchBlogs, addBlog, deleteBlog, updateBlogs } from "../services/BlogService";
import Button from "@mui/material/Button";

const HomePage = () => {
  const [newData, setNewData] = useState({ title: "", blog: "" });
  const [blogList, setBlogList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [currentBlog, setCurrentBlog] = useState(null);
  const [modalMode, setModalMode] = useState("read");
  const [alertMessage, setAlertMessage] = useState("");

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString();
  };

  useEffect(() => {
    const loadBlogs = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setAlertMessage("Please log in to fetch your blogs");
        return;
      }

      try {
        setIsLoading(true);
        const blogs = await fetchBlogs(token);
        setBlogList(blogs.slice(0, 5));
      } catch (error) {
        toast.error("Failed to fetch blogs");
      } finally {
        setIsLoading(false);
      }
    };
    loadBlogs();
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setNewData((prevValue) => ({
      ...prevValue,
      [name]: value,
    }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    const { title, blog } = newData;

    if (!title || !blog) {
      toast.error("Please fill out all fields");
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      setAlertMessage("Please log in to add a blog");
      return;
    }

    try {
      const newBlog = { title, blog };
      setIsLoading(true);
      const addedBlog = await addBlog(newBlog, token);
      setBlogList((prevBlogs) => [addedBlog, ...prevBlogs].slice(0, 5));
      setNewData({ title: "", blog: "" });
      toast.success("Blog successfully added");
    } catch (error) {
      toast.error("Failed to add blog");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const token = localStorage.getItem("token");
    if (!token) {
      setAlertMessage("Please log in to delete a blog");
      return;
    }

    try {
      await deleteBlog(id, token);
      setBlogList((prevBlogs) => prevBlogs.filter((blog) => blog._id !== id));
      toast.success("Blog deleted successfully");
    } catch (error) {
      toast.error("Failed to delete blog");
    }
  };

  const handleUpdate = (blog) => {
    setCurrentBlog(blog);
    setModalMode("update");
    setShowModal(true);
  };

  const handleRead = (blog) => {
    setCurrentBlog(blog);
    setModalMode("read");
    setShowModal(true);
  };

  const handleUpdateBlog = async (updatedData) => {
    const token = localStorage.getItem("token");
    if (!token) {
      setAlertMessage("Please log in to update a blog");
      return;
    }

    try {
      if (!updatedData.id) {
        console.error("ID is missing in updatedData");
        return;
      }
      await updateBlogs(updatedData, token);
      setBlogList((prevBlogs) =>
        prevBlogs.map((blog) =>
          blog._id === updatedData.id
            ? { ...blog, title: updatedData.title, blog: updatedData.blog }
            : blog
        )
      );
      toast.success("Blog updated successfully");
      setShowModal(false);
    } catch (error) {
      toast.error(`Failed to update blog: ${error.message}`);
    }
  };

  const handleAlertClose = () => {
    setAlertMessage("");
  };

  return (
    <>
      <div>
        <h2 className="text-2xl text-red-500 text-center mt-10 mb-5 font-semibold">
          Add a New Blog
        </h2>
        <form className="d:w-1/3 mx-auto h-fit w-[70%] sm:w-[60%]">
          <label
            htmlFor="title"
            className="text-sm font-medium leading-6 text-white mt-2"
          >
            Title
          </label>
          <div className="mt-2">
            <input
              type="text"
              name="title"
              id="title"
              autoComplete="title"
              className="block border-0 w-full py-1.5 pl-2 rounded-md text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-600 sm:text-sm sm:leading-6 outline-none"
              placeholder="Title (minlength should be 5)"
              value={newData.title}
              onChange={handleChange}
            />
          </div>
          <label
            htmlFor="blog"
            className="block text-sm font-medium leading-6 text-white mt-2"
          >
            Description
          </label>
          <div className="mt-2">
            <textarea
              id="blog"
              name="blog"
              rows="3"
              className="block w-full rounded-md border-0 py-1.5 pl-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-600 sm:text-sm sm:leading-6 outline-none"
              placeholder="Description  (minlength should be 5)..."
              value={newData.blog}
              onChange={handleChange}
            ></textarea>
          </div>

          <Button
            variant="contained"
            className="mt-5"
            color={"warning"}
            onClick={handleClick}
            sx={{ mt: 2 }}
            disabled={isLoading}
          >
            {isLoading ? "Adding..." : "Add Blog"}
          </Button>
        </form>
        <h2 className="text-2xl text-red-500 text-center font-semibold mt-24 mb-5">
          Latest Blogs
        </h2>
        <div className="flex flex-wrap px-10 space-x-5 font-semibold space-y-5 justify-center mb-24">
          <div></div>
          {isLoading ? (
            <p className="text-white">Loading...</p>
          ) : blogList.length === 0 ? (
            <p className="text-white text-center">No blogs available</p>
          ) : (
            blogList.map((item) => (
              <Card
                blog={item.blog}
                title={item.title}
                id={item._id}
                date={formatDate(item.date)} 
                key={item._id}
                onDelete={handleDelete}
                onEdit={handleUpdate}
                onReadMore={handleRead}
              />
            ))
          )}
        </div>
      </div>

      {showModal && (
        <Modal
          blogData={currentBlog}
          setModel={() => setShowModal(false)}
          updateBlogs={modalMode === "update" ? handleUpdateBlog : handleRead}
          showModal={showModal}
          mode={modalMode}
        />
      )}

      {alertMessage && (
        <CustomAlert
          message={alertMessage}
          onClose={handleAlertClose}
        />
      )}
    </>
  );
};

export default HomePage;
