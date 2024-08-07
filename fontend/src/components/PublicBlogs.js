import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { fetchPublicBlogs } from '../services/BlogService'; 
import Card from './BlogCard'; 

const AllBlogs = () => {

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleString();
      };

    const [blogs, setBlogs] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadBlogs = async () => {
            try {
                setIsLoading(true);
                toast.dismiss(); 
                const data = await  fetchPublicBlogs();
                setBlogs(data);
            } catch (error) {
                setError(error.message);
                toast.error(error.message); 
            } finally {
                setIsLoading(false);
            }
        };

        loadBlogs();
    }, []);

    return (
        <div>
            <h2 className="text-2xl text-red-500 text-center mt-10 mb-5 font-semibold">
                Public Blogs
            </h2>
            {isLoading ? (
                <p className="text-white">Loading...</p>
            ) : error ? (
                <p className="text-red-500">{error}</p>
            ) : blogs.length === 0 ? (
                <p className="text-white text-center">No blogs available</p>
            ) : (
                <div className="flex flex-wrap px-10 space-x-5 font-semibold space-y-5 justify-center mb-24">
                    <div></div>
                    {blogs.map((item) => (
                         <Card
                         blog={item.blog}
                         title={item.title}
                         id={item._id}
                         date={formatDate(item.date)} 
                         key={item._id}
    
                         showButtons={false}
                       />
                    ))}
                </div>
            )}
        </div>
    );
};

export default AllBlogs;
