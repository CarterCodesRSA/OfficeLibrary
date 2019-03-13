import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './store'

import AppNavbar from './Components/layout/AppNavbar'
import Dashboard from './Components/layout/Dashboard'
import SignUp from './Components/auth/SignUp'

class App extends Component {
	render() {
		return (
			<Provider store={store}>
				<Router>
					<div className="App">
						<AppNavbar />
						<Switch>
							<Route exact path="/" component={Dashboard} />
							<Route exact path="/registerStudent" component={SignUp} />
						</Switch>
					</div>
				</Router>
			</Provider>
		)
	}
}

export default App
