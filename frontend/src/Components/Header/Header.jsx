import React from 'react';

import './Header.css';
import {useAuth} from '../../context/auth'
import OlxLogo from '../../assets/OlxLogo';
import Search from '../../assets/Search';
import Arrow from '../../assets/Arrow';
import SellButton from '../../assets/SellButton';
import SellButtonPlus from '../../assets/SellButtonPlus';
import { Link, useNavigate } from 'react-router-dom';
function Header() {
  const {user, logout} = useAuth()
  const navigate = useNavigate()
  return (
    <div className="headerParentDiv">
      <div className="headerChildDiv">
        <div className="brandName">
          <OlxLogo onClick={() => navigate('/')}/>
        </div>
        <div className="placeSearch">
          <Search></Search>
          <input type="text" />
          <Arrow></Arrow>
        </div>
        <div className="productSearch">
          <div className="input">
            <input
              type="text"
              placeholder="Find car,mobile phone and more..."
            />
          </div>
          <div className="searchAction">
            <Search color="#ffffff"></Search>
          </div>
        </div>
        <div className="language">
          <span> ENGLISH </span>
          <Arrow></Arrow>
        </div>

        {user ? (
          <div className="loginPage">
            <span>{user.name}</span>
            <a onClick={logout} className='logout'>Logout</a>
          </div>
        ):(
          <div className="loginPage">
            <Link to='/login' className='loginLink'>
              <span>Login</span>
            </Link>
            <span className='divider'>|</span>
            <Link to='/signup' className='signupLink'>
              <span>Signup</span>
            </Link>
          </div>
        )}

        {user && <div className="sellMenu">
          <SellButton></SellButton>
          <div className="sellMenuContent">
            <SellButtonPlus></SellButtonPlus>
            <Link to='/create_post'>
              <span>SELL</span>
            </Link>
          </div>
        </div>
        }
        
      </div>
    </div>
  );
}

export default Header;
