import React from 'react'
import { Redirect } from 'react-router-dom'
import { useHistory } from 'react-router-dom'
import { getOwnProfile, editProfile } from '../../lib/api'
import useForm from '../../utils/useForm'
import useFetch from '../../utils/useFetch'
import ProfileForm from './ProfileForm'

function ProfileEdit() {
  const { data: profile, error } = useFetch(getOwnProfile)
  const history = useHistory()
  const onSubmitSuccess = () => {
    history.push('/profile')
  }

  const { formData, handleChange, setFormData, formErrors, handleSubmit } = useForm({
    name: ''
  }, editProfile, profile, onSubmitSuccess) 

  React.useEffect(() => {
    if (profile) {
      setFormData(profile)
    }
  }, [profile, setFormData])

  if (error) {
    return <Redirect to="notfound" />
  }


  return (
    <div className="body">
      <div className="edit-prof-form">
        <ProfileForm
          data={formData}
          errors={formErrors}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          submitText="Finish Editing Profile"
        />
      </div>
    </div>
  )
}

export default ProfileEdit
