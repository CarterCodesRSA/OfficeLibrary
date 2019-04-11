import React, { Component } from 'react'

import { Link } from 'react-router-dom'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { firebaseConnect } from 'react-redux-firebase'
import PropTypes from 'prop-types'

class AppNavbar extends Component {
	state = {
		isAuthenticated: false
	}

	static getDerivedStateFromProps(props, state) {
		const { auth } = props
		if (auth.uid) {
			return {
				isAuthenticated: true
			}
		} else {
			return {
				isAuthenticated: false
			}
		}
	}

	onSignOutClick = () => {}

	render() {
		const { isAuthenticated } = this.state
		const { auth } = this.props
		return (
			<nav className="navbar navbar-expand-md mb-3 py-0 bg-light">
				<div className="container">
					<Link to="/" className="navbar-brand">
						Geotechnical Library
					</Link>
					<li className="nav-item">Welcome {auth.email}</li>
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
						<ul className="navbar-nav ml-auto">
							<li className="nav-item" onClick={this.onSignOutClick}>
								<Link to="/login" className="nav-link">
									Login
								</Link>
							</li>
							<li className="nav-item">
								<Link to="/signin" className="nav-link">
									Sign In
								</Link>
							</li>
						</ul>
					</div>
				</div>
			</nav>
		)
	}
}

AppNavbar.propTypes = {
	auth: PropTypes.object.isRequired,
	firebase: PropTypes.object.isRequired
}

export default compose(
	firebaseConnect(),
	connect((state, props) => ({
		auth: state.firebase.auth
	}))
)(AppNavbar)
