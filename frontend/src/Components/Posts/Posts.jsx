import React, { useEffect } from 'react';

import Heart from '../../assets/Heart';
import './Post.css';
import { useProductStore } from '../../store/product';
import {usePost} from '../../context/postContext'

function Posts() {

  const fetchProducts = useProductStore((state) => state.fetchProducts)
  const products = useProductStore((state) => state.products)
  const {addPost} = usePost()
  useEffect(() => {
    fetchProducts();
  }, [fetchProducts])

  return (
    <div className="postParentDiv">
      <div className="moreView">
        <div className="heading">
          <span>Quick Menu</span>
          <span>View more</span>
        </div>
        <div className="cards">
          {products.map(product => (
            <div
            className="card"
            onClick={() => addPost(product)}
            key={product._id}
          >
          
          <div className="favorite">
              <Heart/>
            </div>
            <div className="image">
              <img src={product.image} alt={product.name} />
            </div>
            <div className="content">
              <p className="rate">&#x20B9; {product.price}</p>
              <span className="kilometer">{product.category}</span>
              <p className="name"> {product.name}</p>
            </div>
            <div className="date">
              <span>{new Date(product.createdAt || Date.now()).toDateString()}</span>
            </div>
          </div>
          ))}
        </div>
      </div>
      <div className="recommendations">
        <div className="heading">
          <span>Fresh recommendations</span>
        </div>
        <div className="cards">
          {products.map(product => (
            <div 
              className="card"
              key={`fresh-${product._id}`}  
            >
          
            <div className="favorite">
              <Heart/>
            </div>
            <div className="image">
              <img src={product.image} alt={product.name} />
            </div>
            <div className="content">
              <p className="rate">&#x20B9; {product.price}</p>
              <span className="kilometer">{product.category}</span>
              <p className="name"> {product.name}</p>
            </div>
            <div className="date">
              <span>{new Date(product.createdAt || Date.now()).toDateString()}</span>
            </div>
          </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Posts;
