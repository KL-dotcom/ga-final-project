import React, { useState } from 'react'
import Select from 'react-select'
import CategoryCard from '../../lib/CategoryCard'


function ProfileForm({ data, handleChange, handleSubmit , errors , submitText, categories, interests }) {
const [colorInt, setColorInt] = useState('purple')
// const [userInterests, setUserInterests] = useState([])

if (!categories) return null
const interestNames = interests ? interests.map(interest => { return interest.name}) : ""
// setUserInterests(interestNames)
// const categoryNames = categories.map(category => { return category.name})


const addToInterests = (e) => {
  const name = e.target.id
  const index = interestNames.indexOf(name)

  if (interestNames.includes(name)) {
    interestNames.splice(index, 1)
    console.log('taking out')
    console.log(interestNames)
    // setInterestNames(interestNames)

  } else {
    interestNames.push(name)
    console.log('adding')
    console.log(interestNames)
    // setInterestNames(interestNames)
  }
}



  return (
    <div className="event-form">
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
          <input
            name="age"
            label="age"
            placeholder="Age"
            onChange={handleChange}
            value={data.age}
            error={errors.age}
          />
        </div>

        <div className="form-item">
          <input
            name="gender"
            label="Gender"
            placeholder="Gender"
            onChange={handleChange}
            value={data.gender}
            error={errors.gender}
          />
        </div>

        <div className="form-item">
          <input
            name="industry"
            label="industry"
            placeholder="Industry"
            onChange={handleChange}
            value={data.industry}
            error={errors.industry}
          />
        </div>



        Interested in events about:
  {categories ? categories.map( category => 
  <CategoryCard
  addToInterests={addToInterests}
  style={interestNames.includes(category.name) ? { color: colorInt } : { color: "black" }}
  key={category.name}
  {...category}
  interests={data.interests}
  />) : ""}
        
        
        





        <button onClick={handleSubmit} buttontext={submitText}>{submitText}</button>
      </form>
    </div>
  )
}

export default ProfileForm