import React from 'react'

const UserCard = ({user}) => {
   //console.log(user);
    const {firstName,lastName,age,gender,about,skills,photoUrl} = user;
   const fullName =`${firstName} ${lastName}`;
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
    {age && gender && (<p>{age + " " + gender} </p>)}
    <p>{about}</p>
    <div className="card-actions justify-center my-3">
      <button className="btn btn-secondary">Interested</button>
       <button className="btn btn-primary">Ignore</button>
    </div>
  </div>
</div>
    </div>
  )
}

export default UserCard
