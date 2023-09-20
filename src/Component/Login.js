// import React from 'react'

// function Login() {
//   return (
//     <div>
//   <h1>Login Page</h1>

//   <form>
//   <input
//   type="email"
//   placeholder='Email'
//   />
//   <br/>

// <input
//   type="password"
//   placeholder='Password'
//   />

//   <br/>
//   <button type='submit'>Login</button>

//   </form>

//     </div>
//   )
// }

// export default Login

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const navigate = useNavigate(); 
  const [formData, setFormData] = useState({ email: '', password: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:6003/login', formData);
      console.log(response.data);
      navigate('/home');
    } catch (error) {
      console.error(error.response.data);
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <input 
             type="text" 
             name="email" 
             placeholder='Email' 
             value={formData.email}
             onChange={handleChange}
              />
              
        </div>
        <div>
          <input
              type="password"
              name="password" 
              placeholder='Password'
              value={formData.password} 
              onChange={handleChange} 
              />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;