import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import HocComponent from "./HocComponent";
import Swal from "sweetalert2";
import { resetPassword } from "../redux/action/RagisterAction";
const ResetPassword1 = ({value}) => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const navigate = useNavigate()
  
  
    const onSubmit = async (data) => {
      
      if(window.confirm("Are you sure to reset password")){
       
       const responseData = await resetPassword(data)
              
        console.log(responseData);
        
          if(responseData?.isSuccess){
            Swal.fire({
              icon: "success",
              title: "Password Reset Successfully",
              text: "Please Login Again",
              });
              localStorage.removeItem("accessToken")
              localStorage.removeItem("refreshToken")
              value.setIsLoggedIn(false)
              navigate("/login")
            }
            else{
            Swal.fire({
              title: responseData,
              text: "Please try Again",
              });
          }
      }
      
    };
  return <>
     <form
        onSubmit={handleSubmit(onSubmit)}
        className="lg:w-2/5 md:w-2/3 w-full mx-auto mt-[30px] border p-5 bg-white"
      >
        <div className="mt-3">
          <label htmlFor="email">Email : </label>
          
          <input
            type="email"
            className="border border-5 border-black w-full rounded rounded-[5px] focus:outline-none ps-2 py-1"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Invalid email address",
              },
            })}
            id="email"
            placeholder="Enter your email"
          />
          {errors.email && (
            <div className="ps-3 mt-3 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400">
              {errors.email.message}
            </div>
          )}
        </div>
        <div className="mt-3">
          <label htmlFor="password">Old password :</label>
          <br />
          <input
            type="password"
            className="border border-5 border-black w-full rounded rounded-[5px] focus:outline-none ps-2 py-1"
            {...register("password", {
              required: "Password is required",
              pattern: {
                value: /^(?=.*[~`!@#$%^&*()_+-={}\[\]|\\:;"'<>,.?/]).*$/,
                message: "Password must contain at least one Special Symbol",
              },
            })}
            id="password"
            placeholder="Enter your old  password"
          />
          {errors.password && (
            <div className="ps-3 mt-3 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400">
              {errors.password.message}
            </div>
          )}
        </div>

        <div className="mt-3">
          <label htmlFor="newPassword">New Password :</label>
          <br />
          <input
            type="password"
            className="border border-5 border-black w-full rounded rounded-[5px] focus:outline-none ps-2 py-1"
            {...register("newPassword", {
              required: "New Password is required",
              pattern: {
                value: /^(?=.*[~`!@#$%^&*()_+-={}\[\]|\\:;"'<>,.?/]).*$/,
                message: "newPassword must contain at least one Special Symbol",
              },
            })}
            id="newPassword"
            placeholder="Enter new newPassword"
          />
          {errors.newPassword && (
            <div className="ps-3 mt-3 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400">
              {errors.newPassword.message}
            </div>
          )}
        </div>
        <button
          type="submit"
          className="mt-4 py-2 px-6 bg-blue-500 text-white rounded-[5px] hover:outline outline-1 outline-blue-500 hover:bg-transparent hover:text-black transition"
        >
          Reste Password
        </button>
        <button
          type="button"
          onClick={() => reset()}
          className="mt-4 py-2 px-6 bg-red-500 ms-5 text-white rounded-[5px] hover:outline outline-1 outline-red-500 hover:bg-transparent hover:text-black transition"
        >
          Reset
        </button>
      </form>
    
  </>;
};

export default HocComponent(ResetPassword1);
