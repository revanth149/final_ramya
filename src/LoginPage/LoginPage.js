import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../AuthContext';
import { useNavigate } from 'react-router-dom';



const LoginPage = (props) => {
  const history=useNavigate()
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const [error, setError] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

  
    axios
    .post('http://159.203.160.62:3002/login', formData)
    .then((response) => {
      setSuccessMessage(response.data.message);
      if(response.data.user) {
        localStorage.setItem('userId', (response.data.user._id.toString()));
       
      }
      localStorage.setItem('token',(response.data.token))
      login();
      setIsLoggedIn(true);
      props.callBack(true);
      history('/')
    })
    .catch((error) => {
      setError('');
      setSuccessMessage('Invalid username or password');
    })
  };



  return (
    <section style={{ textAlign: 'center', padding: '20px',position:'relative' }}>
    <section style={{ display: 'inline-block', textAlign: 'left' }}>
      <h2 style={{marginLeft:'50px',fontSize:'20px'}}>Login</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleLogin}>
        <label htmlFor="username" >Username:</label>
        <input
          type="text"
          id="username"
          name="username"
          value={formData.username}
          onChange={handleInputChange}
          required
          style={{marginTop:'10px',marginBottom:'20px',marginLeft:'5px'}}
        />
        <br />
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleInputChange}
          required
          style={{marginBottom:'10px',marginLeft:'5px'}}
        />
        <br />
        <button type="submit" style={{marginLeft:'50px',fontWeight:'600',letterSpacing:'0.05em'}}>Login</button>
      </form>
    </section>
  </section>
  );
};

export default LoginPage;