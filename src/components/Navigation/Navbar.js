import React, {useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import {FaBars} from "react-icons/fa";
import {AiOutlineClose} from "react-icons/ai";
import {NavData} from "./NavData"
import {IconContext} from 'react-icons'
import {MdAccountCircle} from "react-icons/md";

const Navbar = ({data}) => {
    const [sidebar, setSidebar] = useState(false);
    const showSidebar = () => setSidebar(!sidebar);

    return (
        <>
            <IconContext.Provider value={{color: 'white'}}>
                <div className="navbar">
                    <Link to='#' className='menu-bars'>
                        <FaBars onClick={showSidebar}/>
                    </Link>
                    <div className="login">
                        <span style={{color: 'white'}}>{data}</span>
                        <MdAccountCircle className='avatar'/>
                    </div>
                </div>
                <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
                    <ul className="nav-menu__items" onClick={showSidebar}>
                        <li className="nav-menu__toggle">
                            <Link to='#' className="menu-bars">
                                <AiOutlineClose onClick={showSidebar}/>
                            </Link>
                        </li>
                        {NavData.map((data, i) => {
                            const {clName, path, icon, title} = data
                            return (
                                <li key={i} className={clName}>
                                    <Link to={path}>
                                        {icon}
                                        <span>{title}</span>
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