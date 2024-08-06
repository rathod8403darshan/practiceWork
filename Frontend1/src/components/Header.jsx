import React, { useContext, useEffect, useState } from "react";
import { Link,  NavLink,  useNavigate } from "react-router-dom";
import { creatContext1 } from "../App";
import { FaUserCircle } from "react-icons/fa";

const Header = () => {
  const value = useContext(creatContext1)
  
    const navigate = useNavigate()
    const LogOutButton =()=> {
      localStorage.removeItem("accessToken")
      localStorage.removeItem("refreshToken")
      value.setIsLoggedIn(false)
      navigate("/login");
    }
    

    const showProfile = ()=> {

    }
   
  return (
    <>
    
      {value.IsLoggedIn ?   <header>
        <nav className="bg-zinc-700 text-white border-gray-200 px-4 lg:px-6 py-2.5 dark:bg-gray-800 sticky top-0 z-[99]">
          <div className="flex flex-wrap justify-between items-center mx-auto  max-w-[87%]">
            <a href="" className="flex items-center">
              <img
                src="https://flowbite.com/docs/images/logo.svg"
                className="mr-3 h-6 sm:h-9"
                alt="Flowbite Logo"
              />
              <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
                Project
              </span>
            </a>
            <div className="flex items-center lg:order-2">
                <button
                onClick={LogOutButton}
                className="text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800"
              >
               Logout
              </button>

              <button
                data-collapse-toggle="mobile-menu-2"
                type="button"
                className="inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                aria-controls="mobile-menu-2"
                aria-expanded="false"
              >
                <span className="sr-only">Open main menu</span>
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                <svg
                  className="hidden w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </button>
              <NavLink activeclassname="active"
                to={"/profile"}
                onClick={showProfile}
                className="text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800"
              >
              <FaUserCircle className="text-[25px]"/>
              </NavLink> 
              <NavLink activeclassname="active"
                to={"/subscrib"}
                className="rounded-2xl"
              >
                <button className="py-2 px-6 bg-blue-600 rounded-sm text-white">Subscribtion</button>
              </NavLink> 
            </div>
            <div
              className="hidden justify-between items-center w-full lg:flex lg:w-auto lg:order-1"
              id="mobile-menu-2"
            >
              <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
                <li></li>
                <li>
                  <NavLink activeclassname="active"
                    to="/home"
                    className="px-4 py-1"
                  >
                    Home
                  </NavLink>
                </li>
                <li>
                </li>
                <li>
                  <NavLink activeclassname="active"
                    to="/createproduct"
                    className="px-4 py-1"
                  >
                    Create product
                  </NavLink>
                </li>
                <li>
                  <NavLink activeclassname="active"
                    to="/cart"
                    className="px-4 py-1"
                  >
                    Cart
                  </NavLink>
                </li>
                <li>
                  <NavLink activeclassname="active"
                    to="/menager"
                    className="px-4 py-1"
                  >
                    Menager
                  </NavLink>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </header>

 :


      <header>
        <nav className="bg-zinc-700 text-white border-gray-200 px-4 lg:px-6 py-2.5 dark:bg-gray-800">
          <div className="flex flex-wrap justify-between items-center mx-auto max-w-[87%]">
            <a href="" className="flex items-center">
              <img
                src="https://flowbite.com/docs/images/logo.svg"
                className="mr-3 h-6 sm:h-9"
                alt="Flowbite Logo"
              />
              <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
                Project
              </span>
            </a>
            <div className="flex items-center lg:order-2">
              <button
                className="text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800"
              >
                Get
              </button>
              <button
                data-collapse-toggle="mobile-menu-2"
                type="button"
                className="inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                aria-controls="mobile-menu-2"
                aria-expanded="false"
              >
                <span className="sr-only">Open main menu</span>
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                <svg
                  className="hidden w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </button>
            </div>
            <div
              className="hidden justify-between items-center w-full lg:flex lg:w-auto lg:order-1"
              id="mobile-menu-2"
            >
              <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
                <li></li>
                <li>
                  <NavLink activeclassname="active"
                    to="/ragister"
                    className="px-4 py-1"
                  >
                    Ragister
                  </NavLink>
                </li>
                <li>
                </li>
                <li>
                  <NavLink activeclassname="active"
                    to="/login"
                    className="px-4 py-1"
                  >
                    Login
                  </NavLink>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </header>
    }
    </>
  );
};

export default Header;
