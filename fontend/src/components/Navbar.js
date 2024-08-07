import React, { useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'

const Navbar = () => {
    const navigate = useNavigate()
    const location = useLocation()

    useEffect(() => {
        console.log(location)
    }, [location])

    const logout = () => {
        localStorage.removeItem("token")
        navigate("/login")
    }

    return (
        <nav className='bg-slate-900 text-white flex py-5 text-md sm:text-xl px-5 justify-between items-center space-y-6 md:space-y-0 md:flex-row flex-col'>
            <div className="logo flex space-x-4 items-center cursor-pointer" onClick={() => navigate("/")}>
                <img src="/blogdaily.png" alt="BlogDaily Logo" className='w-24 md:w-28 mt-2' />
                <span className='text-lg md:text-xl font-bold hidden-on-medium'>BlogDaily</span>
            </div>
            <ul className='flex flex-wrap space-x-4 items-center'>
                <li>
                    <Link to="/" className={`cursor-pointer hidden-on-medium hover:text-red-500 transition duration-75 ${location.pathname === "/" ? "font-bold" : ""}`}>Home</Link>
                </li>
                <li>
                    <Link to="/publicBlogs" className={`cursor-pointer hover:text-red-500 transition duration-75 ${location.pathname === "/publicBlogs" ? "font-bold" : ""}`}>All Blogs</Link>
                </li>
                <li>
                    <Link to="/Blogs" className={`cursor-pointer hover:text-red-500 transition duration-75 ${location.pathname === "/Blogs" ? "font-bold" : ""}`}>Blogs</Link>
                </li>
                <li>
                    <Link to="/about" className={`cursor-pointer hover:text-red-500 transition duration-75 ${location.pathname === "/about" ? "font-bold" : ""}`}>About us</Link>
                </li>
                <li>
                    <Link to="/contact" className={`cursor-pointer hover:text-red-500 transition duration-75 ${location.pathname === "/contact" ? "font-bold" : ""}`}>Contact us</Link>
                </li>
            </ul>
            {!localStorage.getItem("token") ? (
                <div className="flex space-x-2">
                    <Link className="bg-red-500 hover:bg-red-900 text-white font-bold py-1 px-3 rounded text-sm md:text-base" to="/login">Login</Link>
                    <Link className="bg-red-500 hover:bg-red-900 text-white font-bold py-1 px-3 rounded text-sm md:text-base" to="/signUp">SignUp</Link>
                </div>
            ) : (
                <button className="bg-red-500 hover:bg-red-900 text-white font-bold py-1 px-3 rounded text-sm md:text-base" onClick={logout}>Logout</button>
            )}
        </nav>
    )
}

export default Navbar
