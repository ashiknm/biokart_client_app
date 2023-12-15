import React from "react";
import { useState } from "react";
import { Sidebar, Menu } from "react-pro-sidebar";
import { Box,  Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";

import AccountBoxIcon from "@mui/icons-material/AccountBox";
import HomeIcon from "@mui/icons-material/Home";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import NotificationsIcon from "@mui/icons-material/Notifications";
import ContactSupportIcon from "@mui/icons-material/ContactSupport";
import Modal from "@mui/material/Modal";
// import {  Typography } from "@mui/material";

import {  useNavigate } from "react-router-dom";
import { useEffect } from "react";


const Item = ({ title, to, icon, selected, setSelected, userid }) => {

  const navigate = useNavigate();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const handleMenuItemClick = () => {
    setSelected(title);
    navigate(to);
  };


  return (
    <Box
        // active={selected === title}
        className={`flex align-items-center p-2 me-3 rounded cursor-pointer menuclass ${theme.palette.mode === "dark"? "menuclass-darkmode" : "menuclass-lightmode"} `}
        style={{
          color: colors.grey[100],
          height: "60px"
        }}
        onClick={handleMenuItemClick}
        // icon={icon}
      >
        {title === 'Home'?<HomeIcon />
        :title === 'Profile'?<AccountBoxIcon />
        :title === 'Credits'?<AccountBalanceWalletIcon />
        :title === 'Notification'?<NotificationsIcon />
        :<ContactSupportIcon />
      }
        <Typography style = {{fontSize: 18}} className="ms-2">{title}</Typography>
      </Box>
  );
};

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



const Sidebardiv = ({userid}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [selected, setSelected] = useState("Dashboard");
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(()=>{
    console.log("userId :",userid)
  },[userid]);

  return (
    <Box style = {{backgroundColor : colors.primary[400] }} >
      <div className="flex  h-screen " style={{ height: "100vh" }}>
        <div
          className="hidden md:flex "
          style={{
            width: "100%",
          }}
        >
          <Box  style={{
            width: "100%",
            height : "100%"
          }}>
            <Sidebar
            className="pt-2"
              width="100%"
              height = "100%"
              backgroundColor={colors.primary[400]}
              style={{border: null, paddingLeft: "10%"}}
            >
              <Menu iconShape="square">
                <Box paddingLeft={"10%"} >
                  <Item
                    title="Home"
                    to="/dashboard"
                    icon={<HomeIcon />}
                    selected={selected}
                    setSelected={setSelected}
                    className = "iconclass"
                  />

                  <Item
                    title="Profile"
                    to="/settings/profile"
                    icon={<AccountBoxIcon />}
                    selected={selected}
                    setSelected={setSelected}
                  />
                  <Item
                    title="Credits"
                    to="/settings/creditsSettings"
                    icon={<AccountBalanceWalletIcon />}
                    selected={selected}
                    setSelected={setSelected}
                  />
                  <Item
                    title="Notifications"
                    to="/settings/notificationSettings"
                    icon={<NotificationsIcon />}
                    selected={selected}
                    setSelected={setSelected}
                  />
                  <Item
                    title="Help"
                    to="/settings/help"
                    icon={<ContactSupportIcon />}
                    userid={userid}
                    selected={selected}
                    setSelected={setSelected}
                  />
                   <button onClick={()=>setModalOpen(true)} className='rounded ms-4 mt-2 py-2 px-4 text-white' style={{backgroundColor : '#8057D7'}}>
                  Buy Credits
          </button>
                </Box>
              </Menu>
            </Sidebar>
          </Box>
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
              Buy Credits?
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              <h1>Are you sure you want to buy credits ?</h1>
              

              <div className="flex justify-between align-items-center mt-4">
              <button
                  type="button"
                  className="btn bg-dark text-light"
                  // data-bs-dismiss="modal"
                  onClick={()=>setModalOpen(false)}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="btn "
                  style = {{backgroundColor: colors.grey[100], color: colors.greenAccent[600]}}
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
    </Box>
  );
};

export default Sidebardiv;
