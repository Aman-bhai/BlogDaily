
import React from 'react';
import { Link } from 'react-router-dom';

const About = () => {
    return (
        <div className="bg-black text-white min-h-screen py-10 px-5">
            <header className="text-center mb-8">
                <h1 className="text-3xl font-bold mb-4">About BlogDaily</h1>
                <p className="text-lg">BlogDaily is your go-to platform for reading, writing, and managing blogs. Here’s what you can do:</p>
            </header>

            <div className="space-y-10">
                <section className="text-center">
                    <h2 className="text-2xl font-semibold mb-4">Read Blogs</h2>
                    <p className="mb-4">Explore a wide variety of blogs on different topics. Our platform provides an easy-to-use interface for reading and enjoying blog content.</p>
                    <img src="/blog.png" alt="Read Blogs" className="w-32 mx-auto mb-4" />
                    <Link to="/publicBlogs" className="bg-red-500 hover:bg-red-900 text-white font-bold py-2 px-4 rounded">
                        Explore Public Blogs
                    </Link>
                </section>

                <section className="text-center">
                    <h2 className="text-2xl font-semibold mb-4">Write Blogs</h2>
                    <p className="mb-4">Share your thoughts and ideas with the world by writing your own blogs. Our platform makes it easy to publish and manage your content.</p>
                    <img src="/blogging.png" alt="Write Blogs" className="w-32 mx-auto mb-4" />
                    <Link to="/" className="bg-red-500 hover:bg-red-900 text-white font-bold py-2 px-4 rounded">
                        Write a New Blog
                    </Link>
                </section>

                <section className="text-center">
                    <h2 className="text-2xl font-semibold mb-4">Update Blogs</h2>
                    <p className="mb-4">Easily update your existing blog posts. Our platform provides a straightforward way to edit and refine your content.</p>
                    <img src="/blogdaily.png" alt="Update Blogs" className="w-32 mx-auto mb-4" />
                    <Link to="/Blogs" className="bg-red-500 hover:bg-red-900 text-white font-bold py-2 px-4 rounded">
                        Update Your Blogs
                    </Link>
                </section>

                <section className="text-center">
                    <h2 className="text-2xl font-semibold mb-4">Delete Blogs</h2>
                    <p className="mb-4">Remove any blog posts that are no longer relevant or needed. Our platform ensures that the process is quick and simple.</p>
                    <img src="/social.png" alt="Delete Blogs" className="w-32 mx-auto mb-4" />
                    <Link to="/Blogs" className="bg-red-500 hover:bg-red-900 text-white font-bold py-2 px-4 rounded">
                        Manage Your Blogs
                    </Link>
                </section>
            </div>
        </div>
    );
};

export default About;
