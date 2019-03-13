import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import PropTypes from 'prop-types'

import Spinner from '../layout/Spinner'

class Students extends Component {
	render() {
		const { students } = this.props
		if (students) {
			return (
				<div>
					<div className="row mb-2">
						<div className="col-md-10 align-middle">
							<h1>Registered Students</h1>
						</div>
						<div className="col-md-2 ml-auto">
							<button className="btn btn-success ml-auto btn-sm align-middle">
								<Link to="/registerStudent">Register new student </Link>
							</button>
						</div>
					</div>
					<table className="table table-striped table-sm">
						<thead className="thead-inverse">
							<tr>
								<th>Name</th>
								<th>Email</th>
								<th>Phone</th>
								<th>Admin Privileges</th>
								<th />
							</tr>
						</thead>
						<tbody>
							{students.map(student => (
								<tr key={student.id}>
									<td className="align-middle">
										{student.firstName} {student.lastName}
									</td>
									<td className="align-middle">{student.email}</td>
									<td className="align-middle"> {student.phone}</td>
									<td className="align-middle"> {student.isAdmin}</td>

									<td className="align-middle">
										<Link
											to={`/students/${student.id}`}
											className="btn btn-primary"
										>
											Details
										</Link>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			)
		} else {
			return <Spinner />
		}
	}
}

Students.propTypes = {
	firestore: PropTypes.object.isRequired,
	students: PropTypes.array
}

export default compose(
	firestoreConnect([{ collection: 'students' }]),
	connect((state, props) => ({ students: state.firestore.ordered.students }))
)(Students)
