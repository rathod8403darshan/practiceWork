import React from "react";
import HocComponent from "./HocComponent";
import { useNavigate } from "react-router-dom";

const Success = () => {
  const navigate = useNavigate()
  return (
    <div>
      <div className="container mx-auto mt-5">
        <div className="row justify-content-center">
          <div className="col-md-5">
            <div className="message-box _success">
              <i className="fa fa-check-circle" aria-hidden="true"></i>
              <h2> Your payment was successful </h2>
              <p>
                {" "}
                Thank you for your payment. we will <br />
                be in contact with more details shortly{" "}
              </p>

              <button onClick={()=> navigate('/home')} className="mt-4 py-2 px-6 bg-green-500 ms-5 text-white rounded-[5px] hover:outline outline-1 outline-green-500 hover:bg-transparent hover:text-black transition">Redirect home</button>
            </div>
          </div>
        </div>
        <hr />

       
      </div>
    </div>
  );
};

export default HocComponent(Success);
