import React, { useState } from 'react';

import Logo from '../../olx-logo.png';
import './Signup.css';
import { useAuth } from '../../context/auth';
import { useNavigate } from 'react-router-dom';

export default function Signup() {
  const {login} = useAuth();
  const navigate = useNavigate();
  const [signup, setSignup] = useState({
    name: '', email: '', phone: '', password: ''
  })

  const [errors, setErrors] = useState({
    name: '', email: '', phone: '', password: ''
  })

  const handleChanges = (e) => {
    const {name, value} = e.target;
    setSignup(prev => ({...prev, [name]: value}));
    setErrors(prev => ({...prev, [name]: ''}));
  }

  const validate = () => {
    let isValid = true;
    const tempErrors = { name: '', email: '', phone: '', password: '' };

    if (!signup.name.trim()) {
      tempErrors.name = 'Name is required.';
      isValid = false;
    }

    if (!signup.email.trim()) {
      tempErrors.email = 'Email is required.';
      isValid = false;
    } else if (!/^\S+@\S+\.\S+$/.test(signup.email)) {
      tempErrors.email = 'Invalid email format.';
      isValid = false;
    }

    if (!signup.phone.trim()) {
      tempErrors.phone = 'Phone number is required.';
      isValid = false;
    } else if (!/^\d{10}$/.test(signup.phone)) {
      tempErrors.phone = 'Phone must be 10 digits.';
      isValid = false;
    }

    if (!signup.password.trim()) {
      tempErrors.password = 'Password is required.';
      isValid = false;
    } else if (signup.password.length < 6) {
      tempErrors.password = 'Password must be at least 6 characters.';
      isValid = false;
    }

    setErrors(tempErrors);
    return isValid;
  };


  const handleSubmit = async(e) => {
    e.preventDefault();
    if(!validate()) return;

    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/signup`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(signup)
    })
    const data = await res.json();
    if(data.success) {
      login({
        name: data.data.name,
        email: data.data.email,
        phone: data.data.phone
      })
      navigate('/');
    } else {
      alert(data.message);
    }
  }

  return (
    <div>
      <div className="signupParentDiv">
        <img width="200px" height="200px" src={Logo} onClick={() => navigate('/')}></img>
        <form onSubmit={handleSubmit}>
          <label htmlFor="fname">Username</label>
          <br />
          <input
            className="input"
            type="text"
            id="fname"
            name="name"
            value={signup.name}
            onChange={handleChanges}
          />
          {errors.name && <p className='error'>{errors.name}</p>}
          <br />
          <label htmlFor="fname">Email</label>
          <br />
          <input
            className="input"
            type="email"
            id="fname"
            name="email"
            value={signup.email}
            onChange={handleChanges}
          />
          {errors.email && <p className='error'>{errors.email}</p>}
          <br />
          <label htmlFor="lname">Phone</label>
          <br />
          <input
            className="input"
            type="number"
            id="lname"
            name="phone"
            value={signup.phone}
            onChange={handleChanges}
          />
          {errors.phone && <p className='error'>{errors.phone}</p>}
          <br />
          <label htmlFor="lname">Password</label>
          <br />
          <input
            className="input"
            type="password"
            id="lname"
            name="password"
            value={signup.password}
            onChange={handleChanges}
          />
          {errors.password && <p className='error'>{errors.password}</p>}
          <br />
          <br />
          <button type='submit'>Signup</button>
        </form>
        <a href='/login'>Login</a>
      </div>
    </div>
  );
}
