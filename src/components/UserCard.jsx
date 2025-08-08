import axios from 'axios';
import React from 'react'
import { BASE_URL } from '../utils/constants';
import { useDispatch } from 'react-redux';
import { removeUserfromFeed } from '../utils/feedSlice';

const UserCard = ({user}) => {
  const dispatch = useDispatch();
   //console.log(user);
    const {_id ,firstName,lastName,age,gender,about,skills,photoUrl} = user;
   const fullName =`${firstName} ${lastName}`;
   const handleSendRequest= async (status,_id)=>{
    try{
      const res = await axios.post(BASE_URL+"/connection/sent/"+status+"/"+_id,{},{withCredentials:true});
      dispatch(removeUserfromFeed(_id));
    }
    catch(err){
      console.error(err);
    }
   }
  return (
    <div>
      <div className="card bg-base-300 w-96 shadow-xl ">
  <figure className='my-4'>
    <img
      src= {photoUrl}
      alt={firstName} />
  </figure>
  <div className="card-body">
    <h2 className="card-title">{fullName}</h2>
    {age && (<p>{age}</p>)}
    {gender && (<p>{gender} </p>)}
    <p>{about}</p>
    <div className="card-actions justify-center my-3">
      <button className="btn btn-secondary" onClick = {()=>handleSendRequest("interested",_id)}>Interested</button>
       <button className="btn btn-primary" onClick = {()=>handleSendRequest("ignored",_id)}>Ignore</button>
    </div>
  </div>
</div>
    </div>
  )
}

export default UserCard
