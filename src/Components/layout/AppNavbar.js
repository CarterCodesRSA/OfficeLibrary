import React, { Component } from 'react'

import { Link } from 'react-router-dom'

class Navbar extends Component {
	render() {
		return (
			<nav className="navbar navbar-expand-md mb-3 py-0 bg-light">
				<div className="container">
					<Link to="/" className="navbar-brand">
						Geotechnical Library
					</Link>
					<button
						className="navbar-toggler"
						type="button"
						data-toggle="collapse"
						data-target="#navbarMain"
					>
						<span className="navbar-toggler-icon">
							<i className="fas fa-arrow-down mt-1" />
						</span>
					</button>
					<div className="collapse navbar-collapse" id="navbarMain">
						<ul className="navbar-nav ml-auto align-middle">
							<li className="nav-item nav-link">{this.props.email}</li>
							<li className="nav-item">
								<Link to="/" className="nav-link">
									Sign Out
								</Link>
							</li>

							<li className="nav-item">
								<Link to="/signin" className="nav-link">
									Sign In
								</Link>
							</li>
							<li className="nav-item">
								<Link to="/signin" className="nav-link">
									Edit Contact
								</Link>
							</li>
						</ul>
					</div>
				</div>
			</nav>
		)
	}
}

export default Navbar
