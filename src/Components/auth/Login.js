import React, { Component } from 'react'
// import { compose } from 'redux'
// import { connect } from 'react-redux'
import { firebaseConnect } from 'react-redux-firebase'
import PropTypes from 'prop-types'

class Login extends Component {
	state = {
		email: '',
		password: ''
	}

	onSubmit = async e => {
		e.preventDefault()

		const { firebase, history } = this.props
		const { email, password } = this.state

		try {
			await firebase.login({
				email,
				password
			})
			history.push('/')
		} catch (error) {
			console.log('ERROR : ', error)
		}
	}

	onChange = e => {
		this.setState({
			[e.target.name]: e.target.value
		})
	}
	render() {
		return (
			<div className="row">
				<div className="col-md-6 mx-auto">
					<div className="card border-0">
						<div className="body">
							<h1 className="text-center pb-4 pt-3">
								<span className="text-primary">
									<i className="fas fa-lock" /> Login
								</span>
							</h1>
							<form onSubmit={this.onSubmit}>
								<div className="form-group">
									<label htmlFor="email">Email</label>
									<input
										type="text"
										className="form-control"
										name="email"
										required
										value={this.state.email}
										onChange={this.onChange}
									/>
								</div>
								<div className="form-group">
									<label htmlFor="password">Password</label>
									<input
										type="password"
										className="form-control"
										name="password"
										required
										value={this.state.password}
										onChange={this.onChange}
									/>
								</div>
								<input type="submit" className="btn btn-primary btn-block" />
							</form>
						</div>
					</div>
				</div>
			</div>
		)
	}
}

Login.propTypes = {
	firebase: PropTypes.object.isRequired
}

// EditStudent.propTypes = {
// 	firestore: PropTypes.object.isRequired
// }

export default firebaseConnect()(Login)
