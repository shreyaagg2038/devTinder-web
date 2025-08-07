import React from 'react';
import { useState } from 'react';
import axios from "axios"
import { useDispatch } from 'react-redux';
import {addUser} from '../utils/userSlice';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../utils/constants';

const Login = () => {
    const [email,setEmail] = useState("shreya@gmail.com");
    const [password,setPassword] = useState("Shreya@12345");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogin = async ()=>{
        try{
            const res = await axios.post(BASE_URL+"login",
                {email,password},{withCredentials:true}
            );
            dispatch(addUser(res.data));
            return navigate("/");
        }
        catch(err){
            console.error(err);
        }
    }
  return (
    <div className="flex justify-center my-40">
    <div className="card bg-base-300 w-96 shadow-xl align-middle justify-center ">
    <div className="card-body">
    <h2 className="card-title justify-center">Login</h2>
    <div>
        <label className="form-control w-full max-w-xs my-2">
        <div className="label">
            <span className="label-text">Email</span>
        </div>
        <input type="email" placeholder="Email" value = {email} onChange = {(e)=>{setEmail(e.target.value)}}
            className="input input-bordered w-full max-w-xs" />
        </label>
        <label className="form-control w-full max-w-xs my-2">
    <div className="label">
        <span className="label-text">Password</span>
    </div>
    <input type="text" placeholder="Password" value = {password} className="input input-bordered w-full max-w-xs" onChange = {(e)=>{setPassword(e.target.value)}} />
    </label>
    </div>
    
        <div className="card-actions justify-center">
        <button className="btn btn-primary" onClick={handleLogin}>Login</button>
        </div>
    </div>
    </div>
    </div>
  )
}

export default Login
