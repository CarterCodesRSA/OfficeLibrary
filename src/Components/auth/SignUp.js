import React, { Component } from 'react'

import { Link } from 'react-router-dom'
// import { compose } from 'redux'
// import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { firebaseApp } from '../../store'
import PropTypes from 'prop-types'
import { userInfo } from 'os'

class SignUp extends Component {
	constructor(props) {
		super(props)
		this.state = {
			firstName: '',
			lastName: '',
			email: '',
			password: '',
			passwordConfirm: '',
			phone: '',
			isAdmin: 'false',
			error: {
				message: ''
			}
		}
	}

	// resetError() {
	// 	this.setState({
	// 		error: {
	// 			message: ''
	// 		}
	// 	})
	// }

	async signUp(e) {
		e.preventDefault()

		const { password, passwordConfirm, error, ...newStudent } = this.state

		const { firestore } = this.props
		if (password === passwordConfirm && password !== '') {
			console.log('Passwords Matched')
			console.log('FIRESTORE', firestore)
			try {
				const user = await firebaseApp
					.auth()
					.createUserWithEmailAndPassword(newStudent.email, password)
				console.log('THIS IS THE USER', user)
				await firestore
					.add(
						{ collection: 'students' },
						{ ...newStudent, uid: user.user.uid }
					)
					.then(() => this.props.history.push('/'))
			} catch (error) {
				this.setState({ error })
			}
		} else {
			this.setState({
				error: {
					message: 'Please Ensure your passwords match'
				}
			})
		}
		//	this.resetError()
		// const { email, password } = this.state

		// console.log('Password was confirmed', this.state)
		// firebaseApp
		// 	.auth()
		// 	.createUserWithEmailAndPassword(email, password)
		// 	.catch(error => this.setState({ error }))
	}

	render() {
		return (
			<div className="container mt-2">
				<div className="card">
					<div className="card-header text-center">
						<h3>Sign Up to use the Geotechnical Library</h3>
					</div>
					<div className="card-body">
						<form onSubmit={e => this.signUp(e)}>
							<div className="form-row">
								<div className="col">
									<div className="form-group">
										<label className="header" htmlFor="signUpFirstName">
											First Name
										</label>
										<input
											type="text"
											className="form-control"
											id="signUpFirstName"
											placeholder="Please enter your First Name"
											onChange={event => {
												this.setState({ firstName: event.target.value })
											}}
										/>
									</div>
								</div>
								<div className="col">
									<div className="form-group">
										<label className="header" htmlFor="signUpLastName">
											Last Name
										</label>
										<input
											type="text"
											className="form-control"
											id="signUpLastName"
											placeholder="Please enter your last Name"
											onChange={event => {
												this.setState({ lastName: event.target.value })
											}}
										/>
									</div>
								</div>
							</div>
							<div className="form-row">
								<div className="col">
									<div className="form-group">
										<label className="header" htmlFor="signUpPhone">
											Phone number
										</label>
										<input
											type="text"
											className="form-control"
											id="signUpPhone"
											placeholder="Please enter your phone number"
											onChange={event => {
												this.setState({ phone: event.target.value })
											}}
										/>
									</div>
								</div>
								<div className="col">
									<div className="form-group">
										<label className="header" htmlFor="signUpIsAdmin">
											Admin Rights
										</label>
										<input
											type="text"
											className="form-control"
											id="signUpIsAdmin"
											value="false"
											disabled
											placeholder="Please enter your phone number"
											onChange={event => {
												this.setState({ isAdmin: event.target.value })
											}}
										/>
									</div>
								</div>
							</div>

							<div className="form-group">
								<label className="header" htmlFor="signUpEmail">
									Email address
								</label>
								<input
									type="email"
									className="form-control"
									id="signUpEmail"
									placeholder="Please enter your email"
									onChange={event => {
										this.setState({ email: event.target.value })
									}}
								/>
							</div>
							<div className="form-group">
								<label className="header" htmlFor="signUpPassword">
									Password
								</label>
								<input
									type="password"
									className="form-control"
									id="signUpPassword"
									placeholder="Please enter your password"
									onChange={event => {
										this.setState({ password: event.target.value })
									}}
								/>
							</div>
							<div className="form-group">
								<label className="header" htmlFor="signUpPasswordConfirm">
									Confirm your password
								</label>
								<input
									type="password"
									className="form-control"
									id="signUpPasswordConfirm"
									placeholder="Please confirm your password"
									onChange={event => {
										this.setState({ passwordConfirm: event.target.value })
									}}
								/>
							</div>

							<div className="mb-2 text-danger">{this.state.error.message}</div>

							<button className="btn btn-success btn-block" type="submit">
								Register Student
							</button>
						</form>

						<div className="alight-right mt-2">
							<Link to={'/signin'}>Already a user? Sign in here</Link>
						</div>
					</div>
				</div>
			</div>
		)
	}
}

SignUp.propTypes = {
	firestore: PropTypes.object.isRequired
}

export default firestoreConnect()(SignUp)
