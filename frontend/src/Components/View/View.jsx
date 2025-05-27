import React from 'react';

import './View.css';
import { usePost } from '../../context/postContext';

function View() {
  const { post } = usePost();

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
          <p>{post.sellerName}</p>
          <p>{post.sellerPhone}</p> 
        </div>
      </div>
    </div>
  );
}
export default View;
