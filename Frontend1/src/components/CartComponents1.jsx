import React, { useEffect, useState } from "react";
import HocComponent from "./HocComponent";
import axios from "axios";
import { loadStripe } from "@stripe/stripe-js";
import { useDispatch, useSelector } from "react-redux";
import { CiCirclePlus } from "react-icons/ci";
import { CiCircleMinus } from "react-icons/ci";
import {
  deleteCart,
  getCartData,
  increaseQuantityAction,
  PaymentDetail,
} from "../redux/action/Cart";
import { getAllProductData } from "../redux/action/productAction";
import { ImBin } from "react-icons/im";
import Swal from "sweetalert2";

const CartComponents = () => {
  const cartState = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const [cart, setCart] = useState([]);

  useEffect(() => {
    dispatch(getCartData());
  }, []);

  useEffect(() => {
    setCart(cartState?.cartData?.data);
  }, [cartState?.cartData?.data]);

  const checkOut = async () => {
    const stripe = await loadStripe(
      "pk_test_51PfcxG2MUUnGf6SkjHeMGeMWc4T98K9bkqimcliis3nWtu73Bn9p6aHBLbKbDHgK8hHSCI4Fz0BsYAmnJMlZG3OF00Y6phm6pa"
    );

    try {
      const returnData = await PaymentDetail(cart);
      const session = returnData.data;

      const result = stripe.redirectToCheckout({
        sessionId: session.id,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const deleteCartItem = async (id) => {
    const returtData = await dispatch(deleteCart(id));

    if (returtData?.data?.isSuccess) {
      Swal.fire({
        icon: "success",
        title: "Remove Cart item success",
        showConfirmButton: false,
        timer: 1500,
      });
    }

    if (returtData?.response) {
      Swal.fire({
        icon: "error",
        title: response?.response.data?.message,
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  const checkQuantity = async (type, id, quantity) => {
    let newQuantity = null
    if (type === "increase") {
      newQuantity =  quantity + 1;
    }
    if (type === "descrise") {
       newQuantity = quantity - 1;
    }
      dispatch(increaseQuantityAction(id, newQuantity));
  };
  return (
    <>
      <section className="antialiased min-h-[91vh] px-4 mt-5">
        <div className="flex flex-col justify-center ">
          <div className="w-full max-w-[70%] mx-auto max-h-[89vh] bg-white overflow-auto shadow-lg rounded-sm border border-gray-200">
            <header className="px-5 flex justify-between py-4 bg-white border-b border-gray-100 sticky top-[0px] z-[99]">
              <h2 className="font-semibold text-gray-800">Cart</h2>
              <button
                onClick={checkOut}
                className="py-2 ms-5 px-4 inline bg-green-500 text-white rounded hover:bg-green-600 active:bg-green-700 disabled:opacity-50   flex items-center justify-center"
              >
                ORDER
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 ml-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </button>
            </header>
            <div className="p-3">
              <div className="overflow-x-auto">
                <table className="table-auto w-full text-center">
                  <thead className="text-xs font-semibold uppercase text-gray-400 bg-gray-50">
                    <tr>
                      <th className=" whitespace-nowrap">
                        <div className="font-semibold text-left">TotalNo.</div>
                      </th>
                      <th className="p-2 whitespace-nowrap">
                        <div className="font-semibold text-left">Action</div>
                      </th>
                      <th className="p-2 whitespace-nowrap">
                        <div className="font-semibold text-left">Name</div>
                      </th>
                      <th className="p-2 whitespace-nowrap">
                        <div className="font-semibold text-left">Detail</div>
                      </th>
                      <th className="p-2 whitespace-nowrap">
                        <div className="font-semibold text-left">quantity</div>
                      </th>
                      <th className="whitespace-nowrap">
                        <div className="font-semibold text-left">Discount</div>
                      </th>
                      <th className="p-2 whitespace-nowrap">
                        <div className="font-semibold text-left">Prize</div>
                      </th>
                      <th className="p-2 whitespace-nowrap">
                        <div className="font-semibold text-center">Total $</div>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="text-sm divide-y divide-gray-100">
                    {cart?.map((item, index) => {
                      return (
                        <tr key={index}>
                           <td className="p-2 whitespace-nowrap">
                            <div className="text-left">
                              {index+1}
                            </div>
                          </td>
                          <td className=" text-center whitespace-nowrap">
                            <div className="text-center ms-4 text-lg  text-red-700">
                              <ImBin
                                className="cursor-pointer"
                                onClick={() => deleteCartItem(item._id)}
                              />
                            </div>
                          </td>
                          <td className="p-2 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="w-10  flex-shrink-0 mr-2 sm:mr-3">
                                <img
                                  className="rounded-full  w-[40px] h-[40px]"
                                  src={item.product?.image}
                                  alt="Alex Shatov"
                                />
                              </div>
                              <div className="font-medium text-gray-800">
                                {item.product?.name}
                              </div>
                            </div>
                          </td>
                          <td className="p-2 whitespace-nowrap">
                            <div className="text-left">
                              {item.product?.detail}
                            </div>
                          </td>
                          <td className="p-2 whitespace-nowrap">
                            <div className="text-left ps-6 font-medium  relative">
                              <button
                              className="px-1 absolute start-[-15px] top-[3px]"
                                onClick={() =>
                                  checkQuantity(
                                    "descrise",
                                    item._id,
                                    item.quantity
                                  )
                                }
                              >
                                <CiCircleMinus className="  text-[17px] text-blue-800"/>
                              </button>
                                <div className="inline">{item.quantity}</div>
                              <button
                              className="absolute start-[45px] top-[3px]"
                                onClick={() =>
                                  checkQuantity(
                                    "increase",
                                    item._id,
                                    item.quantity
                                  )
                                }
                              >
                                <CiCirclePlus className="  text-[17px] text-blue-800" />
                              </button>
                            </div>
                          </td>
                          <td className="p-2 whitespace-nowrap">
                            <div className="text-left font-medium ">
                              {item.product?.discount} %
                            </div>
                          </td>
                          <td className="p-2 whitespace-nowrap">
                            <div className="text-left font-medium ">
                              $ {item.product?.price}
                            </div>
                          </td>
                          <td className="p-2 whitespace-nowrap">
                            <div className="text-lg text-center text-green-500 text-sm">
                              {" "}
                              ${" "}
                              {Math.floor(
                                item.product?.price * item.quantity -
                                  item.product?.price *
                                    item.quantity *
                                    (item.product?.discount / 100)
                              )}{" "}
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default HocComponent(CartComponents);
