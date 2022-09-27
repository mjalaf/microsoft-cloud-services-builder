import React from "react";
import { Route, Routes, BrowserRouter, useLocation  } from "react-router-dom";

function MainMenu() {

    return (
            <nav className="main-menu">
                <ul>
                    <li>
                        <a href="/">
                            <i className="fa fa-home fa-2x"></i>
                            <span className="nav-text">
                                Dashboard
                            </span>
                        </a>
                    
                    </li>
                    <li className="has-subnav">
                        <a href="/categories">
                            <i className="fa fa-list-alt fa-2x"></i>
                            <span className="nav-text">
                            Cloud Categories
                            </span>
                        </a>
                        
                    </li>
                    <li className="has-subnav">
                        <a href="#">
                        <i className="fa fa-cloud fa-2x"></i>
                            <span className="nav-text">
                            Cloud Scenarios
                            </span>
                        </a>
                        
                    </li>
                    <li className="has-subnav">
                        <a href="#">
                        <i className="fa fa-cubes fa-2x"></i>
                            <span className="nav-text">
                            Cloud Architecture
                            </span>
                        </a>
                    
                    </li>
                </ul>

                <ul className="logout">
                    <li>
                    <a href="#">
                            <i className="fa fa-power-off fa-2x"></i>
                            <span className="nav-text">
                                Logout
                            </span>
                        </a>
                    </li>  
                </ul>
            </nav>

            );
        };

export default MainMenu;