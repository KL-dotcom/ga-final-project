import React, { useState } from 'react'
import { genderOptions, ageOptions, industryOptions, ethnicityOptions } from '../../lib/userOptions'


function ProfileForm({ data, handleChange, handleSubmit , errors , submitText }) {
// const [colorInt, setColorInt] = useState('purple')
// const [userInterests, setUserInterests] = useState([])

// if (!categories) return null
// const interestNames = interests ? interests.map(interest => { return interest.name}) : ""
// setUserInterests(interestNames)
// const categoryNames = categories.map(category => { return category.name})


// const addToInterests = (e) => {
//   const name = e.target.id
//   const index = interestNames.indexOf(name)

//   if (interestNames.includes(name)) {
//     interestNames.splice(index, 1)
//     console.log('taking out')
//     console.log(interestNames)
//     // setInterestNames(interestNames)

//   } else {
//     interestNames.push(name)
//     console.log('adding')
//     console.log(interestNames)
//     // setInterestNames(interestNames)
//   }
// }
  return (
    <div className="prof-form">
      <h1>Edit your Profile</h1>
      
      <form onSubmit={handleSubmit}>
        <div className="form-item">
          <input
            name="username"
            label="Username"
            placeholder="Username"
            onChange={handleChange}
            value={data.username}
            error={errors.username}
          />
        </div>
          
        <div className="form-item">
          <input
            name="first_name"
            label="firstName"
            placeholder="First Name"
            onChange={handleChange}
            value={data.first_name}
            error={errors.first_name}
          />
        </div>

        <div className="form-item">
          <input
            name="last_name"
            label="LastName"
            placeholder="Last Name"
            onChange={handleChange}
            value={data.last_name}
            error={errors.last_name}
          />
        </div>
        
        <div className="form-item">
          <input
            name="email"
            label="Email"
            placeholder="Email"
            onChange={handleChange}
            value={data.email}
            error={errors.email}
          />
        </div>
        
        <div className="form-item">
          <select
            name="age"
            label="Age"
            placeholder="Age"
            onChange={handleChange}
            value={data.age}
            error={errors.age}>
            {ageOptions.map(age => {return <option value={age.value}>{age.value}</option>})}
            </select>
        </div>

        <div className="form-item">
          <select
            name="gender"
            label="Gender"
            placeholder="Gender"
            onChange={handleChange}
            value={data.gender}
            error={errors.gender}
          >
            {genderOptions.map(gender => {return <option value={gender.value}>{gender.value}</option>})}
            </select>
        </div>

        <div className="form-item">
          <select
            name="industry"
            label="industry"
            placeholder="Industry"
            onChange={handleChange}
            value={data.industry}
            error={errors.industry}
          >
            {industryOptions.map(industry => {return <option value={industry.value}>{industry.value}</option>})}
            </select>
        </div>

        <div className="form-item">
          <select
            name="ethnicity"
            label="ethnicity"
            placeholder="Ethnicity"
            onChange={handleChange}
            value={data.ethnicity}
            error={errors.ethnicity}
          >
            {ethnicityOptions.map(ehtnicity => {return <option value={ehtnicity.value}>{ehtnicity.value}</option>})}
            </select>
        </div>
        <button className="edit-prof-button" onClick={handleSubmit} buttontext={submitText}>{submitText}</button>
      </form>
    </div>
  )
}

export default ProfileForm