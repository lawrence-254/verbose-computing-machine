import styled from 'styled-components'
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { set } from 'mongoose';
import {useDispatch} from 'react-redux';
import {login} from '../redux/actions/authActions';


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

const Login = () => {
  const [data, setData] = useState({});
  const [error, setError]=useState('');
  const [loading, setLoading]=useState(false);
  const navigate = useNavigate();


    const handleChange = (e) => {
    const { id, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [id]: value
    }));
  };


const handleSubmit = async (e) => {
  e.preventDefault();
      setLoading(true);
    setError('');
        console.log('Submitting data:', data); // Debug statement


try{
  const response = await fetch('api/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });
  const result = await response.json();
 console.log('Server response:', result); // Debug statement
  if(result.success === false){
    setLoading(false);
    setError(result.message || 'An error has occured');
    return;
  }
  setLoading(false);
  setError('');
  navigate('/', {state: {user: result}});
  }
  catch(err){
    console.log(err);
  }

}
  return (
  <MainContainer>
    <Title>LOGIN</Title>
    <FormContainer>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="emailOrUsername">Email or Username</label>
          <input type="text" className="form-control" id="emailOrUsername"  placeholder='Enter user name or Email' onChange={handleChange}/>
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input type="password" className="form-control" id="password" placeholder='Enter password' onChange={handleChange}/>
        </div>
        <button type="submit" className="btn btn-primary">{loading ? 'Loading...' : 'LOGIN'}</button>
      </form>
    </FormContainer>
    <p>Dont have an account? <Link to="/register">REGISTER</Link></p>
    {error && <p style={{color: 'red'}}>{error}</p>}
  </MainContainer>
  )
}

export default Login
