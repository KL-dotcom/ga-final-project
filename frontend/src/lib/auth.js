export const setToken = token => {
  localStorage.setItem('token', token)
}

export const getToken = () => {
  return localStorage.getItem('token')
}

export const logout = () => {
  localStorage.removeItem('token')
}

export const getPayload = () => {
  const token = getToken() 
  if (!token) return false 
  const parts = token.split('.') 
  if (parts.length < 3) return false 
  return JSON.parse(atob(parts[1]))
}

export const isAuthenticated = () => {
  const token = getToken() 
  if (!token) return false 
  const parts = token.split('.') 
  if (parts.length < 3) return false
  return JSON.parse(atob(parts[1]))
} 

export const isOwner = id => {
  const subject = getPayload().sub
  return id === subject
}
