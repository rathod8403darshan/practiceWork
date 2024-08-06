import axios from "axios"
import { getRagisterUser } from "../reducers/firstReducer"
import axiosInstance from "../../AxiosInterChepter"

const callApiFunction =  ()=> {
   return axios.get("http://localhost:7000/api/user/getuser").then((res)=> {
       return  res.data
    })
}

export const  ragisterData = (obj)=> {
    return (dispatch)=> {
       try {
       return axios.post("http://localhost:7000/api/user/adduser",obj).then((res)=> {
            dispatch(getAllRagisterData())
           return res.data
        }).catch(error => console.log(error))
       } catch (error) {
            return error
       }
    }
}
export const  getAllRagisterData = ()=> {
    return async (dispatch) => {
     try {
        const data = await callApiFunction()
        dispatch(getRagisterUser(data))
     } catch (error) {
        console.log(error);
        
     }
    }
}

export const  LoginVerifyData = (obj)=> {
   try {
   return axios.post("http://localhost:7000/api/user/loginuser",obj).then(async (res)=> {
       return await res.data
    }).then(err=> err)
   } catch (error) {
        return error
   }
}

export const  resetPassword = (obj)=> {
 
   try {
       return axiosInstance.post("/user/resetpassword",obj).then((res)=> {
         return res.data

      }).catch(err => err.response.data.message)
     } catch (error) {
          console.log(error);
          
     }
  
}