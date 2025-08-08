import axios from 'axios'
import React, { useEffect } from 'react'
import { BASE_URL } from '../utils/constants'
import { useDispatch, useSelector } from 'react-redux'
import { addRequests, removeRequests } from '../utils/requestSlice'

const RequestsReceived = () => {
  const requests = useSelector(store => store.requests);
  const dispatch = useDispatch();

  const handleRequest = async(status,_id)=>{
    const res = await axios.post(BASE_URL+"/request/review/"+status+"/"+ _id,{},{ withCredentials : true });
    dispatch(removeRequests(_id));
  }
  const fetchRequests = async () => {
    try {
      const requests = await axios.get(BASE_URL + "/user/requests/received", { withCredentials: true });
      //console.log(requests.data);
      dispatch(addRequests(requests.data));
    }
    catch (err) {
      console.error(err);
    }
  }
  useEffect(() => {
    fetchRequests();
  }, []);

  if (!requests) {
    return;
  }
  if (requests.length === 0) {
    return <h1 className='text-bold text-3xl flex justify-center my-10'>No Requests Found</h1>
  }
  return (
    <div className='my-10 justify-center'>
      <div className='flex justify-center my-10'>
        <h1 className='text-bold text-3xl'>Requests</h1>
      </div>
      <div className='w-100 h-80'>
        {requests.map((request) => {
          //console.log(request);
          const { _id ,firstName, lastName, age, photoUrl, gender, skills, about } = request.fromUserId;
          return (
            <div key={_id} className="hero bg-base-200 h-30">
              <div className="hero-content flex-col lg:flex-row">
                <img
                  src={photoUrl}
                  alt={firstName + " " + lastName}
                  className="w-50 h-40 rounded-lg shadow-2xl " />
                <div>
                  <h1 className="text-3xl font-bold">{firstName + " " + lastName}</h1>
                  <p className="py-6">{about}
                  </p>
                  <button className="btn btn-primary mx-5" onClick={()=> handleRequest("accepted",request._id)} >Accept</button>
                  <button className="btn btn-secondary" onClick={()=>handleRequest("rejected",request._id)}>Reject</button>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default RequestsReceived
