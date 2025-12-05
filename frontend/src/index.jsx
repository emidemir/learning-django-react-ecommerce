import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';

// Google OAuth import
import { GoogleOAuthProvider } from '@react-oauth/google';

// Redux imports
import { Provider } from 'react-redux';
import store from './app/store'

// Page imports for router
import HomePage from './pages/HomePage';
import AuthPage from './pages/AuthPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import ProfilePage from './pages/ProfilePage';
import ProductDetailsPage from './pages/ProductDetailsPage';
import NotFoundPage from './pages/NotFoundPage'; // Import the new page

// Route imports
import {createBrowserRouter, RouterProvider} from 'react-router-dom'

const router = createBrowserRouter([
	{path: "/",element: <HomePage />,},
	{path: "/auth",element: <AuthPage />,},
	{path: "/product/:id",element: <ProductDetailsPage />,},
	{path: "/cart",element: <CartPage />,},
	{path: "/checkout",element: <CheckoutPage />,},
	{path: "/profile",element: <ProfilePage />,},
	{path: "*", element: <NotFoundPage />,}
  ]);

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
