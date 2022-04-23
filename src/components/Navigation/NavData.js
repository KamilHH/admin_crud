import React from 'react';
import {AiFillHome, AiOutlineDatabase, AiOutlineUserAdd} from "react-icons/ai";

export const NavData = [
    {
        title: 'Home',
        path: '/home',
        icon: <AiFillHome/>,
        clName: 'nav-menu__text'
    },
    {
        title: 'Dodaj użytkownika',
        path: '/new',
        icon: <AiOutlineUserAdd/>,
        clName: 'nav-menu__text'
    },
    {
        title: 'Lista użytkowników',
        path: '/users',
        icon: <AiOutlineDatabase/>,
        clName: 'nav-menu__text'
    },

]