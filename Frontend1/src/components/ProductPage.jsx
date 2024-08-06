import React, { useEffect, useState } from "react";
import HocComponent from "./HocComponent";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { AddProduct, editProduct } from "../redux/action/productAction";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";

const ProductPage = () => {
  const navigate = useNavigate();
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      price: "",
      bgcolor: "",
      discount: "",
      detail: "",
      name: "",
    },
  });
  const [imageUrl, setImageUrl] = useState("");

  const params = useParams();
  const state = useSelector((state) => state.product);

  useEffect(() => {
    if (params.id) {
      const obj = state.getProduct.data?.find(
        (x) => x._id === params.id
      );
      setImageUrl(obj?.image);
      setValue("price", obj?.price);
      setValue("bgcolor", obj?.bgcolor);
      setValue("discount", obj?.discount);
      setValue("name", obj?.name);
      setValue("detail", obj?.detail);
    }
  }, [params.id]);

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("bgcolor", data.bgcolor);
    formData.append("price", data.price);
    formData.append("discount", data.discount);
    formData.append("detail", data.detail);
    formData.append("name", data.name);

    if (params.id) {
      formData.append("image", data?.image[0] ? data?.image[0] : imageUrl);

      try {
        const returnData = await editProduct(params.id, formData);

        if (returnData.isSuccess) {
          Swal.fire({
            icon: "success",
          });
          navigate("/home");
        }
      } catch (error) {
        console.log(error.message);
      }
    } else {
      formData.append("image", data.image[0]);
      try {
        const returnData = await AddProduct(formData);
        if (returnData.isSuccess) {
          navigate("/home");
        }
      } catch (error) {
        console.log(error.message);
      }
    }

    setImageUrl("");
  };

  return (
    <>
      {/* <form
        onSubmit={handleSubmit(onSubmit)}
        className="lg:w-2/5 md:w-2/3 w-full mx-auto mt-[30px] border  bg-white p-5 shadow-lg"
      >
        <h1 className="text-[20px] mb-8">
          {" "}
          {params.id ? "Update product :" : "Add product :"}{" "}
        </h1>
        <div className="mt-3">
          <label htmlFor="name">Name : </label>
          <br />
          <input
            type="text"
            className="border border-5 border-black w-full rounded rounded-[5px] focus:outline-none ps-2 py-1"
            {...register("name", { required: "Name is required" })}
            id="name"
            placeholder="Enter name"
          />
          {errors.name && (
            <div className="ps-3 mt-3  text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400">
              {errors.name.message}
            </div>
          )}
        </div>
        <div className="mt-3">
          <label htmlFor="detail">Detail :</label>
          <br />
          <textarea
            className="border border-5 border-black w-full  rounded rounded-[5px] focus:outline-none ps-2 py-1"
            {...register("detail", { required: "Detail is required" })}
            id="detail"
            placeholder="Enter detail"
          />
          {errors.detail && (
            <div className="ps-3 mt-3  text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400">
              {errors.detail.message}
            </div>
          )}
        </div>
        <div className="">
          <label htmlFor="price">Price :</label>
          <br />
          <input
            type="number"
            className="border border-5 border-black w-full  rounded rounded-[5px] focus:outline-none ps-2 py-1"
            {...register("price", {
              required: "Price is required",
              min: { value: 0, message: "Price must be greater than 0" },
            })}
            id="price"
            placeholder="Enter price"
          />
          {errors.price && (
            <div className="ps-3 mt-3  text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400">
              {errors.price.message}
            </div>
          )}
        </div>
        <div className="mt-3">
          <label htmlFor="discount">Discount :</label>
          <br />
          <input
            type="number"
            className="border border-5 border-black w-full  rounded rounded-[5px] focus:outline-none ps-2 py-1"
            {...register("discount", {
              required: "Discount is required",
              min: {
                value: 0,
                message: "Discount must be greater than 0",
              },
              max: {
                value: 99,
                message: "Discount must be less than 100",
              },
            })}
            id="discount"
            placeholder="Enter discount"
          />
          {errors.discount && (
            <div className="ps-3 mt-3  text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400">
              {errors.discount.message}
            </div>
          )}
        </div>
        <div className="mt-3">
          <label htmlFor="bgcolor">Background Color :</label>
          <br />
          <input
            type="color"
            className="border mt-2 border-5 border-black  rounded rounded-[5px] focus:outline-none p-1 h-[40px]"
            {...register("bgcolor", {
              required: "Background color is required",
            })}
            id="bgcolor"
            placeholder="Select background color"
          />
          {errors.bgcolor && (
            <div className="ps-3 mt-3  text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400">
              {errors.bgcolor.message}
            </div>
          )}
        </div>
        <div className="mt-3">
          <label htmlFor="image">Image :</label>
          <br />
          <input
            type="file"
            className="border mt-2 rounded rounded-[5px] focus:outline-none  ms-2"
            {...register(
              "image",
              !params.id && { required: "Image is required" }
            )}
            id="image"
          />
          {errors.image && (
            <div className="ps-3 mt-3  text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400">
              {errors.image.message}
            </div>
          )}
        </div>
        <button
          type="submit"
          className="mt-4 py-2 px-6 bg-blue-500 text-white rounded-[5px] hover:outline outline-1 outline-blue-500 hover:bg-transparent hover:text-black transition"
        >
          {params.id ? "Update product" : "Add product"}
        </button>
        <button
          type="button"
          onClick={() => reset()}
          className="mt-4 py-2 px-6 bg-red-500 ms-5 text-white rounded-[5px] hover:outline outline-1 outline-red-500 hover:bg-transparent hover:text-black transition"
        >
          Reset
        </button>
      </form> */}

      <form   onSubmit={handleSubmit(onSubmit)} className="flex justify-center items-center min-h-[90vh]">
        <div className="container mx-auto my-4 px-4 lg:px-20">
          <div className="w-full p-8 my-4 md:px-12 lg:w-9/12 lg:pl-20 lg:pr-40 mr-auto bg-white rounded-2xl shadow-2xl">
            <div className="flex">


              <h1 className="font-bold uppercase text-5xl">
                Creat a <br /> porduct
              </h1>
            </div>
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 mt-5">
             <div className="">
             <input
                className=" bg-gray-100 w-full text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
                type="text"
                placeholder="Product Name*"
                {...register("name", { required: "Name is required" })}
              />
              {errors.name && (
               <div className="ps-3  mt-3  text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400">
              {errors.name.message}
               </div>
              )}
             </div>

             <div>
             <input
              {...register(
                "image",
                !params.id && { required: "Image is required" }
              )}
              id="image"
                className="w-full bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
                type="file"
              />
               {errors.image && (
             <div className="ps-3 mt-3  text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400">
              {errors.image.message}
            </div>
          )}
             </div>
             <div>
             <input
               {...register("price", {
                required: "Price is required",
                min: { value: 0, message: "Price must be greater than 0" },
              })}
                id="price"
                className="w-full bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
                type="number"
                placeholder="Enter price*"
                />
                {errors.price && (
                  <div className="ps-3 mt-3  text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400">
                {errors.price.message}
              </div>
             )}
             </div>
         
             <div>
             <input
               {...register("discount", {
                required: "Discount is required",
                min: {
                  value: 0,
                  message: "Discount must be greater than 0",
                },
                max: {
                  value: 99,
                  message: "Discount must be less than 100",
                },
                })}
                id="discount"
                className="w-full bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
                type="number"
                placeholder="Discount*"
              />
              {errors.discount && (
               <div className="ps-3 mt-3  text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400">
                 {errors.discount.message}
               </div>
             )}
             </div>
            </div>
            <div className="my-4">
              <textarea
               {...register("detail", { required: "Detail is required" })}
                id="detail"
                placeholder="Product detail*"
                className="w-full h-32 bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
              ></textarea>
              {errors.detail && (
              <div className="ps-3 mt-3  text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400">
              {errors.detail.message}
              </div>
            )}
            </div>
            <div className="my-2 w-full  flex gap-10">
              <button
               type="submit"
                className="uppercase text-sm font-bold tracking-wide bg-blue-900 text-gray-100 p-3 rounded-lg  
                      focus:outline-none focus:shadow-outline"
              >
                {params.id ? "Update product" : "Create product"}
              </button>
              <button
          type="button"
          onClick={() => reset()}
          className="uppercase text-sm font-bold tracking-wide bg-red-700 text-gray-100 py-3 px-6 rounded-lg  
                      focus:outline-none focus:shadow-outline hover:outline outline-1 outline-red-500 hover:bg-transparent hover:text-black transition"
        >
          Reset
        </button>
            </div>
          </div>

          <div className="w-full lg:-mt-96 lg:w-2/6 px-8 py-12 ml-auto bg-blue-900 rounded-2xl">
            <div className="flex flex-col text-white">
              <h1 className="font-bold uppercase text-4xl my-4">
                Create product
              </h1>
              <p className="text-gray-400">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam
                tincidunt arcu diam, eu feugiat felis fermentum id. Curabitur
                vitae nibh viverra, auctor turpis sed, scelerisque ex.
              </p>


              <div className="flex my-4 w-2/3 lg:w-1/2">
                <div className="flex flex-col">
                  <i className="fas fa-phone-alt pt-2 pr-2" />
                </div>
                <div className="flex flex-col">
                  <h2 className="text-2xl">Call Us</h2>
                  <p className="text-gray-400">Tel: xxx-xxx-xxx</p>
                  <p className="text-gray-400">Fax: xxx-xxx-xxx</p>
                </div>
              </div>

              <div className="flex my-4 w-2/3 lg:w-1/2">
                <a
                  href="https://www.facebook.com/ENLIGHTENEERING/"
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full bg-white h-8 w-8 inline-block mx-1 text-center pt-1"
                >
                  <i className="fab fa-facebook-f text-blue-900" />
                </a>
                <a
                  href="https://www.linkedin.com/company/enlighteneering-inc-"
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full bg-white h-8 w-8 inline-block mx-1 text-center pt-1"
                >
                  <i className="fab fa-linkedin-in text-blue-900" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </form>
      <div className="flex items-end justify-end fixed bottom-0 right-0  mr-4 z-10">
        <div>
          <a
            title="Buy me a pizza"
            href="/"
            target="_blank"
            className="block w-16 h-16 rounded-full transition-all shadow hover:shadow-lg transform hover:scale-110 hover:rotate-12"
          >
            <img
              className="object-cover object-center w-full h-full rounded-full"
              src="https://img.icons8.com/emoji/48/000000/pizza-emoji.png"
            />
          </a>
        </div>
      </div>
    </>
  );
};

export default HocComponent(ProductPage);
