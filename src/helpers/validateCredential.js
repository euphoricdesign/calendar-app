export const validateCredential = async (credentials) => {
    const response = await axios.post('http://localhost:3000/users/login', credentials)
    
    if (response.status === 200) {
      const user = response.data.user
      dispatch(setUser(user))
      dispatch(setAuthenticated())
      saveUserToLocalStorage(user)
      navigate('/')
      return true
    } 
    else return false
  }