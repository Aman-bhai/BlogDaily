import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  TextField,
} from "@mui/material";

const Modal = ({ blogData, setModel, updateBlogs, showModal,mode }) => {
  const [title, setTitle] = useState("");
  const [blog, setBlog] = useState("");
  console.log(mode)

  useEffect(() => {
    if (blogData) {
      console.log("blogData", blogData);
      setTitle(blogData.title || "");
      setBlog(blogData.blog || "");
    }
  }, [blogData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (title.trim() === "" || blog.trim() === "") {
      alert("Please fill out all fields");
      return;
    }

    try {
      const updatedData = { id: blogData.id, title, blog };
      let token=localStorage.getItem("token")
      console.log("updated data modal",updatedData,token)
      await updateBlogs(updatedData,token);
    } catch (error) {
      console.error("Failed to update blog:", error);
    }
  };

  return (
    <Dialog open={showModal} onClose={() => setModel()}>
      <DialogTitle className="bg-red-500 text-white">{mode==="update"?"Update Blog":"Read Blog"}</DialogTitle>
      <DialogContent className="bg-red-500 text-white">
        <form onSubmit={handleSubmit}>
          <TextField
            className="bg-white rounded-md outline-gray-200"
            autoFocus
            margin="dense"
            id="title"
            label="Title"
            type="text"
            fullWidth
            variant="outlined"
            color="success"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <TextField
            className="bg-white rounded-md"
            margin="dense"
            id="blog"
            label="Description"
            type="text"
            color="success"
            multiline
            rows={4}
            fullWidth
            variant="outlined"
            value={blog}
            onChange={(e) => setBlog(e.target.value)}
          />
          <DialogActions >
            <Button
              onClick={() => setModel()}
              className="bg-gray-300 text-red-500"
              color="warning"
              variant="contained"
            >
              Cancel
            </Button>
            {mode==="update"?( <Button
              type="submit"
              className="bg-gray-300 text-red-500"
              color="warning"
              variant="contained"
            >
              Update
            </Button>):""}
           
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default Modal;
