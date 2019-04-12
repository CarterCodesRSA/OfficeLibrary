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

	onSignOutClick = e => {
		e.preventDefault()

		const { firebase, history } = this.props
		firebase.logout()
		history.push('/')
	}

	render() {
		const { isAuthenticated } = this.state
		const { auth } = this.props
		console.log('auth: ', auth)
		return (
			<nav className="navbar navbar-expand-md mb-3 py-0 bg-light">
				<div className="container">
					<Link to="/" className="navbar-brand">
						Geotechnical Library
					</Link>
					{isAuthenticated ? (
						<li className="nav-item">Welcome {auth.email}</li>
					) : null}
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
							{isAuthenticated ? (
								<li className="nav-item" onClick={this.onSignOutClick}>
									<Link to="/" className="nav-link">
										Log Out
									</Link>
								</li>
							) : (
								<li className="nav-item">
									<Link to="/login" className="nav-link">
										Log In
									</Link>
								</li>
							)}
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
