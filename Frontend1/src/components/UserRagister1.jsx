import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import {
  getAllRagisterData,
  ragisterData,
} from "../redux/action/RagisterAction";
import HocComponent from "./HocComponent";
import Swal from 'sweetalert2'
import { useNavigate } from "react-router-dom";

const UserRagister = () => {
  const data = {
    countries: [
      {
        name: "India",
        states: [
          {
            name: "Gujrat",
            cities: [
              { name: "Surat" },
              { name: "Ahmedabad" },
              { name: "Anand" },
            ],
          },
          {
            name: "Maharastra",
            cities: [{ name: "Munbai" }, { name: "Pune" }, { name: "Thane" }],
          },
          {
            name: "Rajasthan",
            cities: [{ name: "Jaipur" }, { name: "Jodhpur" }, { name: "Kota" }],
          },
        ],
      },

      {
        name: "Canada",
        states: [
          {
            name: "Ontario",
            cities: [
              { name: "Toronto" },
              { name: "Ottawa" },
              { name: "Mississauga" },
            ],
          },
          {
            name: "Quebec",
            cities: [
              { name: "Montreal" },
              { name: "Quebec City" },
              { name: "Laval" },
            ],
          },
          {
            name: "British Columbia",
            cities: [
              { name: "Vancouver" },
              { name: "Victoria" },
              { name: "Burnaby" },
            ],
          },
        ],
      },
      {
        name: "USA",
        states: [
          {
            name: "California",
            cities: [
              { name: "Los Angeles" },
              { name: "San Francisco" },
              { name: "San Diego" },
            ],
          },
          {
            name: "Texas",
            cities: [
              { name: "Houston" },
              { name: "Austin" },
              { name: "Dallas" },
            ],
          },
          {
            name: "New York",
            cities: [
              { name: "New York City" },
              { name: "Buffalo" },
              { name: "Rochester" },
            ],
          },
        ],
      },
    ],
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [countryStore, setCountryStore] = useState("");
  const [stateStore, setStateStore] = useState("");

  const handleSelectChange = (e) => {
    if (e.target.name === "country") {
      setCountryStore(e.target.value);
      setStateStore("");
    }
  };
  const handleStateChenge = (e) => {
    setStateStore(e.target.value);
  };
 

  useEffect(() => {
    dispatch(getAllRagisterData());
  }, [dispatch]);

  const onSubmit = async (data) => {
    
    const formData = new FormData();
    formData.append("firstname", data.firstname);
    formData.append("lastname", data.lastname);
    formData.append("email", data.email);
    formData.append("password", data.password);
    formData.append("phoneno", data.phoneno);
    formData.append("dateOfBirth", data.dateOfBirth);
    formData.append("country", countryStore);
    formData.append("state", stateStore);
    formData.append("city", data.city);
    formData.append("setgender", data.setgender);
    formData.append("isAdmin", data.isAdmin ==="true" ? true : false);
    formData.append("file", data.profile[0]);
    formData.append("hobbies", JSON.stringify(data.hobbies));
    
    
    const returnApiStatus = await dispatch(ragisterData(formData));
    console.log(returnApiStatus);

    if(returnApiStatus?.isSuccess){
      Swal.fire({
        icon: "success"
      });
      navigate("/login");
    }
    else{
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: returnApiStatus?.message,
        footer: '<a href="#">Why do I have this issue?</a>'
      });
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="lg:w-2/5 md:w-2/3 w-full mx-auto  mt-[30px] border p-5 shadow-lg"
      >
        <div className="mt-3">
          <label htmlFor="firstname">First Name :</label>
          <br />
          <input
            type="text"
            className="border border-5 border-black w-full rounded rounded-[5px] focus:outline-none ps-2 py-1"
            id="firstname"
            {...register("firstname", {
              required: "First Name is required",
              pattern: {
                value: /^[a-zA-Z\s]*$/,
                message: "Please enter a valid name",
              },
            })}
          />
          {errors.firstname && (
            <div className="ps-3 mt-3 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400">
              {errors.firstname.message}
            </div>
          )}
        </div>

        <div className="mt-3">
          <label htmlFor="lastname">Last Name :</label>
          <br />
          <input
            type="text"
            className="border border-5 border-black w-full rounded rounded-[5px] focus:outline-none ps-2 py-1"
            id="lastname"
            {...register("lastname", {
              required: "Last Name is required",
              pattern: {
                value: /^[a-zA-Z\s]*$/,
                message: "Please enter a valid Last Name",
              },
            })}
          />
          {errors.lastname && (
            <div className="ps-3 mt-3 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400">
              {errors.lastname.message}
            </div>
          )}
        </div>

        <div className="mt-3">
          <label htmlFor="email">Email : </label>
          <br />
          <input
            type="email"
            className="border border-5 border-black w-full rounded rounded-[5px] focus:outline-none ps-2 py-1"
            id="email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@(?:gmail\.com|yahoo\.com)$/i,
                message: "Please enter a valid email",
              },
            })}
          />
          {errors.email && (
            <div className="ps-3 mt-3 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400">
              {errors.email.message}
            </div>
          )}
        </div>

        <div className="mt-3">
          <label htmlFor="password">Password :</label>
          <br />
          <input
            type="password"
            className="border border-5 border-black w-full rounded rounded-[5px] focus:outline-none ps-2 py-1"
            id="password"
            {...register("password", {
              required: "Password is required",
              pattern: {
                value: /^(?=.*[~`!@#$%^&*()_+-={}\[\]|\\:;"'<>,.?/]).*$/,
                message: "Password must contain at least one Special Symbol",
              },
            })}
          />
          {errors.password && (
            <div className="ps-3 mt-3 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400">
              {errors.password.message}
            </div>
          )}
        </div>

        <div className="mt-3">
          <label htmlFor="phoneno">Phone No :</label>
          <br />
          <input
            type="text"
            className="border border-5 border-black w-full rounded rounded-[5px] focus:outline-none ps-2 py-1"
            id="phoneno"
            {...register("phoneno", {
              required: "Phone No. is required",
              pattern: {
                value: /^(\+91[\-\s]?)?[0]?(91)?[789]\d{9}$/,
                message: "Please enter a valid Phone No.",
              },
            })}
          />
          {errors.phoneno && (
            <div className="ps-3 mt-3 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400">
              {errors.phoneno.message}
            </div>
          )}
        </div>

        <div className="mt-3">
          <label htmlFor="dateOfBirth">Date of Birth :</label>
          <br />
          <input
            type="date"
            className="border border-5 border-black w-full rounded rounded-[5px] focus:outline-none ps-2 py-1"
            id="dateOfBirth"
            {...register("dateOfBirth", {
              required: "Date of Birth is required",
              validate: {
                validAge: (value) => {
                  const today = new Date();
                  const birthDate = new Date(value);
                  const age = today.getFullYear() - birthDate.getFullYear();
                  return age >= 18 || "Minimum age should be 18 years";
                },
              },
            })}
          />
          {errors.dateOfBirth && (
            <div className="ps-3 mt-3 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400">
              {errors.dateOfBirth.message}
            </div>
          )}
        </div>

        <div className="mt-3 mb-3">
          <label htmlFor="country">Country :</label>
          <select
            className="border border-5 border-black w-full rounded rounded-[5px] focus:outline-none ps-2 py-1"
            id="country"
            name="country"
            {...register("country")}
            onChange={handleSelectChange}
          >
            <option value="">Select Country</option>
            {data.countries.map((country, index) => (
              <option key={index} value={country.name}>
                {country.name}
              </option>
            ))}
          </select>
        

          <label htmlFor="state" className="mt-3">
            State :
          </label>
          <select
            className="border border-5 border-black w-full rounded rounded-[5px] focus:outline-none ps-2 py-1"
            id="state"
            name="state"
            {...register("state" )}
            onChange={handleStateChenge}
            value={stateStore}
          >
            <option value="">Select State</option>
            {countryStore &&
              data.countries
                .find((country) => country.name === countryStore)
                ?.states.map((state, index) => (
                  <option key={index} value={state.name}>
                    {state.name}
                  </option>
                ))}
          </select>

          <label htmlFor="city" className="mt-3">
            City :
          </label>
          <select
            className="border border-5 border-black w-full rounded rounded-[5px] focus:outline-none ps-2 py-1"
            id="city"
            {...register("city", { required: "City is required" })}
          >
            <option value="">Select City</option>

            {
              stateStore &&
              data.countries.find((country) => country.name === countryStore)
                ?.states.find((state) => state.name === stateStore)
                ?.cities?.map((city, index) => (
                  <option key={index} value={city.name}>
                    {city.name}
                  </option>
                ))}
          </select>
          {errors.city && (
            <div className="ps-3 mt-3 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400">
              {errors.city.message}
            </div>
          )}
        </div>

        <div className="mt-3">
          <label>Gender :</label> <br />
          <input
            type="radio"
            id="male"
            {...register("setgender", { required: "Please select gender" })}
            value="Male"
          />
          <label htmlFor="male">Male</label>
          <input
            type="radio"
            id="female"
            {...register("setgender", { required: "Please select gender" })}
            value="Female"
          />
          <label htmlFor="female">Female</label>
          <input
            type="radio"
            id="other"
            {...register("setgender", { required: "Please select gender" })}
            value="Other"
          />
          <label htmlFor="other">Other</label>
          {errors.setgender && (
            <div className="ps-3 mt-3 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400">
              {errors.setgender.message}
            </div>
          )}
        </div>

        <div className="mt-3">
          <label htmlFor="profile">Profile Picture :</label>
          <br />
          <input
            type="file"
            id="profile"
            {...register("profile", {
              required: "Profile Picture is required",
            })}
          />
          {errors.profile && (
            <div className="ps-3 mt-3 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400">
              {errors.profile.message}
            </div>
          )}
        </div>

        <div className="mt-3">
          <label>Admin :</label> <br />
          <input
            type="radio"
            id="yes"
            {...register("isAdmin", { required: "Please select admin status" })}
            value="true"
          />
          <label htmlFor="yes">Yes</label>
          <input
            type="radio"
            id="no"
            {...register("isAdmin", { required: "Please select admin status" })}
            value="false"
          />
          <label htmlFor="no">No</label>
          {errors.isAdmin && (
            <div className="ps-3 mt-3 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400">
              {errors.isAdmin.message}
            </div>
          )}
        </div>

        <button
          type="submit"
          className="mt-4 py-2 px-6 bg-blue-500 text-white rounded-[5px] hover:outline outline-1 outline-blue-500 hover:bg-transparent hover:text-black transition"
        >
          Submit
        </button>
      </form>
    </>
  );
};

export default HocComponent(UserRagister);
