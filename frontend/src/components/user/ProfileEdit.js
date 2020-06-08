import React from 'react'
import { Link } from 'react-router-dom'


import { getOwnProfile } from '../../lib/api'
import useFetch from '../../utils/useFetch'

function ProfileEdit() {

  const { data: profile } = useFetch(getOwnProfile)
  console.log(profile)
  if (!profile) return null
  return (
    <div className="body">
      <div>{profile.username}</div>
      <Link to={`/events/${eventId}/edit`} className="link"><button>Edit</button></Link>

    </div>

  )
}



export default ProfileEdit