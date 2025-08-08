import React, { useState } from 'react'
import UserCard from './UserCard';
import axios from 'axios';
import { BASE_URL } from '../utils/constants';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';

const EditProfile = ({ user }) => {
    const [firstName, setFirstName] = useState(user.firstName);
    const [lastName, setLastName] = useState(user.lastName);
    const [photoUrl, setPhotoUrl] = useState(user.photoUrl);
    const [age, setAge] = useState(user.age);
    const [gender, setGender] = useState(user.gender);
    const [about, setAbout] = useState(user.about);
    const [error, setError] = useState("");
    const dispatch = useDispatch();
    const [showToast, setShowToast] = useState(false)


    const saveProfile = async () => {
        setError("");
        try {
            const res = await axios.patch(BASE_URL + "/profile/edit", { firstName, lastName, photoUrl, age, gender, about }, { withCredentials: true });
            dispatch(addUser(res?.data?.data));
            setShowToast(true);
            setTimeout(() => { setShowToast(false) }, 3000);
        }
        catch (err) {
            setError(err.response.data);
            console.error(err);
        }
    }
    return (

        <div className='flex justify-center my-5'>
            {showToast && (<div className="toast toast-top toast-center">
                <div className="alert alert-success">
                    <span>Profile saved successfully.</span>
                </div>
            </div>)}
            <div>
                <div className="flex justify-center mx-10">
                    <div className="card bg-base-300 w-96 h-97 shadow-xl align-middle justify-center ">
                        <div className="card-body">
                            <h2 className="card-title justify-center">Edit Profile</h2>
                            <div>
                                <label className="form-control w-full max-w-xs my-2">
                                    <div className="label">
                                        <span className="label-text">First Name</span>
                                    </div>
                                    <input type="email" placeholder="Email" value={firstName} onChange={(e) => { setFirstName(e.target.value) }}
                                        className="input input-bordered w-full max-w-xs" />
                                </label>
                                <label className="form-control w-full max-w-xs my-2">
                                    <div className="label">
                                        <span className="label-text">Last Name</span>
                                    </div>
                                    <input type="text" placeholder="Password" value={lastName} className="input input-bordered w-full max-w-xs" onChange={(e) => { setLastName(e.target.value) }} />
                                </label>
                                <label className="form-control w-full max-w-xs my-2">
                                    <div className="label">
                                        <span className="label-text">Photo Url</span>
                                    </div>
                                    <input type="text" placeholder="PhotoUrl" value={photoUrl} className="input input-bordered w-full max-w-xs" onChange={(e) => { setPhotoUrl(e.target.value) }} />
                                </label>
                                <label className="form-control w-full max-w-xs my-2">
                                    <div className="label">
                                        <span className="label-text">Age</span>
                                    </div>
                                    <input type="number" placeholder="age" value={age} onChange={(e) => { setAge(e.target.value) }}
                                        className="input input-bordered w-full max-w-xs" />
                                </label>
                                <label className="form-control w-full max-w-xs my-2">
                                    <div className="label">
                                        <div className="dropdown dropdown-hover">
                                            <div tabIndex={0} role="button" className="btn m-1">{gender ? gender : "Select Gender"} </div>
                                            <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
                                                <li><a onClick={() => {setGender("Male")}}>Male</a></li>
                                                <li><a onClick={() => setGender("Female")}>Female</a></li>
                                                <li><a onClick={() => setGender("others")}>Others</a></li>
                                                <li><a onClick={() => setGender("")}>None</a></li>
                                            </ul>
                                        </div>
                                    </div>
                                </label>
                                <label className="form-control w-full max-w-xs my-2">
                                    <div className="label">
                                        <span className="label-text">About</span>
                                    </div>
                                        <textarea className="textarea textarea-bordered h-24" placeholder="Bio" value={about} onChange={(e) => { setAbout(e.target.value) }}></textarea>
                                </label>
                            </div>
                            <p className='text-red-500'>{error}</p>
                            <div className="card-actions justify-center">
                                <button className="btn btn-primary" onClick={saveProfile}>Save Profile </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <UserCard user={{ firstName, lastName, photoUrl, age, gender, about }}></UserCard>
        </div>
    )
}

export default EditProfile
