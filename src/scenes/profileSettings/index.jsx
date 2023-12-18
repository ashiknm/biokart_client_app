import React from 'react'
import { TextField } from "@mui/material";
import { Link, } from 'react-router-dom';
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom"
import Modal from "@mui/material/Modal";
import { Box, Typography } from "@mui/material";

import useAxiosPrivate from "../../hooks/useAxiosPrivate";

const ProfileSettings =() =>{

  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const location = useLocation();

  const [userId, setUserId] = useState(localStorage.getItem("userId"));

  const [modalOpen, setModalOpen] = useState(false);

  const [fullName, setFullName] = useState("");
  const [piName, setPiName] = useState("");
  const [email, setEmail] = useState("");
  const [department, setDepartment] = useState("");
  const [phonenumber, setPhonenumber] = useState("");
  const [institute_organization, setInstitute_organization] = useState("");
  const [address, setAddress] = useState("");
  const [country, setCountry] = useState("");


  const [userdata, setUserdata] = useState({});

  const UPDATE_URL = "/updateprofile";

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

  useEffect(()=>{
    let isMounted = true;
    const getUserData = async () => {
      let response = null;
      try {
          response = await axiosPrivate.get(`/oneuser/${userId}`);
          if(isMounted) {
            setUserdata(response.data)
            setFullName(response.data.full_name);
            setPiName(response.data.project_incharge_name);
            setEmail(response.data.email);
            setDepartment(response.data.research_department);
            setPhonenumber(response.data.phone);
            setInstitute_organization(response.data.institution_organization);
            setAddress(response.data.address);
            setCountry(response.data.country);
          } 

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

  },[]);

  useEffect(()=>{
    

  },[userdata]);

  const updateProfile = async () =>{
    const response = await axiosPrivate.post(
      UPDATE_URL,
      JSON.stringify({
        user_id: userId,
        full_name: fullName,
        project_incharge_name: piName,
        email: email,
        research_department: department,
        phone: phonenumber,
        institution_organization: institute_organization,
        address: address,
        country: country,
        password: userdata.password,
      }),
      {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
        method : 'POST',
        
      }
    );

    console.log(response);
    setModalOpen(true);
  }

  const reset = ()=>{
    setFullName(userdata.full_name);
    setPiName(userdata.project_incharge_name);
    setEmail(userdata.email);
    setDepartment(userdata.email);
    setPhonenumber(userdata.research_department);
    setInstitute_organization(userdata.institution_organization);
    setAddress(userdata.address);
    setCountry(userdata.country);
  }


  return (
    <div className='h-screen w-full flex' style={{'width' : '100%', 'height' : '100%'}}>
      <div className=' rounded shadow flex flex-col m-auto' style = {{height: '95%', width : '95%'}}>
        <h1 className='font-bold h1 mt-5 ms-5'>Update Profile</h1>
      <div className='max-w-[1000px] md:w-full m-auto p-4' >
              
              <div className="flex flex-wrap -mx-2">
          <div className="w-full md:w-1/2 px-2 mb-4">
            
            <TextField
              label="Name" variant="outlined"
              className="appearance-none  rounded w-full  text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="username"
              type="text"
              placeholder="Enter your Name *"
              required
              value={fullName}
              onChange={(e)=>setFullName(e.target.value)}
            />
          </div>
          <div className="w-full md:w-1/2 px-2 mb-4">
            <TextField
             label="P.I Name" variant="outlined"
              className="appearance-none  rounded w-full  text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="piname"
              type="text"
              placeholder="P.I Name"
              value={piName}
              onChange={(e)=>setPiName(e.target.value)}
            />
          </div>
          <div className="w-full md:w-1/2 px-2 mb-4">
            
            <TextField
            label="Email" variant="outlined"
              className="appearance-none  rounded w-full  text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="text"
              placeholder="Email Address *"
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
             required
            />
          </div>
          <div className="w-full md:w-1/2 px-2 mb-4">
            <TextField
            label="Department" variant="outlined"
              className="appearance-none  rounded w-full  text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="department"
              type="text"
              placeholder="Department of Research"
              value={department}
              onChange={(e)=>setDepartment(e.target.value)}
              
            />
          </div>
          <div className="w-full md:w-1/2 px-2 mb-4">
            
            <TextField
            label="Phone Number" variant="outlined"
              className="appearance-none  rounded w-full  text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="phonenumber"
              type="text"
              placeholder="Phone Number *"
             required
             value={phonenumber}
              onChange={(e)=>setPhonenumber(e.target.value)}
            />
          </div>
          <div className="w-full md:w-1/2 px-2 mb-4">
            <TextField
            label="Institue / Organization" variant="outlined"
              className="appearance-none  rounded w-full  text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="institute"
              type="text"
              placeholder="Institue / Organization *"
             required
             value={institute_organization}
              onChange={(e)=>setInstitute_organization(e.target.value)}
            />
          </div>
          <div className="w-full md:w-1/2 px-2 mb-4">
            
            <TextField
             label="Address" variant="outlined"
              className="appearance-none  rounded w-full  text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="address"
              type="text"
              placeholder="Address"
              value={address}
              onChange={(e)=>setAddress(e.target.value)}
            />
          </div>
          <div className="w-full md:w-1/2 px-2 mb-4">
            <TextField
             label="Country" variant="outlined"
              className="appearance-none  rounded w-full  text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="country"
              type="text"
              placeholder="Country"
              value={country}
              onChange={(e)=>setCountry(e.target.value)}
            />
          </div>
        </div>
        <div className='flex align-items-center'>
        <button className='border my-2 py-2 px-4 text-white' style={{backgroundColor : '#24243E'}} onClick={updateProfile}>
                  Update 
          </button>
            <p className='font-bold mx-4 cursor-pointer' onClick={reset}> Reset </p>
        </div>
             
            
              
          </div>
      </div>
      {modalOpen && (
        <Modal
          open={modalOpen}
          onClose={()=>setModalOpen(false)}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
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
            </div>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Message Sent !!
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              <h1>Thank you for updating your profile. Your changes will be reviewed by our admin team.<br/><br/> Once your profile is approved, the updates will be reflected.<br/><br />We appreciate your patience. </h1>
              

              <div className="flex justify-end align-items-center mt-4">
                <button
                  type="button"
                  className="btn btn-outline-dark"
                  // data-bs-dismiss="modal"
                  onClick={()=>setModalOpen(false)}
                >
                  Ok
                </button>
              </div>
            </Typography>
          </Box>
        </Modal>
      )}
    </div>
  )
}

export default ProfileSettings;