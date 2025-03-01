import React, { useEffect, useState } from "react";
import HocComponent from "./HocComponent";
import {
  createStarterPlan,
  getCustomerPlanAction,
  getStarterPlanAction,
} from "../redux/action/subscription";
import { loadStripe } from "@stripe/stripe-js";

const SubscribtionPage = () => {
  const [planDetail, setPlanDetail] = useState();
  

  useEffect(() => {
    customerDetail();
  },[]);

  const customerDetail = async () => {
      const returnData2 = await getStarterPlanAction();
      setPlanDetail(returnData2?.data[0]);
  };

  const getStarterPlan = async () => {
    const stripe = await loadStripe("pk_test_51PfcxG2MUUnGf6SkjHeMGeMWc4T98K9bkqimcliis3nWtu73Bn9p6aHBLbKbDHgK8hHSCI4Fz0BsYAmnJMlZG3OF00Y6phm6pa");

    const returnData = await createStarterPlan();
    
    if(returnData?.status === 202){
      if(returnData.data?.redirectUrl){
        window.location.href = returnData.data.redirectUrl
      }
    }
    else{
      const result = stripe.redirectToCheckout({
        sessionId: returnData.data?.id,
      });
    }
  };
  const getProPlan = () => {};

  return (
    <>
      <div className="relative w-full h-full">
        <div className="absolute hidden w-full  lg:block h-96" />
        <div className="relative px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
          <div className="max-w-xl mb-10 md:mx-auto sm:text-center lg:max-w-2xl md:mb-12">
            <h2 className="max-w-lg mb-6 font-sans text-3xl font-bold leading-none tracking-tight text-gray-900 sm:text-4xl md:mx-auto">
              <span className="relative inline-block">
                <svg
                  viewBox="0 0 52 24"
                  fill="currentColor"
                  className="absolute top-0 left-0 z-0 hidden w-32 -mt-8 -ml-20 text-gray-400 lg:w-32 lg:-ml-28 lg:-mt-10 sm:block"
                >
                  <defs>
                    <pattern
                      id="2c67e949-4a23-49f7-bf27-ca140852cf21"
                      x="0"
                      y="0"
                      width=".135"
                      height=".30"
                    >
                      <circle cx="1" cy="1" r=".7" />
                    </pattern>
                  </defs>
                </svg>
                <span className="relative">Affordable</span>
              </span>
              for everyone
            </h2>
            <p className="text-base text-gray-700 md:text-lg">
              Sed ut perspiciatis unde omnis iste natus error sit voluptatem
              accusantium doloremque rem aperiam, eaque ipsa quae.
            </p>
          </div>
          <div className="grid max-w-screen-md gap-10 md:grid-cols-2 sm:mx-auto">
            <div>
              <div className="relative p-20 bg-gray-900 rounded">
                <div className="mb-4 text-center">
                  {planDetail?.status === "active" && (
                    <span className="text-white absolute top-[10px] bg-blue-900 px-3 start-[10px] rounded">
                      Activeted
                    </span>
                  )}
                  {planDetail?.status === "active" && (
                    <span className="text-white absolute top-[10px] bg-blue-900 px-3 start-[50%] rounded">
                      ExpireIn : {new Date(planDetail?.current_period_end * 1000).toLocaleDateString()}
                    </span>
                  )}
                  <p className="text-xl font-medium tracking-wide text-white">
                    Starter Plan
                  </p>
                  <div className="flex items-center justify-center">
                    <p className="mr-2 text-5xl font-semibold text-white lg:text-6xl">
                      $39
                    </p>
                    <p className="text-lg text-gray-500">/ month</p>
                  </div>
                </div>
                <ul className="mb-8 space-y-2">
                  <li className="flex items-center">
                    <div className="mr-3">
                      <svg
                        className="w-4 h-4 text-teal-accent-400"
                        viewBox="0 0 24 24"
                        strokeLinecap="round"
                        strokeWidth="2"
                      >
                        <polyline
                          fill="none"
                          stroke="currentColor"
                          points="6,12 10,16 18,8"
                        />
                        <circle
                          cx="12"
                          cy="12"
                          fill="none"
                          r="11"
                          stroke="currentColor"
                        />
                      </svg>
                    </div>
                    <p className="font-medium text-gray-300">
                      10 deploys per day
                    </p>
                  </li>
                  <li className="flex items-center">
                    <div className="mr-3">
                      <svg
                        className="w-4 h-4 text-teal-accent-400"
                        viewBox="0 0 24 24"
                        strokeLinecap="round"
                        strokeWidth="2"
                      >
                        <polyline
                          fill="none"
                          stroke="currentColor"
                          points="6,12 10,16 18,8"
                        />
                        <circle
                          cx="12"
                          cy="12"
                          fill="none"
                          r="11"
                          stroke="currentColor"
                        />
                      </svg>
                    </div>
                    <p className="font-medium text-gray-300">
                      10 GB of storage
                    </p>
                  </li>
                  <li className="flex items-center">
                    <div className="mr-3">
                      <svg
                        className="w-4 h-4 text-teal-accent-400"
                        viewBox="0 0 24 24"
                        strokeLinecap="round"
                        strokeWidth="2"
                      >
                        <polyline
                          fill="none"
                          stroke="currentColor"
                          points="6,12 10,16 18,8"
                        />
                        <circle
                          cx="12"
                          cy="12"
                          fill="none"
                          r="11"
                          stroke="currentColor"
                        />
                      </svg>
                    </div>
                    <p className="font-medium text-gray-300">3 domains</p>
                  </li>
                  <li className="flex items-center">
                    <div className="mr-3">
                      <svg
                        className="w-4 h-4 text-teal-accent-400"
                        viewBox="0 0 24 24"
                        strokeLinecap="round"
                        strokeWidth="2"
                      >
                        <polyline
                          fill="none"
                          stroke="currentColor"
                          points="6,12 10,16 18,8"
                        />
                        <circle
                          cx="12"
                          cy="12"
                          fill="none"
                          r="11"
                          stroke="currentColor"
                        />
                      </svg>
                    </div>
                    <p className="font-medium text-gray-300">
                      SSL Certificates
                    </p>
                  </li>
                </ul>
              <button
                  onClick={getStarterPlan}
                  type="submit"
                  className={`inline-flex items-center justify-center w-full h-12 px-6 font-medium tracking-wide text-white transition duration-200 rounded shadow-md  bg-purple-900 text-white hover:bg-purple-700 focus:shadow-outline focus:outline-none`}
                >
                 { planDetail?.status === "active" ? "See your plan detail" : "Get Now"}
                </button>
              </div>
              <div className="w-11/12 h-2 mx-auto bg-gray-900 rounded-b opacity-75" />
              <div className="w-10/12 h-2 mx-auto bg-gray-900 rounded-b opacity-50" />
              <div className="w-9/12 h-2 mx-auto bg-gray-900 rounded-b opacity-25" />
            </div>
            <div>
              <div className="p-20 bg-gray-900 rounded">
                <div className="mb-4 text-center">
                  <p className="text-xl font-medium tracking-wide text-white">
                    Pro Plan
                  </p>
                  <div className="flex items-center justify-center">
                    <p className="mr-2 text-5xl font-semibold text-white lg:text-6xl">
                      $59
                    </p>
                    <p className="text-lg text-gray-500">/ month</p>
                  </div>
                </div>
                <ul className="mb-8 space-y-2">
                  <li className="flex items-center">
                    <div className="mr-3">
                      <svg
                        className="w-4 h-4 text-teal-accent-400"
                        viewBox="0 0 24 24"
                        strokeLinecap="round"
                        strokeWidth="2"
                      >
                        <polyline
                          fill="none"
                          stroke="currentColor"
                          points="6,12 10,16 18,8"
                        />
                        <circle
                          cx="12"
                          cy="12"
                          fill="none"
                          r="11"
                          stroke="currentColor"
                        />
                      </svg>
                    </div>
                    <p className="font-medium text-gray-300">
                      100 deploys per day
                    </p>
                  </li>
                  <li className="flex items-center">
                    <div className="mr-3">
                      <svg
                        className="w-4 h-4 text-teal-accent-400"
                        viewBox="0 0 24 24"
                        strokeLinecap="round"
                        strokeWidth="2"
                      >
                        <polyline
                          fill="none"
                          stroke="currentColor"
                          points="6,12 10,16 18,8"
                        />
                        <circle
                          cx="12"
                          cy="12"
                          fill="none"
                          r="11"
                          stroke="currentColor"
                        />
                      </svg>
                    </div>
                    <p className="font-medium text-gray-300">
                      50 GB of storage
                    </p>
                  </li>
                  <li className="flex items-center">
                    <div className="mr-3">
                      <svg
                        className="w-4 h-4 text-teal-accent-400"
                        viewBox="0 0 24 24"
                        strokeLinecap="round"
                        strokeWidth="2"
                      >
                        <polyline
                          fill="none"
                          stroke="currentColor"
                          points="6,12 10,16 18,8"
                        />
                        <circle
                          cx="12"
                          cy="12"
                          fill="none"
                          r="11"
                          stroke="currentColor"
                        />
                      </svg>
                    </div>
                    <p className="font-medium text-gray-300">
                      Unlimited domains
                    </p>
                  </li>
                  <li className="flex items-center">
                    <div className="mr-3">
                      <svg
                        className="w-4 h-4 text-teal-accent-400"
                        viewBox="0 0 24 24"
                        strokeLinecap="round"
                        strokeWidth="2"
                      >
                        <polyline
                          fill="none"
                          stroke="currentColor"
                          points="6,12 10,16 18,8"
                        />
                        <circle
                          cx="12"
                          cy="12"
                          fill="none"
                          r="11"
                          stroke="currentColor"
                        />
                      </svg>
                    </div>
                    <p className="font-medium text-gray-300">
                      SSL Certificates
                    </p>
                  </li>
                </ul>
                <button
                  onClick={getProPlan}
                  type="submit"
                  className="inline-flex items-center justify-center w-full h-12 px-6 font-semibold tracking-wide text-teal-900 transition duration-200 rounded shadow-md bg-teal-400 hover:bg-teal-700 focus:shadow-outline focus:outline-none"
                >
                  Get Now
                </button>
              </div>
              <div className="w-11/12 h-2 mx-auto bg-gray-900 rounded-b opacity-75" />
              <div className="w-10/12 h-2 mx-auto bg-gray-900 rounded-b opacity-50" />
              <div className="w-9/12 h-2 mx-auto bg-gray-900 rounded-b opacity-25" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HocComponent(SubscribtionPage);
