import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './store'

import AppNavbar from './Components/layout/AppNavbar'
import Dashboard from './Components/layout/Dashboard'
import SignUp from './Components/auth/SignUp'
import StudentProfile from './Components/students/StudentProfile'
import EditStudent from './Components/students/EditStudent'
import Login from './Components/auth/Login'

class App extends Component {
	render() {
		return (
			<Provider store={store}>
				<Router>
					<div className="App">
						<AppNavbar />
						<Switch>
							<Route exact path="/" component={Login} />
							<Route exact path="/home" component={Dashboard} />

							<Route exact path="/registerStudent" component={SignUp} />
							<Route exact path="/student/:id" component={StudentProfile} />
							<Route exact path="/student/edit/:id" component={EditStudent} />
							<Route exact path="/login" component={Login} />
						</Switch>
					</div>
				</Router>
			</Provider>
		)
	}
}

export default App
