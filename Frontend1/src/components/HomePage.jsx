import React, { useEffect, useState } from "react";
import HocComponent from "./HocComponent";
import { useDispatch, useSelector } from "react-redux";
import {
  deletePRoductAcion,
  getAllProductData,
} from "../redux/action/productAction";
import { MdDelete } from "react-icons/md";
import Swal from "sweetalert2";
import { userGetData } from "../redux/action/profile";
import { FaEdit } from "react-icons/fa";
import { Link } from "react-router-dom";
import { AddCartData } from "../redux/action/Cart";

const HomePage = () => {
  const state = useSelector((state) => state.product);
  const dispatch = useDispatch();
  const [getData, setgetData] = useState();
  const [shortby, setShortby] = useState("");

  useEffect(() => {
    dispatch(getAllProductData());
  }, []);

  useEffect(() => {
    setgetData(state?.getProduct?.data);
  }, [state?.getProduct?.data]);

  const deleteProduct = async (id) => {
    const data = await dispatch(deletePRoductAcion(id));
    if (data.isSuccess) {
      Swal.fire({
        icon: "success",
      });
    }
  };

  const AddToCart = async (id) => {
    const obj = { product_id: id };

    const response = await dispatch(AddCartData(obj));
    if (response?.isSuccess) {
      Swal.fire({
        icon: "success",
        title: "Added to Cart",
        showConfirmButton: false,
        timer: 1500,
      });
    }

    if (response?.response) {
      Swal.fire({
        icon: "error",
        title: response?.response.data?.message,
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  const filterData = (e) => {
    const { name, value } = e.target;
    if (name === "name") {
      const filter = state?.getProduct?.data.filter((item) => {
        return item.name.toLowerCase().includes(value.toLowerCase());
      });
      setgetData(filter);
    } else if (name === "price") {
      const filter = state?.getProduct?.data.filter((item) => {
          if(value === "0"){
              return item
          }else{
            return item.price >= value.split(",")[0] && item.price <= value.split(",")[1]
          }
      });
      setgetData(filter);
    } else if (name === "discount") {
        const filter = state?.getProduct?.data.filter((item) => {
            if(value === "0"){
                return item
            }else{
              return item.discount >= value.split(",")[0] && item.discount <= value.split(",")[1]
            }
        });
        setgetData(filter);
      }else if (name === "shortBy") {
      setShortby(value);
    }
  };
  return (
    <>
      <div className="w-[90%] mx-auto mt-5 ">
        <h1 className="mb-8">
          {state?.getProduct?.data?.length >= 1
            ? "ALL PRODUCT"
            : "EMPTY RPODUCT"}
        </h1>

        <div>
          <select
          defaultValue={""}
          id=""
          name="shortBy"
          onChange={filterData}
          className="me-5 mb-5 text-gray-900 w-[130px]  p-1 rounded-sm ms-2 focus:outline-none focus:shadow-outline"
          >
            <option value="0" >
              Short by
            </option>
            <option value="name">Name</option>
            <option value="price">Price</option>
            <option value="discount">Discount</option>
          </select>

          {shortby === "name" && (
            <input
            type="text"
            name="name"
            className="  text-gray-900 mb-5 p-1 rounded-sm ms-2 focus:outline-none focus:shadow-outline"
            placeholder="Filter by name"
            onChange={filterData}
            />
          )}
          {shortby === "price" && (
            <select
            id=""
            name="price"
            defaultValue={""}
            onChange={filterData}
            className="ms-5 text-gray-900  p-1 rounded-sm ms-2 focus:outline-none focus:shadow-outline"
            >
              <option value="0" >
                Select price
              </option>
              <option value="10,50">10 - 50</option>
              <option value="50,100">50 - 100</option>
              <option value="100,200">100 - 200</option>
              <option value="200,500">200 - 500</option>
              <option value="500,1000">500 - 1000</option>
              <option value="1000,10000">1000 - 10000</option>
            </select>
          )}
          {shortby === "discount" && (
            <select
            id=""
            defaultValue={""}
            name="discount"
            onChange={filterData}
            className="ms-5 text-gray-900  p-1 rounded-sm ms-2 focus:outline-none focus:shadow-outline"
            >
              <option value="0" >
                Select discount
              </option>
              <option value="0,10">0 - 10</option>
              <option value="10,20">10 - 20</option>
              <option value="20,30">20 - 30</option>
              <option value="30,50">30 - 50</option>
              <option value="50,80">50 - 80</option>
              <option value="80,100">80 - 100</option>
            </select>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5 mx-auto w-full">
          {getData?.map((item) => (
            <div
              className={`w-full max-w-sm bg-white relative border border-gray-200 rounded-lg shadow dark:bg-[${item.bgcolor}] dark:border-gray-700`}
              key={item._id}
            >
              <Link
                to={`/createproduct/${item._id}`}
                className="absolute start-[91%]  top-[3px] inline bg-yellow-900 p-1 rounded-full z-50 cursor-pointer"
              >
                <FaEdit className="text-white " />
              </Link>
              <button
                className="inline absolute start-[81%] top-[3px] bg-red-800 p-1 rounded-full z-50 "
                onClick={() => deleteProduct(item._id)}
              >
                <MdDelete className="text-white " />
              </button>
              <a href="#">
                <img
                  className="p-8 rounded-[10px] h-[250px] w-full object-cover"
                  src={item.image}
                  alt="Product image"
                />
              </a>

              <div
                className={`rounded rounded-full absolute top-0 px-2 py-[9px] text-[11px] text-white bg-blue-600`}
              >
                {item.discount}%
              </div>

              <div className="px-5 pb-5">
                <div>
                  <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
                    {item.name}
                  </h5>
                  <p className="text-[15px] font-small tracking-tight text-gray-900 dark:text-white">
                    {item.detail}
                  </p>
                </div>
                <div className="flex items-center mt-2.5 mb-5">
                  <div className="flex items-center space-x-1 rtl:space-x-reverse">
                    <svg
                      className="w-4 h-4 text-yellow-300"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 22 20"
                    >
                      <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                    </svg>
                    <svg
                      className="w-4 h-4 text-yellow-300"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 22 20"
                    >
                      <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                    </svg>
                    <svg
                      className="w-4 h-4 text-yellow-300"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 22 20"
                    >
                      <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                    </svg>
                    <svg
                      className="w-4 h-4 text-yellow-300"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 22 20"
                    >
                      <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                    </svg>
                    <svg
                      className="w-4 h-4 text-gray-200 dark:text-gray-600"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 22 20"
                    >
                      <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                    </svg>
                  </div>
                  <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ms-3">
                    5.0
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[16px] font-bold text-gray-900 dark:text-white relative">
                    <span className="text-3xl">
                      $
                      {Math.floor(
                        item.price - item.price * (item.discount / 100)
                      )}
                    </span>{" "}
                    <span className="relative">
                      ${item.price}{" "}
                      <span className="absolute top-[-13px] text-[20px] text-red-800 start-[30%] rotate-12">
                        ___
                      </span>
                    </span>{" "}
                  </span>
                  <button
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    onClick={() => AddToCart(item._id)}
                  >
                    Add to cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default HocComponent(HomePage);
