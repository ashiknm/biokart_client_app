import React from "react";
import { useState, useRef } from "react";

import useAuth from "../hooks/useAuth";

import axios from "../api/axios";

// import loginImg from '../assets/login.jpg'
import handshakeimg from "../assets/handshake.png";
import biokartlogo from "../assets/biokartlogo.png";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { TextField } from "@mui/material";
import { useEffect } from "react";

import useInput from "../hooks/useInput";
import useToggle from "../hooks/useToggle";

import { useTheme } from "@mui/material";
import { tokens } from ".././theme";

const LOGIN_URL = "/login";

function Loginpage() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { setAuth } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/dashboard";

  const errorRef = useRef();

  //   const [email_username, setEmail_username] = useInput('')
  const [email_username, resetUser, userAttribs] = useInput(
    "email_username",
    ""
  );

  const [password, setPassword] = useState("");

  const [errorMsg, setErrorMsg] = useState("");

  const [check, toggleCheck] = useToggle("persist", false);

  const gradientStyle = {
    background: "linear-gradient(to bottom, #59599B, #24243E, #0F0C29)",
    height: "100vh", // Adjust as needed
    width: "600px",
    // display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        LOGIN_URL,
        JSON.stringify({
          email_or_username: email_username,
          password: password,
        }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      console.log(JSON.stringify(response?.data));
      const accessToken = response?.data?.accessToken;
      console.log("accessToken from login : ", accessToken);
      const refreshToken = response?.data?.refreshToken;
      const userId = response?.data?.userId;

      const approveduser = response?.data?.approveduser;

      resetUser();
      setPassword("");
      if(approveduser){
        setAuth({ userId, email_username, accessToken, refreshToken });
        localStorage.setItem("refreshToken", refreshToken);
        localStorage.setItem("userId", userId);
        navigate(from, { replace: true });
      }else{
        navigate("/unapproved");
      }
      
    } catch (err) {
      if (!err?.response) {
        setErrorMsg("No Server Response");
      } else if (err.response?.status === 400) {
        setErrorMsg("Missing username or password");
      } else if (err.response?.status === 401) {
        setErrorMsg("Unauthorized");
      } else {
        setErrorMsg("Login Failed");
      }
      errorRef.current.focus();
    }
  };

  return (
    <div className="flex  h-screen ">
      <div className="hidden md:flex " style={gradientStyle}>
        <div>
          <img
            className=" self-center"
            src={handshakeimg}
            alt=""
            style={{ width: "100%", display: "block", margin: "20% 0 0 0" }}
          />
          <h1 className="text-center font-semibold text-white text-4xl">
            METAGENOME <br /> ANALYSIS
          </h1>
          <h1 className="text-center font-semibold text-white text-2xl mt-10">
            A part of ngsanalysis.com
          </h1>
          <h1 className="text-center font-semibold text-white text-1xl mt-5">
            You can reach us via the following contact information <br />
            Contact Person: Vikram S. <br /> &nbsp; &nbsp; &nbsp; &nbsp; Email
            ID: vikram@biokart.com
          </h1>
        </div>

        <img
          className=" self-center"
          src={biokartlogo}
          alt=""
          style={{ position: "absolute", top: "10%" }}
        />
      </div>
      <div
        className=" flex  flex-col justify-center w-full"
        style={{ height: "100vh" }}
      >
        <h2 className="flex justify-center text-3xl font-bold text-center mt-3 mb-2">
          TARGETED METAGENOME ANALYSIS
        </h2>
        <h2 className="text-2xl font-bold text-center mb-5 ">
          from FASTQ to report
        </h2>
        <h2 className="text-1xl font-bold text-center  mb-10">
          LOGIN TO CONTINUE
        </h2>
        <form
          className="max-w-[500px] w-full mx-auto  p-4"
          onSubmit={handleSubmit}
        >
          <div className="p-4 rounded shadow-sm" style={{ backgroundColor: colors.primary[400] }}>
            <p
              ref={errorRef}
              aria-live="assertive"
              className={errorMsg ? "p-2 text-sm text-danger" : "hidden"}
            >
              {errorMsg}
            </p>
            <div className="flex flex-col py-2">
              <TextField
                label="Email / Username"
                variant="outlined"
                type="text"
                required
                // value = {email_username}
                // onChange={(e)=>setEmail_username(e.target.value)}
                {...userAttribs}
                autoComplete="off"
              />
            </div>
            <div className="flex flex-col py-2">
              <TextField
                label="Password"
                variant="outlined"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="persistCheck">
              <input
                type="checkbox"
                id="persist"
                onChange={toggleCheck}
                checked={check}
              />
              <label htmlFor="persist">Trust This Devise</label>
            </div>
            <button
              className="border w-full my-5 py-2 text-white"
              style={{ backgroundColor: "#24243E" }}
            >
              Proceed to my Account
            </button>
          </div>
          <p className="text-center cursor-pointer my-5">
            Having Issues with your Password
          </p>
          <p className="text-center">
            Not a Member Yet?{" "}
            <span className="font-bold cursor-pointer">
              <Link to="/register">JOIN NOW</Link>
            </span>{" "}
          </p>
        </form>
      </div>
    </div>
  );
}

export default Loginpage;
