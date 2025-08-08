import axios from 'axios'
import React, { useEffect } from 'react'
import { BASE_URL } from '../utils/constants';
import { connect, useDispatch, useSelector } from 'react-redux';
import { addConnections } from '../utils/connectionSlice';

const Connections = () => {
    const connections = useSelector(store => store.connections)
    const dispatch = useDispatch();
    const fetchConnections = async () => {
        try {
            const res = await axios.get(BASE_URL + "/user/connections", { withCredentials: true });
            console.log(res.data);
            dispatch(addConnections(res.data));
        }
        catch (err) {
            console.error(err);
        }
    }

    useEffect(() => {
        fetchConnections();
    }, [])

    if (!connections) {
        return;
    }
    if (connections.length === 0) {
        return <h1 className='text-bold text-3xl'>No Connections Found</h1>
    }
    return (
        <div className='my-10 justify-center'>
            <div className='flex justify-center my-10'>
            <h1 className='text-bold text-3xl'>Connections</h1>
            </div>
            <div className='w-100 h-80'>
            {connections.map((connection) => {
                const { _id,firstName, lastName, age, photoUrl,gender, skills, about } = connection;
                return (
                    <div key={_id} className="hero bg-base-200 h-30">
                        <div className="hero-content flex-col lg:flex-row">
                            <img
                                src={photoUrl}
                                className="w-50 h-40 rounded-lg shadow-2xl " />
                            <div>
                                <h1 className="text-3xl font-bold">{firstName + " " + lastName}</h1>
                                <p className="py-6">{about}
                                </p>
                            </div>
                        </div>
                    </div>
                )
            })}
            </div>
        </div>
    )
}

export default Connections
