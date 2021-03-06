import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import PropTypes from 'prop-types'

import Spinner from '../layout/Spinner'

class StudentProfile extends Component {
	render() {
		const { student } = this.props
		console.log('CURRENT LOGGED IN STUDENT', student)
		if (student) {
			return (
				<div className="container">
					<div className="row">
						<div className="col-md-6 ml-auto">
							<div className="btn-group float-right">
								<Link
									to={`/student/edit/${student.id}`}
									className="btn btn-link btn-warning btn-sm"
								>
									Edit Student
								</Link>
							</div>
						</div>
					</div>
					<div id="studentDetails">
						<div className="card">
							<h3 className="card-header">
								<div className="container row mt-2">
									<h4>
										Student:{' '}
										<span className="text-muted ">
											{student.firstName} {student.lastName}
										</span>
									</h4>
								</div>
							</h3>
							<div className="card-body">
								<ul className="list-group">
									<li className="list-group-item">Email: {student.email}</li>
									<li className="list-group-item">
										Phone Number: {student.phone}
									</li>
									<li className="list-group-item">
										Admin rights: {student.isAdmin}
									</li>
								</ul>
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

StudentProfile.propTypes = {
	firestore: PropTypes.object.isRequired
}

export default compose(
	firestoreConnect(props => [
		{ collection: 'students', storeAs: 'student', doc: props.match.params.id }
	]),
	connect(({ firestore: { ordered } }, props) => ({
		student: ordered.student && ordered.student[0]
	}))
)(StudentProfile)
