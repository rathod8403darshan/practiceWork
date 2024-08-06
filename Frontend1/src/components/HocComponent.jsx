import React, { useContext, useEffect, useState } from "react";
import Header from "./Header";
import { creatContext1 } from "../App";

const HocComponent = (Components) => {
    
    
    const MyFunc = ()=> {
        
        const value = useContext(creatContext1)
        
        return (
            <>
                <div className="sticky top-0 z-[99]"><Header /></div>
                <Components value={{IsLoggedIn:value.IsLoggedIn,setIsLoggedIn: value.setIsLoggedIn}}/>
            </>
        )
    }

  return MyFunc;
};

export default HocComponent;
