import React from 'react'
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


if (!data.profile_images) return null
// console.log(data)
  return (
    <div className="prof-form">
      <h1>Edit your Profile</h1><hr></hr>
      
      <form onSubmit={handleSubmit}>
      <div className="form-item">
        Profile Image<br></br>
          <input
            name="profile_image"
            label="Profile Images"
            placeholder="Profile Pic Url"
            onChange={handleChange}
            // value={data.profile_images[0].image}
            value={data.profile_image}
            error={errors.profile_image}
          />
        </div><hr></hr>

        <div className="form-item">
          Username<br></br>
          <input
            name="username"
            label="Username"
            placeholder="Username"
            onChange={handleChange}
            value={data.username}
            error={errors.username}
          />
        </div><hr></hr>
          
        <div className="form-item">
          First Name<br></br>
          <input
            name="first_name"
            label="firstName"
            placeholder="First Name"
            onChange={handleChange}
            value={data.first_name}
            error={errors.first_name}
          />
        </div><hr></hr>

        <div className="form-item">
          Last Name<br></br>
          <input
            name="last_name"
            label="LastName"
            placeholder="Last Name"
            onChange={handleChange}
            value={data.last_name}
            error={errors.last_name}
          />
        </div><hr></hr>
        
        <div className="form-item">
          Email<br></br>
          <input
            name="email"
            label="Email"
            placeholder="Email"
            onChange={handleChange}
            value={data.email}
            error={errors.email}
          />
        </div><hr></hr>

        <div className="form-item">
          Age<br></br>
          <select
            name="age"
            label="Age"
            placeholder="Age"
            onChange={handleChange}
            value={data.age}
            error={errors.age}>
            {ageOptions.map(age => {return <option key={age.value} value={age.value}>{age.value}</option>})}
            </select>
        </div><hr></hr>

        <div className="form-item">
          Gender<br></br>
          <select
            name="gender"
            label="Gender"
            placeholder="Gender"
            onChange={handleChange}
            value={data.gender}
            error={errors.gender}
          >
            {genderOptions.map(gender => {return <option key={gender.value} value={gender.value}>{gender.value}</option>})}
            </select>
        </div><hr></hr>

        <div className="form-item">
          Industry Profession<br></br>
          <select
            name="industry"
            label="industry"
            placeholder="Industry"
            onChange={handleChange}
            value={data.industry}
            error={errors.industry}
          >
            {industryOptions.map(industry => {return <option key={industry.value} value={industry.value}>{industry.value}</option>})}
            </select>
        </div><hr></hr>

        <div className="form-item">
          Ethnicity<br></br>
          <select
            name="ethnicity"
            label="ethnicity"
            placeholder="Ethnicity"
            onChange={handleChange}
            value={data.ethnicity}
            error={errors.ethnicity}
          >
            {ethnicityOptions.map(ethnicity => {return <option key={ethnicity.value} value={ethnicity.value}>{ethnicity.value}</option>})}
            </select> <hr></hr>
        </div>
        <button className="finish-edit-button" onClick={handleSubmit} buttontext={submitText}>{submitText}</button>
      </form>
    </div>
  )
}

export default ProfileForm