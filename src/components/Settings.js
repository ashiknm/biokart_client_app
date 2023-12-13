import React from "react";
import { useState, useEffect } from "react";

import Sidebardiv from "../scenes/global/Sidebardiv";

import {  Outlet } from "react-router-dom";


import Topbar from "../scenes/global/Topbar";

import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { useNavigate, useLocation } from "react-router-dom";

function Settings() {

  const [userdata, setUserdata] = useState({});
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect (() => {
    let isMounted = true;
    // const controller = new AbortController();
    const userId = localStorage.getItem("userId");

    const getUserData = async () => {
      try {
          const response = await axiosPrivate.get(`/oneuser/${userId}`, {
              // signal: controller.signal
          });
          isMounted && setUserdata(response.data);

      } catch (err) {
          console.error(err);
          navigate('/login', { state: { from: location }, replace: true });
      }
  }
     getUserData();

    return () => {
        isMounted = false;
        // controller.abort();
    }
}, []);



  return (
    <div className="h-screen p-0 container-fluid" style={{ height: "100vh", overflow: "hidden" }}>
      <div style={{ height: "10%" }}>
        <Topbar fullname={userdata.full_name} />
      </div>
      <div className="flex" style={{ height: "90%" }}>
      <div  style={{ width: "20%" }}>
      <Sidebardiv userid={userdata.user_id}></Sidebardiv>
      </div>
      <div style={{ width: "80%" }}>
      <Outlet />
      </div>
        
       
      </div>
     
    </div>
  );
}

export default Settings;
