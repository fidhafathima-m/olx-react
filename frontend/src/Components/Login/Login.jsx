import React, { useState } from 'react';

import Logo from '../../olx-logo.png';
import './Login.css';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/auth';

function Login() {
  const {login} = useAuth();
  const navigate = useNavigate();

  const [user, setUser] = useState({
    email: '', password: ''
  })
  const [error, setError] = useState({
    email: '', password: ''
  })

  const handleChange = (e) => {
    const {name, value} = e.target;
    setUser(prev => ({...prev, [name]: value}))
    setError(prev => ({...prev, [name]: ''}))
  }

  const validate = () => {
    let isValid = true;
    const newErrors = {name: '', email: ''}
    if(!user.email.trim()) {
      newErrors.email = 'Email required';
      isValid = false;
    } else if (!/^\S+@\S+\.\S+$/.test(user.email)) {
      newErrors.email = 'Invalid email format.';
      isValid = false;
    }
    if (!user.password.trim()) {
      newErrors.password = 'Password is required.';
      isValid = false;
    }

    setError(newErrors);
    return isValid;

  }

  const handleSubmit = async(e) => {
    e.preventDefault();
    if(!validate()) return;

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/login`, {
        method: 'POST',
        headers: {'Content-type': 'application/json'}, 
        body: JSON.stringify(user),
      })
      const data = await res.json();
      console.log('data: ', data)

      if(data.success) {
        login(data.data);
        navigate('/');
      } else {
        alert(data.message)
      }
    } catch(err) {
      alert(`Error: ${err.message}`);
    }
  }

  return (
    <div>
      <div className="loginParentDiv">
        <img width="200px" height="200px" src={Logo} onClick={() => navigate('/')}></img>
        <form onSubmit={handleSubmit}>
          <label htmlFor="fname">Email</label>
          <br />
          <input
            className="input"
            type="email"
            id="fname"
            name="email"
            value={user.email}
            onChange={handleChange}
          />
          {error.email && <p className='error'>{error.email}</p>}
          <br />
          <label htmlFor="lname">Password</label>
          <br />
          <input
            className="input"
            type="password"
            id="lname"
            name="password"
            value={user.password}
            onChange={handleChange}
          />
          {error.password && <p className='error'>{error.password}</p>}
          <br />
          <br />
          <button type='submit'>Login</button>
        </form>
        <a href='/signup'>Signup</a>
      </div>
    </div>
  );
}

export default Login;
