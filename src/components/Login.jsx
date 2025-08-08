import React from 'react';
import { useState } from 'react';
import axios from "axios"
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';
import { Link, useNavigate } from 'react-router-dom';
import { BASE_URL } from '../utils/constants';
import Signup from './Signup'

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [firstName,setFirstName] = useState("");
    const [lastName,setLastName] = useState("");
    const [isLoginForm,setIsLoginForm] = useState(true);
    const [error,setError] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSignUp = async ()=>{
        try{
            const res = await axios.post(BASE_URL + "/signup",{email, password,firstName, lastName}, { withCredentials: true }
            );
            console.log(res.data);
            dispatch(addUser(res.data));
            return navigate("/profile");
        }
        catch(err){
            setError(err?.response?.data || "Something went wrong");
        }
    }

    const handleLogin = async () => {
        setError("");
        try {
            const res = await axios.post(BASE_URL + "/login",
                { email, password }, { withCredentials: true }
            );
            dispatch(addUser(res.data));
            return navigate("/feed");
        }
        catch (err) {
            setError(err?.response?.data || "Something went wrong");
            //console.error(err);
        }
    }
    return (
        <div className="flex justify-center my-40">
            <div className="card bg-base-300 w-96 shadow-xl align-middle justify-center ">
                <div className="card-body">
                    <h2 className="card-title justify-center">{isLoginForm ? "Login" : "SignUp"}</h2>
                    <div>
                        <label className="form-control w-full max-w-xs my-2">
                            <div className="label">
                                <span className="label-text">Email</span>
                            </div>
                            <input type="email" placeholder="Email" value={email} onChange={(e) => { setEmail(e.target.value) }}
                                className="input input-bordered w-full max-w-xs" />
                        </label>
                        <label className="form-control w-full max-w-xs my-2">
                            <div className="label">
                                <span className="label-text">Password</span>
                            </div>
                            <input type="password" placeholder="Password" value={password} className="input input-bordered w-full max-w-xs" onChange={(e) => { setPassword(e.target.value) }} />
                        </label>
                        {!isLoginForm && (
                            <div>
                        <label className="form-control w-full max-w-xs my-2">
                            <div className="label">
                                <span className="label-text">First Name</span>
                            </div>
                            <input type="text" placeholder="First Name" value={firstName} onChange={(e) => { setFirstName(e.target.value) }}
                                className="input input-bordered w-full max-w-xs" />
                        </label>
                        <label className="form-control w-full max-w-xs my-2">
                            <div className="label">
                                <span className="label-text">Last Name</span>
                            </div>
                            <input type="text" placeholder="Last Name" value={lastName} onChange={(e) => { setLastName(e.target.value) }}
                                className="input input-bordered w-full max-w-xs" />
                        </label>
                        </div>)}

                    </div>
                    {/* <Link to="/signup" className='text-blue-400'>Don't have an account?</Link> */}
                    <p className='text-red-500'>{error}</p>
                    <div className="card-actions justify-center">
                        <button className="btn btn-primary" onClick = {isLoginForm ? handleLogin : handleSignUp}>{isLoginForm ? "Login" : "SignUp"}</button>
                    </div>
                    <div>
                        <button onClick={()=>{setIsLoginForm(!isLoginForm)}}>{isLoginForm ? "Don't have an account? SignUp" : "Already an Existing User. Please Login..."}</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login
