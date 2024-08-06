import React, { useContext } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import UserRagister1 from "../components/UserRagister1";
import Login from "../components/Login";
import HomePage from "../components/HomePage";
import ProductPage from "../components/ProductPage";
import { creatContext1 } from "../App";
import ProfilePage from "../components/ProfilePage";
import CartComponents from "../components/CartComponents1";
import Cancel from "../components/Cancel1";
import Success from "../components/Success1";
import ResetPassword from "../components/ResetPassword1";
import SubscribtionPage from "../components/SubscribtionPage";
import SubscriptionManager from "../components/SubscriptionManager";

const Router = () => {
  const value = useContext(creatContext1);
  return (
    <>
      <BrowserRouter>
        <Routes>
          {value.IsLoggedIn ? (
            <>
              <Route path="/" element={<Navigate to={"/home"} />} />
              <Route path="/home" element={<HomePage />} />
              <Route path="/createproduct" element={<ProductPage />}>
                <Route path=":id" />
              </Route>
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/cart" element={<CartComponents />} />
              <Route path="/cancel" element={<Cancel />} />
              <Route path="/success" element={<Success />} />
              <Route path="/resetpassword" element={<ResetPassword />} />
              <Route path="/menager" element={<SubscriptionManager />} />
              <Route path="/subscrib" element={<SubscribtionPage />} />
              <Route path="*" element={<Navigate to={"/home"} />} />
            </>
          ) : (
            <>
              <Route path="/" element={<Navigate to={"/ragister"} />} />
              <Route path="/ragister" element={<UserRagister1 />} />
              <Route path="/login" element={<Login />} />
              <Route path="*" element={<Navigate to={"/login"} />} />
            </>
          )}
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default Router;
