import React from 'react'

import { getOwnProfile } from '../../lib/api'
import useFetch from '../../utils/useFetch'


function ProfilePage() {

  const { data: profile } = useFetch(getOwnProfile)
  

  if (!profile) return null
  console.log(profile)
  return (
    <div className="body">

      <div style={{ marginTop: "10px"}}>
      <img style={{ borderRadius: "50%", border: "7px solid purple", padding: "8px" }} src={profile.profile_images[0].image} alt={profile.name} loading="lazy" width="200" className="image"/>
      
      </div>
      <p style={{fontSize: "35px", marginBottom: "20px"}}>{profile.username}</p>
      <p>{profile.first_name} {profile.last_name}</p>
      <p style={{marginBottom: "20px"}}>{profile.email}</p>
      <p style={{fontSize: "27px"}}>Stats</p>
      <p>{profile.age}</p>
      <p>{profile.gender}</p>
      <p>{profile.industry}</p> 
      Talk interests:{profile.interests.map(interest => <p key={interest.name}>{interest.name}</p>)}
      
      <button>Edit my profile</button>
    </div>

  )
}



export default ProfilePage