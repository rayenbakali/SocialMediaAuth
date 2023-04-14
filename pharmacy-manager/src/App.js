import React, { useEffect, useState } from 'react';

import './App.css';
import GestionPharmacie from './pages/GestionPharmacie';

import {
	BrowserRouter,
	Routes,
	Route,
	Navigate
} from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Post from './pages/Post';
import PharmacyDetails from './pages/PharmacyDetails';

function App() {
	const [user, setUser] = useState(null);

	useEffect(() => {
		const getUser = () => {
			fetch('http://localhost:5000/auth/login/success', {
				method: 'GET',
				credentials: 'include',
				// @ts-ignore
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
					'Access-Control-Allow-Credentials': true,
				},
			})
				.then((response) => {
					if (response.status === 200) return response.json();
					throw new Error('authentication has been failed!');
				})
				.then((resObject) => {
					setUser(resObject.user);
				})
				.catch((err) => {
					console.log(err);
				});
		};
		getUser();
	}, []);

	console.log(user);

	return (
		<BrowserRouter>
			<div>
				<Navbar user={user} />
				<Routes>
					<Route path='/' element={<Home />} />
					<Route
						path='/login'
						element={user ? <Navigate to='/' /> : <Login />}
					/>
					<Route
						path='/post/:id'
						element={user ? <Post /> : <Navigate to='/login' />}
					/>
					<Route
						path='/GestionPharmacie'
						element={user ? <GestionPharmacie /> : <Navigate to='/login' />}
					/>
					<Route
						path='/GestionPharmacie/:id'
						element={
							user ? (
								<PharmacyDetails />
							) : (
								<Navigate replace={true} to='/login' />
							)
						}
					/>
				</Routes>
			</div>
		</BrowserRouter>
	);
}

export default App;
