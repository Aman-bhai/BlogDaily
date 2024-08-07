import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import Card from "./BlogCard";
import Modal from "./Modal";
import { fetchBlogs, deleteBlog, updateBlogs } from "../services/BlogService";
import CustomAlert from "./CustomAlert";

const BlogPage = () => {
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
        setBlogList(blogs);
      } catch (error) {
        toast.error("Failed to fetch blogs");
      } finally {
        setIsLoading(false);
      }
    };
    loadBlogs();
  }, []);

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
        <h2 className="text-2xl text-red-500 text-center font-semibold mt-24 mb-5">
          Hey! Bloggers Your Content is Here
        </h2>
        <div className="flex flex-wrap px-10 space-x-5 font-semibold space-y-5 justify-center mb-24">
          <div></div>
          {isLoading ? (
            <p className="text-white">Loading...</p>
          ) : blogList.length === 0 ? (
            <p className="text-white">No blogs available</p>
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
        <CustomAlert message={alertMessage} onClose={handleAlertClose} />
      )}
    </>
  );
};

export default BlogPage;
