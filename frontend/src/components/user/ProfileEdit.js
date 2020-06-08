import React from 'react'
import { Link } from 'react-router-dom'


import { getOwnProfile, getCategories } from '../../lib/api'
import useFetch from '../../utils/useFetch'




function ProfileEdit() {

  const { data: profile } = useFetch(getOwnProfile)
  const { data: categories } = useFetch(getCategories)
  console.log(categories)
  if (!profile) return null
  return (
    <div className="body">

      <form className="body">
      <input
      className="input"
      name={profile.username}> </input>

      {/* <div style={{ marginTop: "10px"}}>
      <img style={{ borderRadius: "50%", border: "7px solid purple", padding: "8px" }} src={profile.profile_images[0].image} alt={profile.name} loading="lazy" width="200" className="image"/>
      
      </div>
      <p style={{fontSize: "35px", marginBottom: "20px"}}>{profile.username}</p>
      <p>{profile.first_name} {profile.last_name}</p>
      <p style={{marginBottom: "20px"}}>{profile.email}</p>
      <p style={{fontSize: "27px"}}>Stats</p>
      <p>{profile.age}</p>
      <p>{profile.gender}</p>
      <p>{profile.industry}</p> 
      Talk interests:{profile.interests.map(interest => <p key={interest.name}>{interest.name}</p>)} */}
      
      <button>Finish Editting</button>

      </form>
      
      {/* <Link to={`/events/${eventId}/edit`} className="link"><button>Edit</button></Link> */}

    </div>

  )
}



export default ProfileEdit