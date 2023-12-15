import React from 'react'
import { Box, Button, Typography } from "@mui/material";
import { useNavigate } from 'react-router-dom';
import unauthorizedImg from '../assets/access_denied.png';

import { tokens } from ".././theme";
import { useTheme } from "@mui/material";

function Unapproved() {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const navigate = useNavigate();


    const goBack = () =>{
        navigate("/login");
    } 


  return (
    <Box className = "flex justify-center align-itenms-center" style={{height : "90vh",overflowY: 'scroll', padding : "20px"}}>
        {/* <Header title="UNAUTHORIZED" /> */}
        <div className='flex flex-column justify-center align-items-center'>
        <Typography variant='h2' className='text-center mb-4' >
                Pending Approval !!
            </Typography>
        <Typography variant='h3' className='text-center' >
                looks like we're still waiting for admin approval. Don't worry, we're on it! <br/> We'll give you the green light as soon as we get the go-ahead
            </Typography>
            <img
                  alt="unauthorized"
                  src={unauthorizedImg}
                  style={{ cursor: "pointer", height : "450px", width : "450px"}}
                />
            <Button
                onClick={goBack}
              style={{
                width: "25%",
                backgroundColor: colors.blueAccent[700],
                color: colors.grey[100],
                fontSize: "14px",
                fontWeight: "bold",
                padding: "10px 20px",
                margin: "20px"
              }}
            >
              Login Again
            </Button>
           
        </div>
    </Box>
  )
}

export default Unapproved;