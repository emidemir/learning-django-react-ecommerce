import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';

// Google OAuth import
import { GoogleOAuthProvider } from '@react-oauth/google';

// Page imports for router
import App from './App';
import ProfilePage from './pages/ProfilePage'
import AuthPage from './pages/AuthPage'


// Redux imports
import { store } from './app/store'
import {Provider} from 'react-redux'
// Route imports
import {createBrowserRouter, RouterProvider} from 'react-router-dom'

const router = createBrowserRouter([
	{path: '/', element:<App/>},
	{path:'/auth', element:<AuthPage/>},
	{path:'/profile', element:<ProfilePage/>},
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<React.StrictMode>
		<Provider store={store}>
			<GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_OAUTH_CLIENT_ID}>
				<RouterProvider router={router}/>
			</GoogleOAuthProvider>
		</Provider>
	</React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
