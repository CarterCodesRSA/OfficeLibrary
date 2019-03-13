import { createStore, combineReducers, compose } from 'redux'
import firebase from 'firebase'
import 'firebase/firestore'
import { reactReduxFirebase, firebaseReducer } from 'react-redux-firebase'
import { reduxFirestore, firestoreReducer } from 'redux-firestore'
//reducers TODO

const firebaseConfig = {
	apiKey: 'AIzaSyDZuKhMrfyZhzXUlCNgT7HHpXhinSlxVHg',
	authDomain: 'officelibrary-74665.firebaseapp.com',
	databaseURL: 'https://officelibrary-74665.firebaseio.com',
	projectId: 'officelibrary-74665',
	storageBucket: 'officelibrary-74665.appspot.com',
	messagingSenderId: '375427612797'
}

//react-redux-firebase config
const rrfConfig = {
	userProfile: 'users',
	useFirestoreForProfile: true // Firestore for Profile instead of Realtime DB
}
//Init firebase instance
export const firebaseApp = firebase.initializeApp(firebaseConfig)
//init firestore
const fireStore = firebase.firestore()

// Add reactReduxFirebase enhancer when making store creator
const createStoreWithFirebase = compose(
	reactReduxFirebase(firebase, rrfConfig), // firebase instance as first argument
	reduxFirestore(firebase) // <- needed if using firestore
)(createStore)

// Add firebase to reducers
const rootReducer = combineReducers({
	firebase: firebaseReducer,
	firestore: firestoreReducer
	//Add any other reducers to this section
})

const initialState = {}
const store = createStoreWithFirebase(
	rootReducer,
	initialState,
	compose(
		reactReduxFirebase(firebase),
		window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
	)
)

export default store
