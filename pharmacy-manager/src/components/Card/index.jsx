import React from 'react';
import { Link } from 'react-router-dom';

import './styles.css';

const Card = ({ post }) => {
	return (
		<div className='card'>
			<Link className='link' to={`/post/${post.id}`}>
				<span>{post.title}</span>
				<img src={post.img} alt='' className='img' />
				<p className='desc'>{post.desc}</p>
				<button className='cardButton'>Read More</button>
			</Link>
		</div>
	);
};
export default Card;
