import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllRagisterData,
  ragisterData,
} from "../redux/action/RagisterAction";
import HocComponent from "./HocComponent";
import Swal from 'sweetalert2'
import { useNavigate } from "react-router-dom";
import { editUserData } from "../redux/action/profile";

const EditProfileComponent = (props) => {
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

  let [countryStore, setCountryStore] = useState();
  let [stateStore, setStateStore] = useState();

  const {
    register,
    handleSubmit,
    setValue, 
    formState: { errors },
  } = useForm({
    defaultValues: {
      firstname: "",
      lastname: "", 
      dateOfBirth: "",
      country: countryStore, 
      state: stateStore,
      city: "",
      setgender: "",
    },
  });


  const handleSelectChange = (e) => {
    if (e.target.name === "country") {
      setCountryStore(e.target.value);
      setStateStore("");
    }
  };

  const handleStateChange = (e) => {
    setStateStore(e.target.value);
  };

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("firstname", data.firstname);
    formData.append("lastname", data.lastname);
    formData.append("phoneno", data.phoneno);
    formData.append("dateOfBirth", data.dateOfBirth);
    formData.append("country", countryStore);
    formData.append("state", stateStore);
    formData.append("city", data.city);
    formData.append("setgender", data.setgender);
    formData.append("file", typeof data.file[0] === "string" ? data.file : data.file[0]);

    
    const returnApiStatus = await editUserData(props.getUser[0]._id,formData);

    if (returnApiStatus?.isSuccess) {
      Swal.fire({
        icon: "success"
      });
      props?.setGetuser([returnApiStatus?.data])
      props?.setModel(false)
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: returnApiStatus?.message,
        footer: '<a href="#">Why do I have this issue?</a>'
      });
    }
    
  };


  useEffect(() => {
   if(props.getUser){
    
    countryStore = props.getUser[0]?.country
    stateStore =props.getUser[0]?.state
   setCountryStore(countryStore)
   setStateStore(stateStore)
    
    setValue("firstname", props.getUser[0]?.firstname);
    setValue("lastname", props.getUser[0]?.lastname);
    setValue("dateOfBirth", props.getUser[0]?.dateOfBirth);
    setValue("country", countryStore);
    setValue("state", stateStore);
    setValue("setgender", props.getUser[0]?.setgender);
    setValue("city", props.getUser[0]?.city);
    setValue("file", props.getUser[0]?.file);
    setValue("phoneno", props.getUser[0]?.phoneno);
}
}, [props.getUser]);

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className=" w-full mx-auto border p-5 shadow-lg"
      >
        <div className="mt-3">
          <label htmlFor="firstname">First Name :</label>
          <br />
          <input
            type="text"
            {...register("firstname", {
           
              pattern: {
                value: /^[a-zA-Z\s]*$/,
                message: "Please enter a valid name",
              },
            })}
            className="border border-5 border-black w-full rounded rounded-[5px] focus:outline-none ps-2 py-1"
            id="firstname"
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
            {...register("lastname", {
             
              pattern: {
                value: /^[a-zA-Z\s]*$/,
                message: "Please enter a valid Last Name",
              },
            })}
            className="border border-5 border-black w-full rounded rounded-[5px] focus:outline-none ps-2 py-1"
            id="lastname"
          />
          {errors.lastname && (
            <div className="ps-3 mt-3 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400">
              {errors.lastname.message}
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
            {...register("dateOfBirth", {
            
              validate: {
                validAge: (value) => {
                  const today = new Date();
                  const birthDate = new Date(value);
                  const age =
                    today.getFullYear() - birthDate.getFullYear();
                  return age >= 18 || "Minimum age should be 18 years";
                },
              },
            })}
            className="border border-5 border-black w-full rounded rounded-[5px] focus:outline-none ps-2 py-1"
            id="dateOfBirth"
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
            {...register("state")}
            onChange={handleStateChange}
            value={stateStore }
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
            {...register("city")}
          >
            <option value="">Select City</option>

            {stateStore &&
              data.countries
                .find((country) => country.name === countryStore)
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
            {...register("file", {
              
            })}
          />
          {errors.file && (
            <div className="ps-3 mt-3 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400">
              {errors.file.message}
            </div>
          )}
        </div>

        <button
          type="submit"
          className="mt-4 py-2 px-6 bg-yellow-500 text-white rounded-[5px] hover:outline outline-1 outline-blue-500 hover:bg-transparent hover:text-black transition"
        >
          Edit
        </button>
      </form>
    </>
  );
};

export default EditProfileComponent;
