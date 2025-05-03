import React, { useEffect, useState } from 'react'
import logo from "../../assets/Logo/Logo-Full-Light.jpg"
import { Link } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import { matchPath } from 'react-router-dom'
// data for navbar
import { NavbarLinks } from '../../data/navbar-link'
import { useSelector } from 'react-redux'
import { AiOutlineShoppingCart } from 'react-icons/ai'
import ProfileDropdown from '../core/HomePage/Auth/ProfileDropDown'
import apiConnector from '../../services/apiconnector'
import { categories } from '../../services/apis'
import { IoIosArrowDown } from "react-icons/io"
import { RxHamburgerMenu } from "react-icons/rx"

const Navbar = () => {
    const location = useLocation();

    const matchRoute = (route) => {
        return matchPath({ path: route }, location.pathname);
    };

    const { token } = useSelector((state) => state.auth);
    const { user } = useSelector((state) => state.profile);
    const { cart, totalItems } = useSelector((state) => state.cart);  // Fixed typo from totalItema

    const [subLinks, setSubLinks] = useState([]);

    const fetchSublinks = async () => {
        try {
            const result = await apiConnector("GET", categories.CATEGORIES_API);
            setSubLinks(result?.data?.data || []);
        } catch (error) {
            console.log("Could not fetch the category list");
        }
    };

    useEffect(() => {
        fetchSublinks();
    }, []);

    return (
        <div className='flex h-14 items-center justify-center border-b-[1px] border-b-gray-700'>
            <div className='flex w-9/12 max-w-maxContent items-center justify-between'>

                {/* Logo */}
                <Link to="/">
                    <img src={logo} width={160} height={42} loading='lazy' />
                </Link>

                {/* Navbar Links */}
                <nav>
                    <ul className='hidden md:flex gap-x-6 text-gray-100'>
                        {NavbarLinks.map((link, index) => (
                            <li key={index}>
                                {link.title === "Catalog" ? (
                                    <div className='relative flex items-center gap-2 group'>
                                        <p>{link.title}</p>
                                        <IoIosArrowDown />
                                        <div className={`invisible absolute left-[50%] 
                                            translate-x-[-49%] 
                                            ${Array.isArray(subLinks) && subLinks.length > 0 ? "translate-y-[15%]" : "translate-y-[40%]"} 
                                            top-[80%] z-50 
                                            flex flex-col rounded-md bg-white p-4 text-gray-900
                                            opacity-0 transition-all duration-200 group-hover:visible
                                            group-hover:opacity-100 lg:w-[300px]`}>

                                            <div className='absolute left-[50%] top-0 translate-x-[70%] translate-y-[-10%] h-6 w-6 rotate-45 rounded bg-white'></div>

                                            {subLinks.length > 0 ? (
                                                subLinks.map((subLink, index) => (
                                                    <Link
                                                        className='rounded-lg bg-transparent py-4 pl-4 hover:bg-richblack-50'
                                                        to={`/catalog/${subLink.name}`}
                                                        key={index}
                                                    >
                                                        <p>{subLink.name}</p>
                                                    </Link>
                                                ))
                                            ) : (
                                                <span className="loader">Loading...</span>
                                            )}
                                        </div>
                                    </div>
                                ) : (
                                    <Link to={link?.path}>
                                        <p className={`${matchRoute(link?.path) ? "text-yellow-100" : "text-gray-100"}`}>
                                            {link.title}
                                        </p>
                                    </Link>
                                )}
                            </li>
                        ))}
                    </ul>
                </nav>

                {/* User Section */}
                <div className='flex items-center'>
                    {/* Cart */}
                    {user && user?.accountType !== "Instructor" && (
                        <Link to="/dashboard/cart" className='relative pr-2'>
                            <AiOutlineShoppingCart className='text-2xl text-gray-100' />
                            {totalItems > 0 && (
                                <span className='absolute -bottom-2 -right-0 grid h-5 w-5 place-items-center overflow-hidden rounded-full bg-gray-600 text-center text-xs font-bold text-yellow-100'>
                                    {totalItems}
                                </span>
                            )}
                        </Link>
                    )}

                    {/* Auth Buttons */}
                    {token === null && (
                        <>
                            <Link to="/login">
                                <button className='border border-gray-700 bg-gray-800 px-[12px] py-[8px] ml-5 mr-3 text-gray-100 rounded-md'>
                                    Log in
                                </button>
                            </Link>
                            <Link to="/signup">
                                <button className='border border-gray-700 bg-gray-800 px-[12px] py-[8px] text-gray-100 rounded-md'>
                                    Sign Up
                                </button>
                            </Link>
                        </>
                    )}

                    {/* Profile */}
                    {token !== null && <ProfileDropdown />}
                </div>
            </div>
        </div>
    );
};

export default Navbar;