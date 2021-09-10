import React from 'react';
import {Link} from "react-router-dom";

function SiteHeader() {
    return (
        <div className="header">
            <div className="container d-flex justify-content-between">
                <Link to="/" className="link-light text-decoration-none">Site Header</Link>
                <div className="d-flex">
                    <Link to="/about" className="link-light text-decoration-none ms-3">About us</Link>
                    <Link to="/login" className="link-light text-decoration-none ms-3">Login</Link>
                </div>
            </div>
        </div>
    );
}

export default SiteHeader;