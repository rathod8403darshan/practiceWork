import axios from "axios"
import { getRagisterUser } from "../reducers/firstReducer"
import axiosInstance from "../../AxiosInterChepter"


export const  getStarterPlanAction = ()=> {
       try {
       return axiosInstance.get("/subscription/getstarterplandetail").then((res)=> {
           return res.data
        }).catch(error => console.log(error))
       } catch (error) {
            return error
       }
}
export const  createStarterPlan = ()=> {
     try {
          return axiosInstance
            .post("/subscription/create-subscription")
            .then(response => {
               console.log(response);
               
                return response
            })
            .catch((err) => err);
        } catch (error) {
          console.log(error);
        }
}