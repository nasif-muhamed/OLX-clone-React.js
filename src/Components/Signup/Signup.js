import React, { useState } from 'react';
import Logo from '../../olx-logo.png';
import './Signup.css';
import { useFirebase } from '../../store/FirebaseContext';
import { Link, useNavigate } from 'react-router-dom'

export default function Signup() {
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')

    const { signUp } = useFirebase()
    const Navigate = useNavigate()
    
    const handleSubmit = async (e) => {
        e.preventDefault()
        setError('')
        if (username && email && phone && password){
            let phoneNum = String(parseInt(phone))
            if (phoneNum.length == 10){
                try{
                    await signUp(email, password, phoneNum, username)
                    Navigate('/')
                }catch (error){
                    console.log(error.message, error)
                    setError('Failed to Sign In. Please try again. ' + error.message)
                }
            } else {
                setError('Enter a valid phone number')
            }
        } else {
            setError('Fill all fields')
        }
    }

    return (
        <div className='py-28  flex items-center justify-center'>
            <div className="signupParentDiv w-72 flex flex-col items-center">
                {/* <button onClick={()=>console.log(auth.currentUser.email, auth.currentUser.displayName)}>user</button> */}
                <img width="200px" height="200px" src={Logo}></img>
                <form onSubmit={handleSubmit} className='w-full' >
                    <label htmlFor="fname">Username</label>
                    <br />
                    <input
                        className="border border-black w-full"
                        type="text"
                        id="fname"
                        name="name"
                        onChange={(e)=>setUsername(e.target.value)}
                        required
                    />
                    <br />
                    <label htmlFor="fname">Email</label>
                    <br />
                    <input
                        className="border border-black w-full"
                        type="email"
                        id="fname"
                        name="email"
                        onChange={(e)=>setEmail(e.target.value)}
                        required
                    />
                    <br />
                    <label htmlFor="lname">Phone</label>
                    <br />
                    <input
                        className="border border-black w-full"
                        type="number"
                        id="lname"
                        name="phone"
                        onChange={(e)=>setPhone(e.target.value)}
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
                        onChange={(e)=>setPassword(e.target.value)}
                        required
                    />
                    <br />
                    <br />
                    <button>Signup</button>
                    {error && <p className='text-red-500 text-xs my-2 text-center'>{error}</p>}
                </form>
                <Link to='/login' ><p>Login</p></Link>
            </div>
        </div>
    );
}
