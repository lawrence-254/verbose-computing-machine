import { set } from 'mongoose';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components'


const MainContainer = styled.div`
  width: 800px;
  height: 500px;
  margin: auto;
  border: 1px solid #ccc;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 50px;
  box-shadow: 0 0 10px 0 rgba(0,0,0,0.1);
  background-color: #f9f9f9;
  top: 100px;
  position: relative;
  `;

const Title = styled.h4`
  color: grey;
  font-size: 30px;
  text-align: center;
  margin-top: 20px;
  margin-bottom: 10px;
  font-family: 'Roboto', sans-serif;

`
const FormContainer = styled.div`
  width: 90%;
  height: 90%;
  display: flex;
  justify-content: center;
  align-items: center;
  form {
    width: 80%;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .form-group {
    width: 90%;
    margin-bottom: 5px;
  }
  label {
    font-size: 10px;
    margin-bottom: 10px;
  }
  input {
    width: 100%;
    height: 18px;
    font-size: 10px;
    padding: 3px;
  }
  button {
    width: 60%;
    height: 20px;
    font-size: 10px;
    background-color: darkgrey;
    color: white;
    border: none;
    cursor: pointer;
    border-radius: 5px;
    &:hover {
      background-color:  white;
      color: darkgrey;
    }
  }

  `;

const Register = () => {
  const [data, setData]=useState({});
  const [error, setError]=useState('');
  const [loading, setLoading]=useState(false);
  const navigate = useNavigate();


  const handleChange = (e) => {
    setData({...data, [e.target.id]: e.target.value});
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
    setLoading(true);
  const res = await fetch('api/auth/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data)
  });
  const resData = await res.json();
  if (resData.success === false) {
    setLoading(false);
    setError(resData.message || 'An error has occured');
    return;
  }
  setLoading(false);
  setError('');
  navigate('/login');
}catch(err){
  setLoading(false);
  setError(err.message || 'An error has occured');
}
  }
  return (
    <MainContainer>
      <Title>REGISTER</Title>
      <FormContainer>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="firstname">First Name</label>
            <input type="text" className="form-control" id="firstname" placeholder='Enter first name' onChange={handleChange}/>
          </div>

          <div className="form-group">
            <label htmlFor="middlename">Middle Name(Optional)</label>
            <input type="text" className="form-control" id="middlename" placeholder='Enter middle name (optional)' onChange={handleChange}/>
          </div>
          <div className="form-group">
            <label htmlFor="lastname">Last Name</label>
            <input type="text" className="form-control" id="lastname" placeholder='Enter last name' onChange={handleChange}/>
          </div>
           <div className="form-group">
            <label htmlFor="username">User Name</label>
            <input type="text" className="form-control" id="username" placeholder='Enter user name' onChange={handleChange}/>
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input type="email" className="form-control" id="email" placeholder='Enter email' onChange={handleChange}/>
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input type="password" className="form-control" id="password" placeholder='Enter password' onChange={handleChange}/>
          </div>
           <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input type="password" className="form-control" id="confirmPassword" placeholder='Enter password confirmation' onChange={handleChange}/>
          </div>
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? 'REGISTERING...' : 'REGISTER'}
            </button>
        </form>
      </FormContainer>
      <p>Have an account? <Link to="/login">LOGIN</Link></p>
      {error && <p style={{color: 'red'}}>{error}</p>}
    </MainContainer>
  )
}

export default Register
