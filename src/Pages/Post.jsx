import React from 'react'
import { useLocation } from 'react-router-dom';
import { posts } from '../data';

const Post = () => {
    const  location = useLocation()
    const path = location.pathname.split("/")[2];

    const post = posts.find((p)=>p.id.toString() === path);
    console.log(location);
  return (
    <div className='post'>
        <img src={post.img} alt='' className='postImg'/>
        <h1 className='postTItle'>{post.title}</h1>
        <p className='postDesc'> {post.desc}</p>
        <p className='postlongDesc'>{post.longDesc}</p>
    </div>
  )
}

export default Post;