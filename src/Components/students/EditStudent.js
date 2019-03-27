import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import PropTypes from 'prop-types'

import Spinner from '../layout/Spinner'

class EditStudent extends Component {
	constructor(props) {
		super(props)
		//create refs
		this.firstNameInput = React.createRef()
		this.lastNameInput = React.createRef()
		this.phoneInput = React.createRef()
		this.AdminRightsInput = React.createRef()
	}

	submitChanges = e => {
		e.preventDefault()
		const { student, firestore, history } = this.props

		//Construct updated student

		const updatedStudent = {
			firstName: this.firstNameInput.current.value,
			lastName: this.lastNameInput.current.value,
			phone: this.phoneInput.current.value,
			isAdmin: this.AdminRightsInput.current.value,
			email: student.email,
			uid: student.uid
		}

		console.log('Student: ', student)

		console.log('updatedStudent: ', updatedStudent)

		firestore
			.update({ collection: 'students', doc: student.id }, updatedStudent)
			.then(history.push('/'))
	}
	render() {
		const { student } = this.props
		console.log(student)
		if (student) {
			return (
				<div className="container">
					<div className="row">
						<div className="col-md-6 ml-auto">
							<div className="btn-group float-right">
								<button className="btn btn-danger btn-sm">
									Delete Profile
								</button>
							</div>
						</div>
					</div>
					<div id="studentDetails">
						<div className="card">
							<h3 className="card-header">
								<div className="container row mt-2">
									<h4>
										Edit Student:{' '}
										<span className="text-muted ">
											{student.firstName} {student.lastName}
										</span>
									</h4>
								</div>
							</h3>
							<div className="card-body">
								<form onSubmit={e => this.submitChanges(e)}>
									<ul className="list-group">
										<li className="list-group-item">
											<label className="header" htmlFor="editEmail">
												Email
											</label>
											<input
												type="text"
												className="form-control"
												id="editEmail"
												disabled
												value={student.email}
											/>
										</li>
										<li className="list-group-item">
											<label className="header" htmlFor="EditFirstName">
												First Name
											</label>
											<input
												type="text"
												className="form-control"
												id="EditFistName"
												ref={this.firstNameInput}
												defaultValue={student.firstName}
											/>
										</li>
										<li className="list-group-item">
											<label className="header" htmlFor="EditlastName">
												Last Name
											</label>
											<input
												type="text"
												className="form-control"
												id="EditLastName"
												ref={this.lastNameInput}
												defaultValue={student.lastName}
											/>
										</li>
										<li className="list-group-item">
											<label className="header" htmlFor="EditPhone">
												Phone
											</label>
											<input
												type="text"
												className="form-control"
												id="EditFistName"
												ref={this.phoneInput}
												defaultValue={student.phone}
											/>
										</li>
										<li className="list-group-item">
											<label className="header" htmlFor="EditAdminRights">
												Admin Rights
											</label>
											<input
												type="text"
												className="form-control"
												id="EditAdminRights"
												ref={this.AdminRightsInput}
												defaultValue={student.isAdmin}
											/>
										</li>
									</ul>
									<button className="btn btn-success btn-block" type="submit">
										Update Student Details
									</button>
								</form>
							</div>
						</div>
					</div>
					<Link to="/" className="btn btn-link">
						Back to dashboard
					</Link>
				</div>
			)
		} else {
			return <Spinner />
		}
	}
}

EditStudent.propTypes = {
	firestore: PropTypes.object.isRequired
}

export default compose(
	firestoreConnect(props => [
		{ collection: 'students', storeAs: 'student', doc: props.match.params.id }
	]),
	connect(({ firestore: { ordered } }, props) => ({
		student: ordered.student && ordered.student[0]
	}))
)(EditStudent)
