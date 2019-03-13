import React from 'react'
import ReactLoading from 'react-loading'

const Spinner = () => {
	return (
		<div
			className="container"
			style={
				{
					// display: 'flex',
					// flexDirection: 'column',
					//justifyContent: 'center'
				}
			}
		>
			<ReactLoading
				type="spokes"
				color="black"
				heigh="40"
				style={{ margin: 'auto', display: 'block', width: '150px' }}
			/>
			<h4 style={{ textAlign: 'center', marginTop: '10px' }}>
				Retrieving Data
			</h4>
		</div>
	)
}

export default Spinner
