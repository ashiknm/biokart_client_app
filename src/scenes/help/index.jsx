import React from "react";
import WavingHandIcon from "@mui/icons-material/WavingHand";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import {  useTheme } from "@mui/material";
import { tokens } from "../../theme";

import useAxiosPrivate from "../../hooks/useAxiosPrivate";

function Help() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const location = useLocation();

  const [userId, setUserId] = useState(localStorage.getItem("userId"));
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);

  const [userdata, setUserdata] = useState({});
  const [faq, setFaq] = useState([]);

  const  CONTACT_URL = "/insertcontactus";

  useEffect(()=>{
    let isMounted = true;
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

  const getFAQ = async () => {
    try {
        const response = await axiosPrivate.get(`/showallfaq`, {
            // signal: controller.signal
        });
        isMounted && setFaq(response.data);

    } catch (err) {
        console.error(err);
        navigate('/login', { state: { from: location }, replace: true });
    }
}


     getUserData();
     getFAQ();
    return () => {
        isMounted = false;
        // controller.abort();
    }

  },[axiosPrivate, location, navigate, userId]);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Set the selected image file to the state
      setSelectedImage(URL.createObjectURL(file));
    }
  };

  const contactus = async ()=>{
    const response = await axiosPrivate.post(
      CONTACT_URL,
      JSON.stringify({
        user_id: userId,
        user_name: userdata.username,
        subject: subject,
        message: message,
        upload_screenshot: selectedImage
      }),
      {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
        method : 'POST',
      }
    );
    setSelectedImage(null);
    setSubject('');
    setMessage('');
    toast.success('Message sent Successfully');
  }




  return (
    <div
      className="h-screen w-full flex"
      style={{ width: "100%", height: "100%",  overflow : "auto" }}
    >
      <div className="ps-5" style={{ width: "60%", height: "100%" }}>
        <div  style = {{height : "10%"}}>
          <h1 className="h4 mt-3 ">Got any queries?</h1>
          <p className="mt-1 ">Contact us</p>
          <hr style={{ width: "50%" }} />
        </div>
        <div  style = {{height : "20%"}}>
          <h1 className="h5 mt-4 "  >Corporate office:</h1>
          <div className="ps-3">
          <p style={{ width: "60%", fontSize : '14px' }}>
            BioKart Lab, 1st Floor, 401-4AB Cross, 1st Main, Kasturi Nagar, East
            of NGEF, Bengaluru – 560043, Karnataka, India.
          </p>
          <p className="mt-3" style={{fontSize : '14px' }}>Ph. No. +91 9008491839</p>
          <p style={{fontSize : '14px' }}>email id. vikram@biokart.com</p>
          </div>
        </div>
       
       
       
        <div
          className=" flex flex-col mb-2"
          style={{ width: "90%", height: "60%" }}
        >
           <h1 className="h5  mb-4 " >Freequently Asked Questios</h1>
          {/* {metagenomeAnalysisFAQ.map((item, index) => (
            <div
              className="flex border-bottom py-2 px-3 align-items-center"
              style={{ height: "auto", width: "100%" }}
              key={index}
            >
              <div style={{ flex: 1 }}>
                <div
                  className="border"
                  style={{
                    height: "20px",
                    width: "20px",
                    borderRadius: "50%",
                    backgroundColor: "#A5A6F6",
                  }}
                ></div>
              </div>
              <div style={{ flex: 10 }}>
                <h1>{item.question}</h1>
              </div>
              <div style={{ flex: 1 }}>
                <ChevronRightIcon />
              </div>
            </div>
          ))} */}

          {faq.map((item, index) => (
            <Accordion className="mb-3" key = {index}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id={index}
              >
                <Typography style={{fontSize:'14px'}}>{item.question}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography style={{fontSize:'14px'}}>
                  {item.answer}
                </Typography>
              </AccordionDetails>
            </Accordion>
          ))}
        </div>
      </div>
      <div className="" style={{ width: "40%", height: "100%" }}>
        <div
          className="shadow flex flex-col rounded align-items-center "
          style={{
            height: "90%",
            width: "90%",
            backgroundColor: colors.primary[400],
            margin: "5%",
          }}
        >
          <h1 className="h3  font-semibold mt-5" style = {{color: colors.grey[100]}}>Contact Us</h1>
          <p className=" my-2">
            Welcome to help center
            <WavingHandIcon className="ps-2" />
          </p>
          <p className=" mt-2">Please describe the problem</p>
          <p className="">attach screenshot if needed.</p>
          <div className="w-100 flex flex-col align-items-center mt-5" >
            <input
              className="rounded ps-4"
              type="text"
              placeholder="Subject"
              value={subject}
              onChange={(e)=>setSubject(e.target.value)}
              style={{ width: "80%", height: "40px", backgroundColor: (theme.palette.mode === "dark") ? "white" : '#fffff' }}
            />
            <textarea
              className="rounded ps-4 mt-4"
              type="text"
              placeholder="Message"
              value={message}
              rows={4}  // You can adjust the number of rows as needed
              cols={65} // You can adjust the number of columns as needed
              onChange={(e)=>setMessage(e.target.value)}
              style={{backgroundColor: (theme.palette.mode === "dark") ? "white" : '#fffff' }}
            />
            <input
              className="rounded ps-4 mt-4"
              type="file"
              placeholder="Subject"
              style={{ width: "80%", height: "40px" }}
              onChange={handleFileChange}
            />
            <button className="btn bg-danger text-white mt-4" onClick={contactus}>Submit</button>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Help;
