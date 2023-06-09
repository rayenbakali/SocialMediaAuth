import React from 'react';
import { Link } from 'react-router-dom';

import './styles.css';

const Navbar = ({ user }) => {
	const logout = () => {
		window.open('http://localhost:5000/auth/logout', '_self');
	};
	return (
		<div className='navbar'>
			<span className='logo'>
				<Link className='link' to='/'>
					Sehaty
				</Link>
			</span>
			<Link className='link' to='/GestionPharmacie'>
				Gestion Pharmacie
			</Link>
			{user ? (
				<ul className='list'>
					<li className='listItem'>
						<img src={user.photos[0].value} alt='' className='avatar'></img>
					</li>
					<li className='listItem'>{user.displayName}</li>
					<li className='listItem' onClick={logout}>
						Logout
					</li>
				</ul>
			) : (
				<Link className='link' to='login'>
					Login
				</Link>
			)}
		</div>
	);
};

export default Navbar;
