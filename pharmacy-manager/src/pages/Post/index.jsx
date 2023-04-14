import React from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { posts } from '../../data';

import './styles.css';

const Post = () => {
	const location = useLocation();
	let { id } = useParams();

	const post = posts.find((p) => p.id.toString() === id);
	console.log(location);
	return (
		<div className='post'>
			<img src={post?.img} alt='' className='postImg' />
			<h1 className='postTItle'>{post?.title}</h1>
			<p className='postDesc'> {post?.desc}</p>
			<p className='postlongDesc'>{post?.longDesc}</p>
		</div>
	);
};

export default Post;
