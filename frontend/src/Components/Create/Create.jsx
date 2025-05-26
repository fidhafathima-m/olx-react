import React, { Fragment, useState } from 'react';
import './Create.css';
import Header from '../Header/Header';
import { useProductStore } from '../../store/product';
import { useNavigate } from 'react-router-dom';

const Create = () => {
  const [post, setPost] = useState({
    name: '', category: '', price: '', image: ''
  })

  const [errors, setErrors] = useState({
    name: '', category: '', price: '', image: ''
  })

  const handleChange = (e) => {
    const {name, value} = e.target;
    setPost(prev => ({...prev, [name]: value}));
    setErrors(prev => ({...prev, [name]: ''}))
  }

  const validate = () => {
    let isValid = true;
    let newErrors = {
      name: '', category: '', price: '', image: ''
    }
    if(!post.name.trim()) {
      newErrors.name = 'Product name is required';
      isValid = false;
    }
    if(!post.category.trim()) {
      newErrors.name = 'Category is required';
      isValid = false;
    }
    if(!post.price.trim()) {
      newErrors.name = 'Price is required';
      isValid = false;
    } else if(isNaN(post.price) || Number(post.price) <= 0) {
      newErrors.price = 'Price must be a positive number'
      isValid = false
    }
    if(!post.image.trim()) {
      newErrors.name = 'Image is required';
      isValid = false;
    }
    setErrors(newErrors);
    return isValid;
  }

  const createProduct = useProductStore(state => state.createProduct)
  const navigate = useNavigate();

  const handleSubmit = async(e) => {
    e.preventDefault();
    if(!validate()) return;

    const res = await createProduct(post);
    if(res.success) {
      navigate('/');
    } else {
      alert(res.message);
    }
  }

  return (
    <Fragment>
      <Header />
      <div className="centerDiv">
        <h2>Add a product</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="name">Name</label>
          <br />
          <input
            className="input"
            type="text"
            id="name"
            name="name"
            value={post.name}
            onChange={handleChange}
          />
          {errors.name && <p className="error">{errors.name}</p>}
          <br />

          <label htmlFor="category">Category</label>
          <br />
          <input
            className="input"
            type="text"
            id="category"
            name="category"
            value={post.category}
            onChange={handleChange}
          />
          {errors.category && <p className="error">{errors.category}</p>}
          <br />

          <label htmlFor="price">Price</label>
          <br />
          <input
            className="input"
            type="number"
            id="price"
            name="price"
            value={post.price}
            onChange={handleChange}
          />
          {errors.price && <p className="error">{errors.price}</p>}
          <br />

          <img
            alt="Preview"
            width="200px"
            height="200px"
            src={post.image || 'https://via.placeholder.com/200'}
          />
          <br />

          <label htmlFor="image">Image URL</label>
          <br />
          <input
            className="input"
            type="url"
            id="image"
            name="image"
            value={post.image}
            onChange={handleChange}
          />
          {errors.image && <p className="error">{errors.image}</p>}
          <br />

          <button className="uploadBtn" type="submit">
            Upload and Submit
          </button>
        </form>
      </div>
    </Fragment>

  );
};

export default Create;
