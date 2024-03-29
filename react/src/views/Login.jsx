import React, { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import axiosClient from '../axios-client';
import { useStateContext } from '../context/ContextProvider';

function Login() {
    const passwordRef = useRef();
    const emailRef = useRef();
    const [errors, setErrors] = useState(null);
    const {setUser, setToken} = useStateContext()

    const onSubmit = (e) => {
        e.preventDefault()
        const payload = {
            email: emailRef.current.value,
            password: passwordRef.current.value,
          }
          setErrors(null)
          axiosClient.post('/login', payload)
            .then(({data}) => {
              setUser(data.user)
              setToken(data.token)
            })
            .catch(e => {
              const response = e.response;
              if(response && response.status === 422) {
                // console.log(response.data.errors)
                if(response.data.errors){
                    setErrors(response.data.errors)
                }else{
                    setErrors({
                            email: [response.data.message]
                        })
                }
              }
            })
    }
  return (
    <div className='login-signup-form animated fadeInDown'>
        <div className="form">
            <form action="" onSubmit={onSubmit}>
                <h1 className='title'>Login to your Account</h1>
                {
                  errors && <div className='alert'>
                    {Object.keys(errors).map(key => (
                      <p key={key}>{errors[key][0]}</p>
                    ))}
                  </div>
                }
                <input ref={emailRef} type="email" placeholder='Enter your Email' />
                <input ref={passwordRef} type="password" placeholder='Enter your Password' />
                <button className='btn btn-block'>Login</button>
                <p className="message">
                    Not Registered? <Link to="/signup">Create an account</Link>
                </p>
            </form>
        </div>
    </div>
  )
}

export default Login