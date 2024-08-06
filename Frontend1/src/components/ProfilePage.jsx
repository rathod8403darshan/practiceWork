import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { deleteUserFunc, userGetData } from '../redux/action/profile';
import HocComponent from './HocComponent';
import "./Profile.css"
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline'
import EditProfileComponent from './EditProfileComponent';
import Swal from 'sweetalert2';

const ProfilePage = ({value}) => {
    const [getuser, setGetuser] = useState([]);
    const [open, setOpen] = useState(false)
    const [model, setModel] = useState(false)
    const navigate = useNavigate()


    useEffect(() => {
      getUserFunction()
    }, [])

    const getUserFunction = async ()=> {
      const data = await userGetData()
      setGetuser([data.data])
      
    }  

    const editProfile = (id)=>{
      setModel(true)
    }

    const deletedata = async (id)=>{
       const response =  await deleteUserFunc(id)
        console.log(response);

        if(response?.isSuccess){
          Swal.fire({
            icon: "success",
          });
          localStorage.removeItem("accessToken")
          localStorage.removeItem("refreshToken")
          value.setIsLoggedIn(false)
          navigate("/login");
        }
    } 
    
  return <>
        <div className="w-full text-center  mt-5">
   <h5 className="text-light font-bold" style={{ letterSpacing: "1px" }}>Profile</h5>
  </div>


<div className="container mx-auto">
    <div className="main-body">
        {getuser?.map((x,i)=> (
          <div className="flex flex-wrap -mx-4" key={x._id}>

          <div className="w-full md:w-1/3 px-4 mb-4">
              <div className="card">
                  <div className="card-body">
                      <div className="flex flex-col items-center">
                          <img src={x.file} alt="Admin" className="rounded-full w-32 h-32 object-cover"/>
                          <div className="mt-3">
                              <h4 className="text-xl font-bold">{x.firstname} {x.lastname}</h4>
                              <p className="text-gray-500 text-sm">{x.country} , {x.state} , {x.city}</p>
                              <button className="btn btn-primary mt-2 py-2 px-4 bg-blue-500 text-white rounded-[5px] hover:outline outline-1 outline-blue-500 hover:bg-transparent hover:text-black transition">Follow</button>
                              <button className="btn btn-outline-primary mt-2 ms-2 py-2 px-5 bg-green-500 ms-3 text-white rounded-[5px] hover:outline outline-1 outline-green-500 hover:bg-transparent hover:text-black transition">Message</button>
                          </div>
                      </div>
                  </div>
              </div>
            
          </div>

          <div className="w-full md:w-2/3 px-4">
              <div className="card mb-4">
                  <div className="card-body">
                      <div className="flex flex-col md:flex-row">
                          <div className="w-full md:w-1/3">
                              <h6 className="mb-1">Full Name</h6>
                          </div>
                          <div className="w-full md:w-2/3 text-gray-600">
                            {x.firstname} {x.lastname}
                          </div>
                      </div>
                      <hr className="my-2"/>
                      <div className="flex flex-col md:flex-row">
                          <div className="w-full md:w-1/3">
                              <h6 className="mb-1">Email</h6>
                          </div>
                          <div className="w-full md:w-2/3 text-gray-600">
                              {x.email}
                          </div>
                      </div>
                      <hr className="my-2"/>
                      <div className="flex flex-col md:flex-row">
                          <div className="w-full md:w-1/3">
                              <h6 className="mb-1">Phone</h6>
                          </div>
                          <div className="w-full md:w-2/3 text-gray-600">
                              {x.phoneno}
                          </div>
                      </div>
                      <hr className="my-2"/>
                      <div className="flex flex-col md:flex-row">
                          <div className="w-full md:w-1/3">
                              <h6 className="mb-1">Gender</h6>
                          </div>
                          <div className="w-full md:w-2/3 text-gray-600">
                              {x.setgender}
                          </div>
                      </div>
                      <hr className="my-2"/>
                      <div className="flex flex-col md:flex-row">
                          <div className="w-full md:w-1/3">
                              <h6 className="mb-1">Date of birth</h6>
                          </div>
                          <div className="w-full md:w-2/3 text-gray-600">
                              {x.dateOfBirth}
                          </div>
                      </div>
                      <hr className="my-2"/>
                      <div className="flex justify-start">
                          <button className="mt-4 py-2 px-6 bg-yellow-500 ms-5 text-white rounded-[5px] hover:outline outline-1 outline-yellow-500 hover:bg-transparent hover:text-black transition" onClick={()=>editProfile(x._id)}>Edit Profile</button>
                          <button className="mt-4 py-2 px-6 bg-red-500 ms-5 text-white rounded-[5px] hover:outline outline-1 outline-yellow-500 hover:bg-transparent hover:text-black transition" onClick={()=> setOpen(true)}>Delete Account</button>
                          <Link to={"/resetpassword"} className='ms-5 mt-8 text-blue-700' >Reset password</Link>
                      </div>
                  </div>
              </div>
          </div>


          <Dialog open={open} onClose={setOpen} className="relative z-10">
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
      />

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <DialogPanel
            transition
            className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-lg data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
          >
            <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
              <div className="sm:flex sm:items-start">
                <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                  <ExclamationTriangleIcon aria-hidden="true" className="h-6 w-6 text-red-600" />
                </div>
                <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                  <DialogTitle as="h3" className="text-base font-semibold leading-6 text-gray-900">
                    Deactivate account
                  </DialogTitle>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      Are you sure you want to deactivate your account? All of your data will be permanently removed.
                      This action cannot be undone.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
              <button
                type="button"
                onClick={() => deletedata(x._id)}
                className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
              >
                Deactivate
              </button>
              <button
                type="button"
                data-autofocus
                onClick={() => setOpen(false)}
                className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
              >
                Cancel
              </button>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
      </div>

      
        ))}

    </div>
</div>





<div id="authentication-modal" tabIndex="-1" aria-hidden="true" className={`${!model ? "hidden" : ""} w-full bg-[#4c4c4c70] overflow-auto min-h-screen   absolute top-0 p-0 m-0 z-50 justify-center items-center "`}>
    <div className="relative p-4  h-full">
        <div className="w-1/3 absolute bg-zink-300 h-fu  start-[50%]  translate-x-[-50%]    bg-white rounded-lg shadow dark:bg-gray-700">
            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                    Sign in to our platform
                </h3>
                <button type="button" className="end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="authentication-modal" onClick={()=> setModel(false)}> 
                    <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                    </svg>
                    <span className="sr-only">Close modal</span>
                </button>
            </div>
                  <EditProfileComponent getUser={getuser} setGetuser={setGetuser} setModel={setModel}/>
            <div className="">
            </div>
        </div>
    </div>
</div> 
  </>;
};

export default HocComponent(ProfilePage);
