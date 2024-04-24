# navbar-enhancer

import React, { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { FaSearch } from "react-icons/fa";
import { CgUser } from 'react-icons/cg';
import AuthService from '../../Screens/Auth/Login/AuthService';
import {FaBars } from 'react-icons/fa'


function NavBar() {
    const [showAdminLinks, setShowAdminLinks] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(AuthService.isLoggedIn());
    const [userEmail, setUserEmail] = useState('');
    const [userRoles, setUserRoles] = useState([]);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const user = AuthService.getUser();
        if (user) {
            setUserEmail(user.email);
            setUserRoles(user.roles);
        }
    }, []);

    const hasAdminRole = () => userRoles.includes('Creator');

    const handleLogout = () => {
        AuthService.logout();
        setIsLoggedIn(false);
        setUserEmail('');
        setUserRoles([]);
        window.location.href = '/categories';
    };

    return (
        <>
            <div className='bg-main shadow-md sticky top-0 z-20'>
                <div className='container mx-auto py-6 px-2 flex flex-wrap justify-between items-center'>
                    {/* Logo */}
                    <div className='flex-1'>
                        <Link to="/">
                            <img src='/images/logo.png' alt="logo" className='w-full h-12 object-contain' />
                        </Link>
                    </div>
                    {/* Mobile menu button */}
                    <button className='lg:hidden p-2' onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
                        <FaBars />
                    </button>
                    {/* Search form */}
                    <div className='flex-1 lg:flex hidden'>
                        <form className='w-full text-sm bg-dryGray rounded flex gap-4'>
                            <button type='submit' className='bg-submain w-12 flex items-center justify-center h-12 rounded text-white'>
                                <FaSearch />
                            </button>
                            <input type='text' placeholder='Search' className='font-medium placeholder:text-border text-sm w-full h-12 bg-transparent border-none px-2 text-black' />
                        </form>
                    </div>
                    {/* Menu */}
                    <div className={`flex-1 lg:flex ${isMobileMenuOpen ? 'block' : 'hidden'} lg:block`}>
                        <NavLink to="/categories" className='text-white hover:text-submain'>
                            Categories
                        </NavLink>
                        {hasAdminRole() && (
                            <NavLink to="/admin/categories"
                                className='text-white hover:text-submain'
                                onClick={() => setShowAdminLinks(!showAdminLinks)}
                            >
                                Admin
                            </NavLink>
                        )}
                        {isLoggedIn ? (
                            <div className="flex items-center">
                                <span className="mr-2 text-white">{userEmail}</span>
                                <button onClick={handleLogout} className='text-white hover:text-submain'>
                                    Logout
                                </button>
                            </div>
                        ) : (
                            <NavLink to="/login" className='text-white hover:text-submain'>
                                <CgUser className='w-8 h-8' />
                            </NavLink>
                        )}
                    </div>
                </div>
            </div>
            {/* Conditional rendering for admin links */}
            {showAdminLinks && isLoggedIn && (
                <div className="bg-white shadow-md py-2">
                    <div className="container mx-auto px-2">
                        <ul className="flex justify-center">
                            <li className="mr-4">
                                <NavLink to="/admin/categories" className="text-black hover:text-submain">Category</NavLink>
                            </li>
                            <li className="mr-4">
                                <NavLink to="/admin/video-posts" className="text-black hover:text-submain">VideoPost</NavLink>
                            </li>
                        </ul>
                    </div>
                </div>
            )}
        </>
    );
}

export default NavBar; make this code better please the fabars color should be white not black


## Collaborate with GPT Engineer

This is a [gptengineer.app](https://gptengineer.app)-synced repository 🌟🤖

Changes made via gptengineer.app will be committed to this repo.

If you clone this repo and push changes, you will have them reflected in the GPT Engineer UI.

## Tech stack

This project is built with React and Chakra UI.

- Vite
- React
- Chakra UI

## Setup

```sh
git clone https://github.com/GPT-Engineer-App/navbar-enhancer.git
cd navbar-enhancer
npm i
```

```sh
npm run dev
```

This will run a dev server with auto reloading and an instant preview.

## Requirements

- Node.js & npm - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)
