import React from 'react';
import {Link} from "react-router-dom";

function SiteHeader() {
    return (
        <div className="header">
            <div className="container d-flex justify-content-between">
                <Link to="/" className="link-light text-decoration-none">Site Header</Link>
                <Link to="/about" className="link-light text-decoration-none ms-3">About us</Link>
            </div>
        </div>
    );
}

export default SiteHeader;