import React from 'react'
import * as bars from "react-icons/fa";
import * as icons from "react-icons/ai";
import * as io from "react-icons/io";

export const NavbarData = [
    {
        title: 'Home',
        path: '/',
        icon: <icons.AiFillHome/>,
        className: 'nav-text'
    },
    {
        title: 'News',
        path: '/feed',
        icon: <io.IoIosPaper/>,
        className: 'nav-text'
    },
    {
        title: 'Products',
        path: '/products',
        icon: <bars.FaCartPlus/>,
        className: 'nav-text'
    },
    {
        title: 'Messages',
        path: '/messages',
        icon: <bars.FaEnvelopeOpenText/>,
        className: 'nav-text'
    }
]