import React, { Component } from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'

import Spinner from '../layout/Spinner'

class Catalog extends Component {
	render() {
		const { catalog } = this.props
		console.log('catalog: ', catalog)
		console.log('CATALOG', catalog)
		if (catalog) {
			return (
				<div>
					<h4 className="text-center">This is the books things</h4>
					<ul>
						{catalog.map(item => (
							<li className="list-group-item" key={item.uid}>
								<div className="row">
									<div className="col-4">
										<h5 className="mb-0">{item.bookTitle}</h5>
									</div>
									<div className="col-4">{item.author}</div>
								</div>
								<div className="row">
									<div className="col-4">{item.subTitle}</div>
								</div>
							</li>
						))}
					</ul>
				</div>
			)
		} else {
			return <Spinner />
		}
	}
}

export default compose(
	firestoreConnect([{ collection: 'catalog' }]),
	connect((state, props) => ({ catalog: state.firestore.ordered.catalog }))
)(Catalog)
