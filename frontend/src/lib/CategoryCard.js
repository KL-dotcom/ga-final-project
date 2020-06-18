import React from 'react'


function CategoryCard({ name, id, style, addToInterests }) {
  return (
    <div onClick={addToInterests} id={name} style={style}>
      {name} - {id}
  </div>
  )
}

export default CategoryCard