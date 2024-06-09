import React from 'react';
import "./Header.css";
const Header = () => {
    return (
        <div className="header">
            <nav>
                <ul>
                    <li> <a href="/Shop">Shop</a> </li>
                    <li> <a href="/Shop">Order Review</a> </li>
                    <li> <a href="/Shop">Manage inventory Here</a> </li>
                </ul>
            </nav>
        </div>
    );
};

export default Header;