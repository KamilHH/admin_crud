import React, {useState} from 'react';
import {Link} from "react-router-dom";
import {FaBars} from "react-icons/fa";
import {AiOutlineClose} from "react-icons/ai";
import {NavData} from "./NavData"
import {IconContext} from 'react-icons'

const Navbar = () => {
    const [sidebar, setSidebar] = useState(false);
    const showSidebar = () => setSidebar(!sidebar);
    return (
        <>
            <IconContext.Provider value={{color: 'white'}}>
                <div className="navbar">
                    <Link to='#' className='menu-bars'>
                        <FaBars onClick={showSidebar}/>
                    </Link>
                </div>
                <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
                    <ul className="nav-menu__items" onClick={showSidebar}>
                        <li className="nav-menu__toggle">
                            <Link to='#' className="menu-bars">
                                <AiOutlineClose onClick={showSidebar}/>
                            </Link>
                        </li>
                        {NavData.map((data, i) => {
                            return (
                                <li key={i} className={data.clName}>
                                    <Link to={data.path}>
                                        {data.icon}
                                        <span>{data.title}</span>
                                    </Link>
                                </li>
                            )
                        })}
                    </ul>
                </nav>
            </IconContext.Provider>
        </>
    );
};

export default Navbar;