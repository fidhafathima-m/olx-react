import React from 'react';

import './View.css';
import { usePost } from '../../context/postContext';
import { useAuth } from '../../context/auth';

function View() {
  const {post} = usePost();
  const {user} = useAuth()

  return (
    <div className="viewParentDiv">
      <div className="imageShowDiv">
        <img
          src={post.image}
          alt=""
        />
      </div>
      <div className="rightSection">
        <div className="productDetails">
          <p>&#x20B9; {post.price} </p>
          <span>{post.name}</span>
          <p>{post.category}</p>
          <span>{new Date(post.createdAt).toDateString()}</span>
        </div>
        <div className="contactDetails">
          <p>Seller details</p>
          <p>{user ? user.name : 'unknown'}</p>
          <p>{user ? user.phone : 'unknown'}</p>
        </div>
      </div>
    </div>
  );
}
export default View;
