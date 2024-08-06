
import axiosInstance from "../../AxiosInterChepter"



export const  userGetData = ()=> {
    
     try {
       return axiosInstance.get("/user/findLoginuser").then((res)=> {
            return  res.data
         }).catch(err => console.log(err)
         )
     } catch (error) {
        console.log(error);
        
     }
    
}
export const  editUserData = (id,obj)=> {

     try {
       return axiosInstance.patch("/user/updateuser/"+id,obj).then((res)=> {
            userGetData()
            
            return  res.data
         }).catch(err => console.log(err)
         )
     } catch (error) {
        console.log(error);
        
     }
    
}

export const  deleteUserFunc = (id)=> {
    
     try {
       return axiosInstance.delete("/user/deleteuser/"+id).then((res)=> {
            return  res.data
         }).catch(err => console.log(err)
         )
     } catch (error) {
        console.log(error);
        
     }
    
}