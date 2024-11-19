
// Login.js
import React, { useState } from 'react';

import Logo from '../../olx-logo.png';
import './Login.css';
import { useFirebase } from '../../store/FirebaseContext';
import { Link, useNavigate } from 'react-router-dom';

function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const { logIn, googleSignIn } = useFirebase()
    
    const navigate = useNavigate()

    const handleLogin = async (e) => {
        e.preventDefault()
        setError('')

        if (email && password){
            try{
                await logIn(email, password);
                navigate('/')
            }catch (error){
                console.log(error)
                setError('Failed to Sign In. Please try again. ' + error.message)
            }
        } else {
            setError('Fill all fields')
        }
    }


    return (
        <div className='py-28 flex items-center justify-center'>
            <div className="loginParentDiv w-72 flex flex-col items-center" >
                <img width="200px" height="200px" src={Logo}></img>
                <form onSubmit={handleLogin} className='w-full'>
                    <label htmlFor="fname">Email</label>
                    <br />
                    <input
                        className="border border-black w-full"
                        type="email"
                        id="fname"
                        name="email"
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <br />
                    <label htmlFor="lname">Password</label>
                    <br />
                    <input
                        className="border border-black w-full"
                        type="password"
                        id="lname"
                        name="password"
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <br />
                    
                    <br />
                    {error && <p className='text-red-500 text-xs my-2 text-center'>{error}</p>}
                    <button>Login</button>
                    <br/>
                </form>
                <Link to='/signup' ><p>Signup</p></Link>
            </div>
        </div>
    );
}

export default Login;
