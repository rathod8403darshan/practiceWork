import React from "react";
import HocComponent from "./HocComponent";
import { useNavigate } from "react-router-dom";

const Cancel = () => {
  const navigate = useNavigate()
  return <div className="container mx-auto">
     <div className="row justify-content-center">
          <div className="col-md-5">
            <div className="message-box _success _failed">
              <i className="fa fa-times-circle" aria-hidden="true"></i>
              <h2> Your payment failed </h2>
              <p> Try again later </p>
              <button onClick={()=> navigate('/home')} className="mt-4 py-2 px-6 bg-red-500 ms-5 text-white rounded-[5px] hover:outline outline-1 outline-red-500 hover:bg-transparent hover:text-black transition">Redirect home</button>
            </div>
          </div>
        </div>

  </div>;
};

export default HocComponent(Cancel);
