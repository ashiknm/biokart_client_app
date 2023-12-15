import React from "react";
import { useRef, useState, useEffect } from "react";
// import loginImg from '../assets/login.jpg'
import handshakeimg from "../assets/handshake.png";
import biokartlogo from "../assets/biokartlogo.png";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Modal from "@mui/material/Modal";
import { Box, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

import InfoIcon from "@mui/icons-material/Info";

import axios from "../api/axios";

import { TextField, MenuItem } from "@mui/material";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { isPossiblePhoneNumber } from "react-phone-number-input";

import { useTheme } from "@mui/material";
import { tokens } from ".././theme";

import { countries } from "../data/mockdata";

const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9_ -]{3,23}$/;
const Email_regex = /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/;
const approved_mail = /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+@(edu\.in)$/; 
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

const REGISTER_URL = "/register";

const style = {
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  // border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  maxHeight: "100vh", // Set maximum height
  overflowY: "auto", // Enable vertical scroll if content overflows
  position: "relative",
};

function Registerpage() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();
  const [modalOpen, setModalOpen] = useState(false);

  const [approvedMail, setApprovedMail] = useState(false);

  const fullNameRef = useRef();
  const errorRef = useRef();

  const [fullName, setFullName] = useState("");
  const [validName, setValidName] = useState(false);

  const [username, setUsername] = useState("");

  const [piName, setPiName] = useState("");
  const [validPiName, setValidPiName] = useState(false);

  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState(false);

  const [department, setDepartment] = useState("");
  const [validDepartment, setValidDepartment] = useState(false);

  const [phonenumber, setPhonenumber] = useState("");

  const [institute_organization, setInstitute_organization] = useState("");
  const [address, setAddress] = useState("");
  const [country, setCountry] = useState("");

  const [password, setPassword] = useState("");
  const [validPassword, setValidPassword] = useState(false);

  const [confirmPassword, setConfirmPassword] = useState("");
  const [validConfirmpassword, setValidConfirmpassword] = useState(false);

  const [errorMsg, setErrorMsg] = useState("");

  const handleClose = () => {
    setModalOpen(false);
    navigate("/dashboard");
  };

  useEffect(() => {
    fullNameRef.current.focus();
  }, []);

  const getEmailUsername = () => {
    // Using regular expression to extract the username before the @ symbol
    if(validEmail){
      const user_name = email.match(/^([^@]*)@/)[1];
      setUsername(user_name);
    }
    
  };

  useEffect(() => {
    const result = USER_REGEX.test(fullName);
    setValidName(result);
  }, [fullName]);

  useEffect(() => {
    const result = USER_REGEX.test(piName);
    setValidPiName(result);
  }, [piName]);

  useEffect(() => {
    const result = Email_regex.test(email);
    const approved_email = approved_mail.test(email);
    setValidEmail(result);
    setApprovedMail(approved_email);
    getEmailUsername();
    console.log(approvedMail);
  }, [email]);

  useEffect(() => {
    const result = USER_REGEX.test(department);
    setValidDepartment(result);
  }, [department]);

  useEffect(() => {
    const result = PWD_REGEX.test(password);
    setValidPassword(result);
    const match = password === confirmPassword;
    setValidConfirmpassword(match);
  }, [password, confirmPassword]);

  useEffect(() => {
    const result = PWD_REGEX.test(password);
    setValidPassword(result);
  }, [confirmPassword]);



  const register = async () => {
    if (
      !fullName ||
      !email ||
      !phonenumber ||
      !institute_organization ||
      !password ||
      !confirmPassword
    ) {
      alert("please select all required fields");
    } else  {
        try {
          const response = await axios.post(
            REGISTER_URL,
            JSON.stringify({
              full_name: fullName,
              username: username,
              project_incharge_name: piName,
              email: email,
              research_department: department,
              phone: phonenumber,
              institution_organization: institute_organization,
              address: address,
              country: country,
              password: password,
            }),
            {
              headers: { "Content-Type": "application/json" },
              withCredentials: true,
              method : 'POST',
              
            }
          );
          console.log(response);
          if (!approvedMail) {
            setModalOpen(true);
          }else{
            navigate("/login");
          }
          
        } catch (err) {
          if(!err?.response){
            setErrorMsg("No Seerver Rewsponse");
          }else if(err.response?.status === 409){
            setErrorMsg("User already registerd");
          }else{
            setErrorMsg("Registration Failed");
          }
          errorRef.current.focus();
        }

       
      }
    };

  const gradientStyle = {
    background: "linear-gradient(to bottom, #59599B, #24243E, #0F0C29)",
    height: "100vh", // Adjust as needed
    width: "600px",
    // display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
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
      <div className=" flex  flex-col justify-center w-full md:h-full">
        <h2 className="flex justify-center text-3xl font-bold text-center mt-3 md:mt-5">
          TARGETED METAGENOME ANALYSIS
        </h2>
        <h2 className="text-2xl font-bold text-center mb-2 sm:text-1xl">
          from FASTQ to report
        </h2>
        <h2 className="text-1xl font-bold text-center  mb-1">
          REGISTRATION FORM
        </h2>
        <div className="max-w-[700px] md:w-full mx-auto  p-4 " style = {{backgroundColor: colors.primary[400]}}>
          <p ref = {errorRef} aria-live="assertive" className={errorMsg ? "p-2 text-sm text-danger": "hidden"}>{errorMsg}</p>
          <div className="flex flex-wrap -mx-2">
            <div className="w-full md:w-1/2 px-2 mb-4">
              <TextField
                ref={fullNameRef}
                autoComplete="off"
                label="Full Name"
                variant="outlined"
                className="appearance-none  rounded w-full  text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="fullname"
                type="text"
                placeholder="Enter your Full Name *"
                required
                value={fullName}
                onChange={(event) => setFullName(event.target.value)}
                aria-invalid={validName ? "false" : "true"}
                aria-describedby="uidnote"
              />
              <p
                id="uidnote"
                className={
                  fullName && !validName
                    ? "bg-dark text-light rounded text-sm p-2 mt-1"
                    : "hidden"
                }
              >
                <InfoIcon fontSize="25" className="me-2" />
                4 to 24 characters. <br />
                Must begin with a letter <br />
                Letters, numbers, underscores, hyphens allowed <br />
              </p>
            </div>
            <div className="w-full md:w-1/2 px-2 mb-4">
              <TextField
                // ref = {piNameRef}
                label="P.I Name"
                autoComplete="off"
                variant="outlined"
                className="appearance-none  rounded w-full  text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="piname"
                type="text"
                placeholder="P.I Name"
                value={piName}
                onChange={(event) => setPiName(event.target.value)}
                aria-invalid={validPiName ? "false" : "true"}
                aria-describedby="uidnote2"
              />
              <p
                id="uidnote2"
                className={
                  piName && !validPiName
                    ? "bg-dark text-light rounded text-sm p-2 mt-1"
                    : "hidden"
                }
              >
                <InfoIcon fontSize="25" className="me-2" />
                4 to 24 characters. <br />
                Must begin with a letter <br />
                Letters, numbers, underscores, hyphens allowed <br />
              </p>
            </div>
            <div className="w-full md:w-1/2 px-2 mb-4">
              <TextField
                label="Email"
                autoComplete="off"
                variant="outlined"
                className="appearance-none  rounded w-full  text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="email"
                type="text"
                placeholder="Email Address *"
                required
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                aria-invalid={validEmail ? "false" : "true"}
                aria-describedby="uidnote3"
              />
              <p
                id="uidnote3"
                className={
                  email && !validEmail
                    ? "bg-dark text-light rounded text-sm p-2 mt-1"
                    : "hidden"
                }
              >
                <InfoIcon fontSize="25" className="me-2" />
                Email Address is not valid
              </p>
            </div>
            <div className="w-full md:w-1/2 px-2 mb-4">
              <TextField
                label="Department"
                autoComplete="off"
                variant="outlined"
                className="appearance-none  rounded w-full  text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="department"
                type="text"
                placeholder="Department of Research"
                value={department}
                onChange={(event) => setDepartment(event.target.value)}
                aria-invalid={validDepartment ? "false" : "true"}
                aria-describedby="uidnote4"
              />
              <p
                id="uidnote4"
                className={
                  department && !validDepartment
                    ? "bg-dark text-light rounded text-sm p-2 mt-1"
                    : "hidden"
                }
              >
                <InfoIcon fontSize="25" className="me-2" />
                Department is not valid
              </p>
            </div>
            <div className="w-full flex md:w-1/2 px-2 mb-4">
              <div
                className="border flex align-items-center p-2 rounded w-full"
                style={{ borderColor: "black", backgroundColor: colors.primary[400] }}
              >
                <PhoneInput
                  defaultCountry="IN"
                  className="text-dark"
                  placeholder="Enter phone number"
                  style={{ border: "none", backgroundColor: colors.primary[400] }}
                  value={phonenumber}
                  onChange={setPhonenumber}
                  error={
                    phonenumber && isPossiblePhoneNumber(phonenumber)
                      ? "true"
                      : "false"
                  }
                />
              </div>

              {/* <TextField
                label="Phone Number"
                variant="outlined"
                className="appearance-none  rounded w-full  text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="phonenumber"
                type="text"
                placeholder="Phone Number *"
                required
                value={phonenumber}
                onChange={(event) => setPhonenumber(event.target.value)}
              /> */}
            </div>
            <div className="w-full md:w-1/2 px-2 mb-4">
              <TextField
                label="Institue / Organization"
                autoComplete="off"
                variant="outlined"
                className="appearance-none  rounded w-full  text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="institute"
                type="text"
                placeholder="Institue / Organization *"
                required
                value={institute_organization}
                onChange={(event) =>
                  setInstitute_organization(event.target.value)
                }
              />
            </div>
            <div className="w-full md:w-1/2 px-2 mb-4">
              <TextField
                label="Address"
                autoComplete="off"
                variant="outlined"
                className="appearance-none  rounded w-full  text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="address"
                type="text"
                placeholder="Address"
                value={address}
                onChange={(event) => setAddress(event.target.value)}
              />
            </div>
            <div className="w-full md:w-1/2 px-2 mb-4">
              <TextField
                select
                label="Country"
                variant="outlined"
                // value={databasename}
                // onChange={(event)=>setDatabasename(event.target.value)}
                laceholder="Country"
                className="appearance-none  rounded w-full  text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="country"
                value={country}
                onChange={(event) => {
                  setCountry(event.target.value);
                }}
                type="text"
              >
                {countries.map((item, index) => (
                  <MenuItem key={index} value={item.name}>
                    {item.name}
                  </MenuItem>
                ))}
              </TextField>
            </div>
            <div className="w-full md:w-1/2 px-2 mb-4">
              <TextField
                label="Password"
                autoComplete="off"
                variant="outlined"
                className="appearance-none  rounded w-full  text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="password"
                type="password"
                placeholder="Password *"
                required
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                aria-invalid={validPassword ? "false" : "true"}
                aria-describedby="uidnote5"
              />
              <p
                id="uidnote5"
                className={
                  password && !validPassword
                    ? "bg-dark text-light rounded text-sm p-2 mt-1"
                    : "hidden"
                }
              >
                <InfoIcon fontSize="25" className="me-2" />
                8 to 24 characters. <br />
                Must include uppercase and lowercase letters, a number and a
                special character. <br />
                Allowed Special characters:{" "}
                <span aria-label="explanation mark">!</span>
                <span aria-label="at symbol">@</span>
                <span aria-label="hashtag">#</span>
                <span aria-label="dollar sign">$</span>
                <span aria-label="percent">%</span>
                <br />
              </p>
            </div>
            <div className="w-full md:w-1/2 px-2 mb-4">
              <TextField
                label="Confirm Password"
                variant="outlined"
                className="appearance-none  rounded w-full  text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="confirmpassword"
                type="password"
                placeholder="Confirm Password *"
                required
                value={confirmPassword}
                onChange={(event) => setConfirmPassword(event.target.value)}
                aria-invalid={validConfirmpassword ? "false" : "true"}
                aria-describedby="uidnote6"
              />
              <p
                id="uidnote6"
                className={
                  confirmPassword && !validConfirmpassword
                    ? "bg-dark text-light rounded text-sm p-2 mt-1"
                    : "hidden"
                }
              >
                <InfoIcon fontSize="25" className="me-2" />
                Password does not match
              </p>
            </div>
          </div>
          <button
            className="border w-full my-2 py-2 text-white"
            // data-bs-toggle="modal"
            // data-bs-target="#exampleModal"
            onClick={register}
            style={{ backgroundColor: "#24243E" }}
          >
            Become a Member
          </button>
          <p className="text-center">
            Already a Member?{" "}
            <span className="font-bold cursor-pointer">
              {" "}
              <Link to="/login">LOG IN NOW</Link>
            </span>{" "}
          </p>
        </div>
      </div>

      {modalOpen && (
        <Modal
          open={modalOpen}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box className = "bg-white" sx={style}>
            <div
              className="editModal"
              style={{
                height: "30px",
                width: "30px",
                position: "absolute",
                top: 0,
                right: 0,
                cursor: "pointer",
              }}
            >
              <CloseIcon onClick={() => setModalOpen(false)} />
            </div>
            <Typography className="text-dark" id="modal-modal-title" variant="h4" component="h2">
              Registration Successful !!
            </Typography>
            <Typography className="text-dark" varient = "h5" id="modal-modal-description" sx={{ mt: 2 }}>
              <h1>thank you for sharing your info to Biokart India </h1>
              <div
                className="mt-4 my-1 p-2"
                style={{
                  backgroundColor: "#FFE9D9",
                  borderLeft: "5px solid #FA703F",
                  width: "95%",
                  height: "auto",
                }}
              >
                <h1 className="ps-2 h5 text-dark">Message sent </h1>
                <h1 className="text-dark">
                  Confirmation email is sent to {email} please confirm to access
                  your account.
                </h1>
              </div>

              <div className="flex justify-end align-items-center mt-4">
                <button
                  type="button"
                  className="btn btn-outline-dark"
                  // data-bs-dismiss="modal"
                  onClick={handleClose}
                >
                  Ok
                </button>
              </div>
            </Typography>
          </Box>
        </Modal>
      )}
    </div>
  );
}

export default Registerpage;
