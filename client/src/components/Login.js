import React, { useState } from "react";
import { axiosWithAuth } from '../utils/axiosWithAuth'
import { useHistory } from 'react-router-dom'

const initialLoginValues = {
  username: '',
  password: '',
}

const Login = () => {

  const [ loginValues, setLoginValues ] = useState(initialLoginValues)
  const { push } = useHistory()

  const inputHandler = e =>{
    const name = e.target.name
    const value = e.target.value

    setLoginValues({
      ...loginValues,
      [name]: value
    })
  }
  const loginHandler = e => {
    e.preventDefault()

    axiosWithAuth()
      .post('api/login', loginValues)
      .then( res => {
        // console.log(res.data)
        localStorage.setItem('token', res.data.payload)
        push('/bubbles')
      })
  }
  
  return (
    <div className='loginContainer'>

      <form>
          <legend>login</legend>
          <label>
            username: 
            <input
              name='username'
              onChange={inputHandler}
              value={loginValues.username}
              type='text'
            />
          </label>
          <label>
            password: 
            <input
              name='password'
              onChange={inputHandler}
              value={loginValues.password}
              type='password'
            />
          </label>
          <div className="button-row">
            <button onClick={loginHandler}>Login</button>
          </div>
      </form>
    </div>
  );
};

export default Login;
