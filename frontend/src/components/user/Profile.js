import React from 'react'
import { Link, useHistory, useParams } from 'react-router-dom'
import { getOwnProfile } from '../../lib/api'
import useFetch from '../../utils/useFetch'

function ProfilePage() {
  const { id: profileId } = useParams()
  // const { data: profileId } = useFetch(getOwnProfile, profileId)
  // const { data: events } = useFetch(getAllEvents)
  // const history = useHistory()
console.log()
  return (
    <div className="body">
      <div>Profile page, checking in</div>
    </div>

  )
}



export default ProfilePage