import axiosInstance from "../../AxiosInterChepter";
import { getAllCartData } from "../reducers/cartReducer";

export const getCartData = () => {
  return (dispatch) => {
    try {
      return axiosInstance
        .get("/cart/getCart")
        .then((res) => {
          dispatch(getAllCartData(res.data));
        })
        .catch((err) => console.log(err));
    } catch (error) {
      console.log(error);
    }
  };
};

export const AddCartData = (obj) => {
  return (dispatch) => {
    try {
      return axiosInstance
        .post("/cart/addCart", obj)
        .then((res) => {
          dispatch(getCartData());
          return res.data;
        })
        .catch((err) => err);
    } catch (error) {
      console.log(error);
    }
  };
};
export const PaymentDetail = (cart) => {
    try {
      return axiosInstance
        .post("/payment/paymentCheckOut", cart)
        .then((res) => {
            
            return res
        })
        .catch((err) => err);
    } catch (error) {
      console.log(error);
    }
};
export const deleteCart = (id) => {
    return (dispatch)=> {
        try {
            return axiosInstance
              .delete("/cart/removeCart/"+id)
              .then((res) => {
                  dispatch(getCartData())
                  return res
              })
              .catch((err) => err);
          } catch (error) {
            console.log(error);
          }
    }
};

export const increaseQuantityAction = (id,quantity) => {
    return (dispatch)=> {
        try {
            return axiosInstance
              .patch("/cart/updateCart/"+id,{quantity})
              .then((res) => {
                  dispatch(getCartData())
                  return res
              })
              .catch((err) => err);
          } catch (error) {
            console.log(error);
          }
    }
};
export const descriseQuantityAction = (id,quantity) => {
    return (dispatch)=> {
        try {
            return axiosInstance
              .patch("/cart/updateCart/"+id,{quantity})
              .then((res) => {
                  dispatch(getCartData())
                  return res
              })
              .catch((err) => err);
          } catch (error) {
            console.log(error);
          }
    }
};
