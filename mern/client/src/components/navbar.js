import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import { NavLink } from "react-router-dom";


export default function Navbar() {
    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-light bg-light justify-content-between ps-3 pe-3">
                <NavLink className="navbar-brand" to="/">
                    Fundraiser Review App
                </NavLink>

                <div className="" id="navbarSupportedContent">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/create">
                                Add Fundraiser
                            </NavLink>
                        </li>
                    </ul>
                </div>
            </nav>
        </div>
    );
}
