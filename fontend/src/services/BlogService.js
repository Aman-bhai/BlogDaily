export const fetchBlogs = async (token) => {
  try {
    const response = await fetch(`${process.env.REACT_APP_API_getAllblogApi}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": token,
      },
    });
    if (!response.ok) throw new Error("Failed to fetch blogs");
    return await response.json();
  } catch (error) {
    throw new Error(error.message);
  }
};

export const addBlog = async (blogData, token) => {
  try {
    const response = await fetch(`${process.env.REACT_APP_API_addBlogApi}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": token,
      },
      body: JSON.stringify(blogData),
    });
    if (!response.ok) throw new Error("Failed to add blog");
    return await response.json();
  } catch (error) {
    throw new Error(error.message);
  }
};

export const deleteBlog = async (id, token) => {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_API_deleteApi_}/${id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "auth-token": token,
        },
      }
    );
    if (!response.ok) throw new Error("Failed to delete blog");
  } catch (error) {
    throw new Error(error.message);
  }
};

export const updateBlogs = async (updatedData, token) => {
  try {
    console.log(updatedData);
    const response = await fetch(
      `${process.env.REACT_APP_API_updateApi}/${updatedData.id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "auth-token": token,
        },
        body: JSON.stringify({
          title: updatedData.title,
          blog: updatedData.blog,
        }),
      }
    );
    if (!response.ok) throw new Error("Failed to update blog");
  } catch (error) {
    throw new Error(error.message);
  }
};

export const fetchPublicBlogs = async () => {
  try {
    const response = await fetch(`${process.env.REACT_APP_API_getPublicApi_}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) throw new Error("Failed to fetch public blogs");
    return await response.json();
  } catch (error) {
    throw new Error(error.message);
  }
};

export const contactSend = async (data) => {
  try {
    const response = await fetch(`${process.env.REACT_APP_API_contactApi}`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" },
    });

    const result = await response.json();
    return result;
  } catch (error) {
    throw new Error("Failed to send contact message");
  }
};

export const loginFunc = async (credentials) => {
  try {
    const response = await fetch(`${process.env.REACT_APP_API_loginApi}`, {
      method: "POST",
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password,
      }),
      headers: { "Content-Type": "application/json" },
    });

    const result = await response.json();
    return result;
  } catch (error) {
    throw new Error("Failed to send contact message");
  }
};


export const signUpFunc = async (credentials) => {
  try {
    console.log("credentials", credentials);
    const response = await fetch(`${process.env.REACT_APP_API_signUpApi}`, {
      method: "POST",
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password,
        username: credentials.username,
      }),
      headers: { "Content-Type": "application/json" },
    })
    return response;

  } catch (error) {
    throw new Error("Failed to send contact message");
  }
};
