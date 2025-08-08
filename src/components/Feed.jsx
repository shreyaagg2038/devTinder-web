import axios from 'axios'
import React from 'react'
import { useEffect } from 'react';
import { BASE_URL } from '../utils/constants'
import { useDispatch, useSelector } from 'react-redux'
import { addFeed} from '../utils/feedSlice'
import UserCard from './UserCard';
import { useNavigate } from 'react-router-dom';

const Feed = () => {
  const feed = useSelector(store=> store.feed);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const getFeed = async ()=>{
    try{
      const res = await axios.get(BASE_URL+"/user/feed",{withCredentials:true});
      console.log(res.data.data);
      dispatch(addFeed(res?.data?.data));
    }
    catch(err){
      if(err.status === 401){
        return navigate("/login");
      }
      //console.error(err);
    }
    
  }
  useEffect(()=>{
    getFeed();
  },[]);

  if(!feed){
    return ;
  }
  if(feed.length ===0){
    return <h1 className='flex text-bold justify-center text-3xl'>No more users </h1>
  }

  return feed && (
    <div className='flex align-middle justify-center my-10 py-15'>
      <UserCard user={feed[0]}/>
    </div>
  )
}

export default Feed
