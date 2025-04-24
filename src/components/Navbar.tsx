import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

const Navbar = () => {

    const handleNavigation = (route: string): void => {
        window.location.href = route;
    };

    return (
        <>
<nav className="w-full flex items-center justify-between bg-blue-800 p-[1rem] fixed top-0 z-50 h-[10vh]">
    <img
        src="/src/assets/logo.svg"
        alt="Logo"
        className="h-full cursor-pointer"
        onClick={() => window.location.href = '/'}
    />

    <div className="flex items-center gap-4 h-full">
        <img
            src="/src/assets/shopping_cart.svg"
            alt="Cart"
            className="h-full cursor-pointer"
            onClick={() => handleNavigation('/cart')}
        />
        <img
            src="/src/assets/profile.svg"
            alt="Profile Icon"
            className="h-full cursor-pointer"
            onClick={() => handleNavigation('/profile')}
        />
    </div>
</nav>

        </>
    );
};

export default Navbar;