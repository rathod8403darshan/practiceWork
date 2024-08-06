import logo from './logo.svg';
import './App.css';
import UserRagister from './components/UserRagister1';
import Router from './router/Router';
import { createContext, useEffect, useState } from 'react';
import { redirect, useNavigate } from 'react-router-dom';
import axios from 'axios';

export const creatContext1 = createContext()

function App() {
  
  const [IsLoggedIn, setIsLoggedIn] = useState(localStorage.getItem("accessToken") && localStorage.getItem("refreshToken") ? true : false);
  
  
  return (
  

    
    <creatContext1.Provider value={{IsLoggedIn:IsLoggedIn,setIsLoggedIn:setIsLoggedIn}} >
      <Router/>
    </creatContext1.Provider>

  );
}

export default App;
