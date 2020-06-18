import React from 'react'

export const genderOptions = [
{value: 'Female'},
{value: 'Male'},
{value: 'Other'}
]

export const ageOptions = []
for (let i = 18; i < 71; i++) {
  ageOptions.push({value: i})
}


export const industryOptions = [
  {value: 'Retail'},
  {value: 'Finance'},
  {value: 'Health Services'},
  {value: 'Accounting and Legal'},
  {value: 'Construction'},
  {value: 'hospitality'},
  {value: 'Information Technology'},
  {value: 'Science and Engineering'},
  {value: 'Arts'},
  {value: 'Agriculture'},
  {value: 'Student'}
]

export const ethnicityOptions = [
  {value: 'Asian or Asian British'},
  {value : 'Black, African, Black British or Caribbean'},
  {value: 'Mixed or Multiple Ethnic Groups'},
  {value: 'White British'},
  {value: 'Another Ethnic Group'}
]