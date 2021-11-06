import React from "react";
import { Link, NavLink } from "react-router-dom";
import "./navbar.css";
import logo_navbar from "../../../assets/logo_navbar.png";

export default function Navbar(props) {
	window.onscroll = function () {
		progressBarTop();
	};

	function progressBarTop() {
		var winScroll = document.body.scrollTop || document.documentElement.scrollTop;
		var height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
		var scrolled = (winScroll / height) * 100;
		if (document.getElementById("progressBar")) {
			document.getElementById("progressBar").style.width = scrolled + "%";
		}
	}

	return (
		<nav className="navbar navbar-expand-md navbar-light fixed-top shadow-md">
			<div className="progress-container">
				<div className="progress-bar" id="progressBar"></div>
			</div>
			<div className="d-flex w-50 order-0">
				<Link to={"/"}>
					<img src={logo_navbar} alt="logo" className="mb-md-1 mb-3 cursor_ptr nav_logo" width="80" />
				</Link>
			</div>
			<div className="justify-content-center order-2" id="nav_center_links">
				<ul className="navbar-nav">
					<li className="nav-item m-4">
						<NavLink exact to={"/"} id="nav_home" activeClassName="nav-active" className="text_color nav-link">
							Home
						</NavLink>
					</li>
					<li className="nav-item m-4">
						<NavLink exact to={"/library"} id="nav_library" activeClassName="nav-active" className="text_color nav-link">
							Library
						</NavLink>
					</li>
				</ul>
			</div>

			<div className="w-50 text-right order-1 order-md-last">
				<NavLink exact to={"/create"} id="nav_create" activeClassName="nav-active" className="nav-link navbar-text text_color">
					Create
				</NavLink>
				<NavLink exact to={"/dashboard"} id="nav_dashboard" activeClassName="nav-active" className="nav-link navbar-text m-4 text_color">
					Dashboard
				</NavLink>
			</div>
		</nav>
	);
}
