import {jwtDecode} from "jwt-decode"

const FromToken = () => {
   const token = localStorage.getItem('token')
   if (token) {
      const userDecode = jwtDecode(token)
      const { _id, userName, name, email, phone, role,cart } = userDecode
      
      return { _id, userName, name, email, phone, role,cart }

   }
   return null

}
export default FromToken
