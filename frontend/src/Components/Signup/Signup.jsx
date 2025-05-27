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
  } else if (signup.name.trim().length < 2) {
    tempErrors.name = 'Name must be at least 2 characters.';
    isValid = false;
  } else if (signup.name.trim().length > 50) {
    tempErrors.name = 'Name cannot exceed 50 characters.';
    isValid = false;
  } else if (!/^[a-zA-Z\s'-]+$/.test(signup.name)) {
    tempErrors.name = 'Name contains invalid characters.';
    isValid = false;
  }

  if (!signup.email.trim()) {
    tempErrors.email = 'Email is required.';
    isValid = false;
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(signup.email)) {
    tempErrors.email = 'Invalid email format.';
    isValid = false;
  } else if (signup.email.length > 100) {
    tempErrors.email = 'Email cannot exceed 100 characters.';
    isValid = false;
  } else if (/\.{2,}/.test(signup.email)) {
    tempErrors.email = 'Email contains consecutive dots.';
    isValid = false;
  }

  if (!signup.phone.trim()) {
    tempErrors.phone = 'Phone number is required.';
    isValid = false;
  } else if (!/^\d{10}$/.test(signup.phone)) {
    tempErrors.phone = 'Phone must be exactly 10 digits.';
    isValid = false;
  } else if (/^(\d)\1{9}$/.test(signup.phone)) {
    tempErrors.phone = 'Phone number cannot be all the same digit.';
    isValid = false;
  } else if (!/^[6-9]\d{9}$/.test(signup.phone)) {
    tempErrors.phone = 'Phone number must start with 6-9.';
    isValid = false;
  }

  if (!signup.password.trim()) {
    tempErrors.password = 'Password is required.';
    isValid = false;
  } else if (signup.password.length < 8) {
    tempErrors.password = 'Password must be at least 8 characters.';
    isValid = false;
  } else if (signup.password.length > 30) {
    tempErrors.password = 'Password cannot exceed 30 characters.';
    isValid = false;
  } else if (!/[A-Z]/.test(signup.password)) {
    tempErrors.password = 'Password must contain at least one uppercase letter.';
    isValid = false;
  } else if (!/[a-z]/.test(signup.password)) {
    tempErrors.password = 'Password must contain at least one lowercase letter.';
    isValid = false;
  } else if (!/\d/.test(signup.password)) {
    tempErrors.password = 'Password must contain at least one number.';
    isValid = false;
  } else if (!/[!@#$%^&*(),.?":{}|<>]/.test(signup.password)) {
    tempErrors.password = 'Password must contain at least one special character.';
    isValid = false;
  } else if (/(.)\1{2,}/.test(signup.password)) {
    tempErrors.password = 'Password cannot contain repeating characters (more than 2).';
    isValid = false;
  } else if (signup.password.includes(' ')) {
    tempErrors.password = 'Password cannot contain spaces.';
    isValid = false;
  }

  setErrors(tempErrors);
  return isValid;
};

  const handleSubmit = async(e) => {
    e.preventDefault();
    if(!validate()) return;

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/signup`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(signup)
      })
      const data = await res.json();

      if(!res.ok) {
        if(res.status === 406) {
          if(data.message.toLowerCase().includes('email')) {
            setErrors(prev => ({...prev, email: data.message}));
          } else {
            alert(data.message);
          }
          return;
        }
        throw new Error(data.message || 'Signup failed');
      }

        login({
          name: data.data.name,
          email: data.data.email,
          phone: data.data.phone
        })
        navigate('/');
    } catch(error) {
      console.error('Signup failed:', error);
      alert(error.message || 'Something went wrong. Please try again later.');
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
