import './Logo.css'
import logo from '../../assets/imgs/logoweb.png'
import React from "react";
import { Link } from 'react-router-dom';

const Logo = () =>
    <aside className='logo'>
        <Link to="/" className="logo">
            <img src={logo} alt="logo" />
        </Link>
    </aside>

export default Logo;