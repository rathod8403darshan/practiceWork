import { getProductData } from "../reducers/productReducer";
import axiosInstance from "../../AxiosInterChepter";

const callApiFunction = () => {
  return axiosInstance.get("/product/allproduct").then((res) => {
    return res.data;
  });
};

export const AddProduct = (obj) => {
  try {
    return axiosInstance
      .post("/product/addproduct", obj)
      .then((res) => {
        getAllProductData();
        return res.data;
      })
      .catch((error) => console.log(error));
  } catch (error) {
    return error;
  }
};

export const getAllProductData = () => {
  return async (dispatch) => {
    try {
      const data = await callApiFunction();
      dispatch(getProductData(data));
    } catch (error) {
      console.log(error);
    }
  };
};

export const editProduct = (id, obj) => {
  try {
   return axiosInstance
      .patch("/product/updateproduct/" + id, obj)
      .then((res) => {
      getAllProductData();
      
        return res.data;
      })
      .catch((error) => console.log(error));
  } catch (error) {
    return error;
  }
};

export const deletePRoductAcion = (id) => {
  return (dispatch) => {
    try {
      return axiosInstance
        .delete("/product/deleteproduct/" + id)
        .then(async (res) => {
          dispatch(getAllProductData());
          return await res.data;
        })
        .catch((error) => console.log(error));
    } catch (error) {
      return error;
    }
  };
};
