import React from "react";
import { useState, useRef, useContext } from "react";
import {  useEffect } from "react";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { tokens } from ".././theme";
import Statbox from "./Statbox";
import { TextField } from "@mui/material";
import { MenuItem } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import BorderColorIcon from '@mui/icons-material/BorderColor';

import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { useNavigate, useLocation } from "react-router-dom";

import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import LinearProgress from '@mui/material/LinearProgress';



import PeopleIcon from "@mui/icons-material/People";
import EmailIcon from "@mui/icons-material/Email";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import CorporateFareIcon from "@mui/icons-material/CorporateFare";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import DownloadForOfflineIcon from "@mui/icons-material/DownloadForOffline";
import SearchIcon from "@mui/icons-material/Search";
import EditIcon from "@mui/icons-material/Edit";
import KeyboardDoubleArrowDownIcon from "@mui/icons-material/KeyboardDoubleArrowDown";
import ClearIcon from '@mui/icons-material/Clear';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Topbar from "../scenes/global/Topbar";

import Modal from "@mui/material/Modal";

import { parse, format } from "date-fns";


const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  // border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  maxHeight: '100vh', // Set maximum height
  overflowY: 'auto', // Enable vertical scroll if content overflows
  position : 'relative'
};



function LinearProgressWithLabel(props) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Box sx={{ width: '100%', mr: 1 }}>
        <LinearProgress variant="determinate" {...props} />
      </Box>
      <Box sx={{ minWidth: 35 }}>
        <Typography variant="body2" color="text.secondary">{`${Math.round(
          props.value,
        )}%`}</Typography>
      </Box>
    </Box>
  );
}

function Dashboard() {
  // const navigate = useNavigate();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [selectedDate, setSelecteddate] = useState(null);
  const [open, setOpen] = React.useState(false);
  const [isdataAttributeModal, setIsdataAttributeModal] = React.useState(false);
  const [iseditdataModal, setIseditdataModal] = React.useState(false);
  const [uploadfromGoogle, setUploadfromGoogle] = React.useState(false);
  const [uploadfromLocal, setUploadfromLocal] = React.useState(false);
  const [notvalid, setNotvalid] = React.useState(false);
  const [alert, setAlert] = React.useState(false);
  const [alert2, setAlert2] = React.useState(false);
  const [alert3, setAlert3] = React.useState(false);
  const [projectname, setProjectname] = React.useState('');
  const [databasename, setDatabasename] = React.useState('');
  const [googleLink, setGoogleLink] = React.useState('');
  const [search, setSearch] = React.useState('');
  const [projectId, setProjectId] = React.useState('');

  const [projectStatus, setProjectStatus] = React.useState('noproject');

  const [selectedFiles, setSelectedFiles] = useState([]);

  const [progress, setProgress] = React.useState(0);

  const [data, setData] = useState([]);

  const [projectdata, setProjectdata] = useState([]);
  const [userdata, setUserdata] = useState({});


  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const location = useLocation();


  useEffect (() => {
    let isMounted = true;
    // const controller = new AbortController();
    const userId = localStorage.getItem("userId");

    const getProjectData = async () => {
        try {
            const response = await axiosPrivate.get(`/showallprojects/${userId}`, {
                // signal: controller.signal
            });
            isMounted && setProjectdata(response.data);
  
        } catch (err) {
            console.error(err);
            navigate('/login', { state: { from: location }, replace: true });
        }
    }

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

     getProjectData();
     getUserData();

    return () => {
        isMounted = false;
        // controller.abort();
    }
}, []);


const getFilteredRows = () => {
  return projectdata.filter(row =>
    row.project_name.toLowerCase().includes(search.toLowerCase())
  );
  
};

const getFilteredHistory = () => {
  let filteredRows = projectdata;
  if (selectedDate) {
    const formattedDate = format(new Date(selectedDate), 'dd/MM/yyyy');
    filteredRows = projectdata.filter(row => {
      return formattedDate.includes(row.date);
    });
  }
  return filteredRows;
  
};





  const uploadFile = () => {
    // Simulating file upload with progress
    const interval = setInterval(() => {
      setProgress((prevProgress) => {
        const newProgress = prevProgress + 10;

        const limitedProgress = newProgress > 100 ? 0 : newProgress;
        if (limitedProgress === 100) {
          clearInterval(interval);
          // Alert when upload is complete
          toast.success('Upload complete!');
          setProjectStatus('noproject');
          setIsdataAttributeModal(true);
        }
        return limitedProgress;
      });
    }, 500); // Increment progress every 5 seconds
  }

  // useEffect(() => {
  //   const timer = setInterval(() => {
  //     while(progress < 100){
  //       setProgress((prevProgress) => (prevProgress >= 100 ? 10 : prevProgress + 10));
  //     }
     
  //   }, 500);
  //   return () => {
      
  //     if (progress >= 100) {
  //       clearInterval(timer);
  //       setProjectStatus('noproject');
  //       console.log('upload successfull');
  //       // setProgress(10);
  //     }
  //   };
  // }, [progress]);

  const handleDrop = (e) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files);
    handleFiles(files);
  };

  const handleFiles = (files) => {
    setSelectedFiles((prevFiles) => [...prevFiles, ...files]);
  };

  const handleFileInputChange = (e) => {
    const files = Array.from(e.target.files);
    handleFiles(files);
  };


  useEffect(() => {
    // This effect will run whenever myArray changes
    if(uploadfromLocal &&   (selectedFiles.length % 2 !== 0 || selectedFiles.length === 0)){
      setAlert3(true);
    }else{
      setAlert3(false);
    }
  }, [selectedFiles]);  

 



  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleprojectDownload = (project_id) =>{
    toast.success("Project Downloaded Successfully "+project_id)
  }

  // const filteredRows = mockProjectHistorydate.filter(
  //   (row) => row.date === selectedDate
  // );

  const columns = [
    // { field: "id", headerName: "id", flex: 0.1 },
    {
      field: "project_name",
      headerName: "Job Name",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "date",
      headerName: "Date",
      flex: 1,
    },
    {
      field: "sample_size",
      headerName: "Samples",
      type: "number",
      headerAlign: "left",
      align: "center",
      flex: 0.8,
    },
    {
      // field: "accessLevel",
      headerName: "",
      flex: 0.1,
      renderCell: (params) => (
        <Box
            width="60%"
            m="0 auto"
            p="5px"
            display="flex"
            justifyContent="center"
            onClick={()=>handleprojectDownload(params.row.project_id)}
            style={{ cursor: "pointer" }}
            borderRadius="4px"
          >
            <Typography sx={{ ml: "5px" }}>
              <DownloadForOfflineIcon />
            </Typography>
          </Box>
      )
      
    },
  ];

  const getRowId = (row) => row.project_id;
  const getRowId2 = (row) => row.project_id;

  const handleProjectEdit = (project_id) =>{
    setProjectId(project_id);
    setIsdataAttributeModal(true);
  }

  const getStatusColor = (status) => {
    // Define color mapping based on status values
    switch (status) {
      case 'saved':
        return '#ffc107'; // Yellow
      case 'downloaded':
        return '#28a745'; // Green
      case 'executed':
        return '#dc3545'; // Red
      default:
        return '#6c757d'; // Gray
    }
  };

  const columns2 = [
    { field: "project_id", headerName: "Sl.no", flex: 0.3 },
    // {
    //   field: "project_id",
    //   headerName: "Project Id",
    //   flex: 1,
    //   cellClassName: "name-column--cell",
    // },
    {
      field: "project_name",
      headerName: "Project Name",
      flex: 1,
    },
    {
      field: "date",
      headerName: "Date",
      flex: 1,
    },
    {
      // field: "accessLevel",
      headerName: "Edit",
      field: "edit",
      flex: 0.5,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => (
        <Box
            width="60%"
            m="0 auto"
            p="5px"
            display="flex"
            justifyContent="center"
            onClick={()=>handleProjectEdit(params.row.project_id)}
            style={{ cursor: "pointer" }}
            borderRadius="4px"
          >
            <Typography sx={{ ml: "5px" }}>
              <EditIcon />
            </Typography>
          </Box>
      )
        
          
      
    },
    {
      // field: "accessLevel",
      headerName: "Execute",
      field: "execute",
      flex: 0.5,
      renderCell: (params) => (
        <Box
            width="60%"
            m="0 auto"
            p="5px"
            display="flex"
            justifyContent="center"
            style={{ cursor: "pointer" }}
            borderRadius="4px"
          >
            <button
          style={{
            minWidth:"100px",
            backgroundColor: getStatusColor(params.row.status),
            color: '#fff',
            border: 'none',
            padding: '5px 10px',
            borderRadius: '5px',
            cursor: 'pointer',
          }}
        >
          {params.row.status}
        </button>
          </Box>
        
      )
    },
  ];

  const handleclick = () =>{
    if(!projectname.trim()){
      setAlert(true);
    }else if(!uploadfromGoogle && !uploadfromLocal  ){
        setNotvalid(true);
        setAlert(false);
      }else{

        if(uploadfromGoogle && !googleLink.trim()){
          setAlert2(true);
          setAlert(false);
        }
        else if(uploadfromLocal &&   (selectedFiles.length % 2 !== 0 || selectedFiles.length === 0)){
          setAlert3(true);
          setAlert(false);
        }
        
        
        
        else {
          handleClose();
          setProjectname('');
          setUploadfromGoogle(false);
          setUploadfromLocal(false);
          setNotvalid(false);
          setAlert(false);
          setAlert2(false);
          setSelectedFiles([]);
          setProjectStatus('uploading');
          uploadFile();
        }



        
      }
    
    
  }

  const handleclick2 = () =>{
    setIsdataAttributeModal(false);
  }

  const handleclick3 = () =>{
    setIseditdataModal(false);
  }

  const handlegoogleSelected = () =>{
    setUploadfromGoogle(true);
    setNotvalid(false);
    setAlert3(false);
    setSelectedFiles([]);
    if(uploadfromLocal){
      setUploadfromLocal(false);
    }
  };

  const handlelocalSelected = () =>{
    setUploadfromLocal(true);
    setNotvalid(false);
    setAlert3(true);
    setGoogleLink('')
    if(uploadfromGoogle){
      setUploadfromGoogle(false);
    }
  };

  const handleDeleteFile = (index) => {
    setSelectedFiles((prevFiles) => {
      const newFiles = [...prevFiles];
      newFiles.splice(index, 1);
      return newFiles;
    });
  };

  return (
    <div className=" h-screen p-0 container-fluid">
      {open && (
        <Modal
          open={open}
          // onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
          <div className="editModal" style = {{height: '30px', width : '30px', position : 'absolute', top:0, right: 0, cursor : 'pointer'}}><CloseIcon onClick = {()=>setOpen(false)} /></div>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Add New Project
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>

             
              <div className="flex flex-col py-2">
                <TextField
                  label="Project name"
                  variant="outlined"
                  type="text"
                  value = {projectname}
                  onChange={(event)=>setProjectname(event.target.value)}
                  required
                />
              </div>
              <div className="flex m-2">
                <input className="mx-2" type="radio" value={uploadfromGoogle} onChange={handlegoogleSelected} checked = {uploadfromGoogle}  />
                <h1>Upload from google drive</h1>
              </div>
              
              {uploadfromGoogle &&
              <div className="flex flex-col py-2">
              <TextField
                label="Google Link"
                variant="outlined"
                type="text"
                value = {googleLink}
                onChange={(event)=>setGoogleLink(event.target.value)}
                required
              />
            </div>
              }

              <div className="flex mt-4 ms-2">
                <input className="mx-2" type="radio" value={uploadfromLocal} onChange={handlelocalSelected} 
                checked = {uploadfromLocal} />
                <h1>Upload from local computer</h1>
              </div>

             

              {uploadfromLocal &&
                <div 
      style={{
        border: '2px dashed #ccc',
        padding: '20px',
        textAlign: 'center',
        cursor: 'pointer',
        marginTop : '15px',
        width : '100%'
      }}
      onDrop={handleDrop}
      onDragOver={(e) => e.preventDefault()}
    >
      <p>Drag and drop files here or</p>
      <input
        type="file"
        accept="image/*" // specify the file types allowed, e.g., images
        multiple
        onChange={handleFileInputChange}
        style={{ display: 'none' }}
        id="fileInput"
      />
      <label className="border p-2 bg-slate-400 mt-2" htmlFor="fileInput" style={{ cursor: 'pointer' }}>
        Select Files
      </label>
      {selectedFiles.length > 0 && (
        <div className=" flex flex-col align-items-start mt-2" style = {{width : '100%'}}>
          <p className="border-bottom">Selected files:</p>
          <ul className="flex flex-col align-items-center p-2" style = {{width : '100%'}}>
            {selectedFiles.map((file, index) => (
              <li  key={index}>
                <div className="flex border justify-between mx-auto m-1 p-1" style = {{width : '250px'}}>
                <h1>{file.name}{''}</h1> 
                <button onClick={() => handleDeleteFile(index)}><ClearIcon /></button>
                </div>
                
               </li>
            ))}
          </ul>
        </div>
      )}
     
    </div>
              }

              <div className="flex justify-center align-items-center mt-4">
                <button
                  className="btn text-light"
                  style={{ backgroundColor: "#483EA8" }}
                  onClick={handleclick}
                >
                  UPLOAD
                </button>

               
                
              </div>
              <div className="pt-3">
              {notvalid &&<h1 className="text-danger">please select one</h1>}
              {alert &&<h1 className="text-danger">please enter project name</h1>}
              {alert2 &&<h1 className="text-danger">please enter google link</h1>}
              {alert3 &&<h1 className="text-danger">please select even number of files</h1>}
              </div>
              
              
              
            </Typography>
          </Box>
        </Modal>
      )}

{isdataAttributeModal && (
        <Modal
          open={isdataAttributeModal}
          // onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Select Project Attributes - {projectId}
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>

             
              <div className="flex flex-col py-2">
                 {/* Dropdown Menu */}
      <TextField
        select
        label="Select Database"
        variant="outlined"
        value={databasename}
        onChange={(event)=>setDatabasename(event.target.value)}
        style={{ marginTop: '16px' }}
      >
        {/* You can replace these MenuItem components with your actual project names */}
        <MenuItem value="project1">Database 1</MenuItem>
        <MenuItem value="project2">Database 2</MenuItem>
        <MenuItem value="project3">Database 3</MenuItem>
      </TextField>
      <TextField
        label="No.of Cores"
        variant="outlined"
        type="text"
        value={60}
        disabled
        style={{ marginTop: '16px' }}
      />
       <TextField
        label="Conidence"
        variant="outlined"
        type="text"
        value={0.5}
        disabled
        style={{ marginTop: '16px' }}
      />
      <div className="pt-3">
      <h1 className="text-danger text-sm">contact system manager for changing requirements</h1>
      </div>
              </div>
        
              


              <div className="flex justify-evenly align-items-center mt-4 w-100">
                <button
                  className="btn text-light"
                  style={{ backgroundColor: "#32CD32" }}
                  onClick={handleclick2}
                >
                  Execute
                </button>
                <button
                  className="btn text-light"
                  style={{ backgroundColor: "#ff6347" }}
                  onClick={handleclick2}
                >
                  Save for Later
                </button>

               
                
              </div>
              <div className="pt-3">
              {notvalid &&<h1 className="text-danger">please select one</h1>}
              {alert &&<h1 className="text-danger">please enter project name</h1>}
              {alert2 &&<h1 className="text-danger">please enter google link</h1>}
              {alert3 &&<h1 className="text-danger">please select even number of files</h1>}
              </div>
              
              
              
            </Typography>
          </Box>
        </Modal>
      )}

{iseditdataModal && (
        <Modal
          open={iseditdataModal}
          // onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >

          
          <Box sx={style}>
            <div className="editModal" style = {{height: '30px', width : '30px', position : 'absolute', top:0, right: 0, cursor : 'pointer'}}><CloseIcon onClick = {()=>setIseditdataModal(false)} /></div>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Update Project Attributes
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>

             
              <div className="flex flex-col py-2">
                 {/* Dropdown Menu */}
      <TextField
        select
        label="Select Database"
        variant="outlined"
        value={databasename}
        onChange={(event)=>setDatabasename(event.target.value)}
        style={{ marginTop: '16px' }}
      >
        {/* You can replace these MenuItem components with your actual project names */}
        <MenuItem value="project1">Database 1</MenuItem>
        <MenuItem value="project2">Database 2</MenuItem>
        <MenuItem value="project3">Database 3</MenuItem>
      </TextField>
      <TextField
        label="No.of Cores"
        variant="outlined"
        type="text"
        value={60}
        disabled
        style={{ marginTop: '16px' }}
      />
       <TextField
        label="Conidence"
        variant="outlined"
        type="text"
        value={0.5}
        disabled
        style={{ marginTop: '16px' }}
      />
      <h1 className="mt-2 mb-2 text-xl1 ">Samples</h1>
      <div className="border p-2" style={{maxHeight : '200px', overflow: 'auto'}}>
        <div className="border flex justify-between p-1 m-1 align-items-center" style = {{height : '20%'}}>
            <h1>Sample1_1</h1>
            <button><ClearIcon fontSize="25px" /></button>

        </div>
        <div className="border flex justify-between p-1 m-1 align-items-center" style = {{height : '20%'}}>
            <h1>Sample1_2</h1>
            <button><ClearIcon fontSize="25px" /></button>

        </div>
        <div className="border flex justify-between p-1 m-1 align-items-center" style = {{height : '20%'}}>
            <h1>Sample2_1</h1>
            <button><ClearIcon fontSize="25px" /></button>

        </div>
        <div className="border flex justify-between p-1 m-1 align-items-center" style = {{height : '20%'}}>
            <h1>Sample2_2</h1>
            <button><ClearIcon fontSize="25px" /></button>

        </div>
        <div className="border flex justify-between p-1 m-1 align-items-center" style = {{height : '20%'}}>
            <h1>Sample3_1</h1>
            <button><ClearIcon fontSize="25px" /></button>

        </div>
        <div className="border flex justify-between p-1 m-1 align-items-center" style = {{height : '20%'}}>
            <h1>Sample3_2</h1>
            <button><ClearIcon fontSize="25px" /></button>

        </div>
      </div>
              </div>
        
              


              <div className="flex justify-center align-items-center mt-4 w-80">
               
                <button
                  className="btn text-light w-60"
                  style={{ backgroundColor: "#ff6347" }}
                  onClick={handleclick3}
                >
                  Update
                </button>

               
                
              </div>
              <div className="pt-3">
              {notvalid &&<h1 className="text-danger">please select one</h1>}
              {alert &&<h1 className="text-danger">please enter project name</h1>}
              {alert2 &&<h1 className="text-danger">please enter google link</h1>}
              {alert3 &&<h1 className="text-danger">please select even number of files</h1>}
              </div>
              
              
              
            </Typography>
          </Box>
        </Modal>
      )}

      <div  style={{ height: "10%" }}>
        <Topbar fullname={userdata.full_name} />
      </div>
      <div className="flex  h-screen " style={{ height: "90%" }}>
        {/* left side */}
        <Box 
          className="hidden flex-col md:flex w-auto"
          style={{
            // width: "30%",
            minWidth: "20%",
            height: "100%",
            "overflow-x": "auto",
            backgroundColor : colors.primary[400]
            // 'white-space': 'nowrap'
          }}
        >
          <div style={{ height: "45%", width: "100%" }}>
            <div className="flex justify-between align-items-center" style={{width: "90%" }}>
            <Typography
              fontSize="18px "
              className="font-bold"
              // color="#8057D7"
              color={colors.grey[300]}
              sx={{ m: "10px 0 0px 20px" }}
            >
              Profile 
            </Typography>
              <BorderColorIcon className="ms-2" fontSize="5px" style={{color : "#8057D7", cursor: 'pointer'}} onClick={()=>navigate('/settings/profilesettings')} />
            </div>
            
            <div
              className=" ms-4 me-4 pt-42 "
              style={{ height: "auto", width: "90%" }}
            >
              <div className="flex flex-col align-items-stretch">
                <div
                  className="flex m-1"
                  style={{ width: "90%", borderBottom: "0.5px solid #8057D7" }}
                >
                  <div className=" w-20 flex justify-center align-items-center">
                    <PeopleIcon style = {{fontSize: 20}} />
                  </div>
                  <div className=" w-80 ">
                    <small>
                      <p style={{ lineHeight: "18px", fontSize : 14 }}>Name</p>
                    </small>
                    <p style = {{fontSize: 16}}>{userdata.full_name}</p>
                  </div>
                </div>
                <div
                  className=" flex m-1"
                  style={{ width: "90%", borderBottom: "0.5px solid #8057D7" }}
                >
                  <div className=" w-20 flex justify-center align-items-center">
                    <EmailIcon style = {{fontSize: 20}} />
                  </div>
                  <div className=" w-80 ">
                    <small>
                      <p style={{ lineHeight: "18px" , fontSize : 14 }}>Email address</p>
                    </small>
                    <p style = {{fontSize: 16}}>{userdata.email}</p>
                  </div>
                </div>
                <div
                  className=" flex m-1"
                  style={{ width: "90%", borderBottom: "0.5px solid #8057D7" }}
                >
                  <div className=" w-20 flex justify-center align-items-center">
                    <LocalPhoneIcon style = {{fontSize: 20}} />
                  </div>
                  <div className=" w-80 ">
                    <small>
                      <p style={{ lineHeight: "18px" , fontSize : 14 }}>Phone Number</p>
                    </small>
                    <p style = {{fontSize: 16}}>{userdata.phone}</p>
                  </div>
                </div>
                <div
                  className=" flex m-1"
                  style={{ width: "90%", borderBottom: "0.5px solid #8057D7" }}
                >
                  <div className=" w-20 flex justify-center align-items-center">
                    <CorporateFareIcon style = {{fontSize: 20}} />
                  </div>
                  <div className=" w-80 ">
                    <small>
                      <p style={{ lineHeight: "18px" , fontSize : 14 }}>
                        Institute/Organization
                      </p>
                    </small>
                    <p style = {{fontSize: 16}}>{userdata.institution_organization}</p>
                  </div>
                </div>
                <div
                  className=" flex m-1"
                  style={{ width: "90%", borderBottom: "0.5px solid #8057D7" }}
                >
                  <div className=" w-20 flex justify-center align-items-center">
                    <AccountBalanceWalletIcon style = {{fontSize: 20}} />
                  </div>
                  <div className=" w-80 ">
                    <small>
                      <p style={{ lineHeight: "18px" , fontSize : 14 }}>Credits</p>
                    </small>
                    <p style = {{fontSize: 16}}>{userdata.credits_remaining}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            style={{
              height: "54%",
              minHeight: "100px",
              width: "100%",
              overflow: "hidden",
            }}
          >
            <Typography
              fontSize="18px "
              className="font-bold"
              // color="#8057D7"
              color={colors.grey[300]}
              sx={{ m: "15px 0 5px 20px" }}
            >
              History
            </Typography>
            <div className="flex justify-between" style={{ width: "90%", margin:"auto" }}>
              <div className=" flex justify-center" style={{ width: "85%" }}>
                <LocalizationProvider
                  dateAdapter={AdapterDayjs}
                  // style={{ width: "100%" }}
                >
                  <DatePicker
                    className="w-full container-fluid p-0"
                    label={"Select Date"}
                    value={selectedDate}
                    onChange={setSelecteddate}
                    format="DD/MM/YYYY"
                    views={["year", "month", "day"]}
                  />
                </LocalizationProvider>
              </div>
              <div className="flex align-items-center justify-center" style={{ width: "10%" }}>
              {selectedDate?
                  <CloseIcon onClick={()=>setSelecteddate(null)}  style={{ cursor: "pointer" }} />
                  
                  :
                  <SearchIcon  style={{ cursor: "pointer" }} />
                  }
              </div>
            </div>
            <Box
             sx={{
              "& .MuiDataGrid-root": {
                border: "none",
              },
              "& .MuiDataGrid-cell": {
                borderBottom: "none",
              },
              "& .name-column--cell": {
                color: colors.greenAccent[300],
              },
              "& .MuiDataGrid-columnHeaders": {
                backgroundColor: colors.blueAccent[700],
                borderBottom: "none",
              },
              "& .MuiDataGrid-virtualScroller": {
                backgroundColor: colors.primary[400],
              },
              "& .MuiDataGrid-footerContainer": {
                borderTop: "none",
                backgroundColor: colors.blueAccent[700],
              },
              "& .MuiCheckbox-root": {
                color: `${colors.greenAccent[200]} !important`,
              },
              "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
                color: `${colors.grey[100]} !important`,
              },
            }}
              className="flex justify-content-center"
              style={{ height: "350px" }}
            >
              <DataGrid
                className="mt-2 "
                style={{ marginLeft: "5%", marginRight: "5%" }}
                rows={getFilteredHistory()}
                columns={columns}
                getRowId={getRowId2}
              />
            </Box>
          </div>
          {/* <Box style={{ height: "90%" }}
          >
            <div style={{ width: "80%" }} backgroundColor="white">
              <Box style={{'height':'50%'}}>
                <Typography variant="h6" sx={{ m: "15px 0 5px 20px" }}>
                  Profile
                </Typography>
                <div
                  className="border ms-4 me-4 pt-42 "
                  style={{ height: "auto", width: "90%" }}
                >
                  <div className="flex flex-col align-items-stretch">
                    <div
                      className="border-bottom flex m-1"
                      style={{ width: "90%" }}
                    >
                      <div className=" w-20 flex justify-center align-items-center">
                        <PeopleIcon />
                      </div>
                      <div className=" w-80 ">
                        <small>
                          <p>Name</p>
                        </small>
                        <p>John Doe</p>
                      </div>
                    </div>
                    <div
                      className="border-bottom flex m-1"
                      style={{ width: "90%" }}
                    >
                      <div className=" w-20 flex justify-center align-items-center">
                        <EmailIcon />
                      </div>
                      <div className=" w-80 ">
                        <small>
                          <p>Email address</p>
                        </small>
                        <p>Johndoe@gmail.com</p>
                      </div>
                    </div>
                    <div
                      className="border-bottom flex m-1"
                      style={{ width: "90%" }}
                    >
                      <div className=" w-20 flex justify-center align-items-center">
                        <LocalPhoneIcon />
                      </div>
                      <div className=" w-80 ">
                        <small>
                          <p>Phone Number</p>
                        </small>
                        <p>8977687453</p>
                      </div>
                    </div>
                    <div
                      className="border-bottom flex m-1"
                      style={{ width: "90%" }}
                    >
                      <div className=" w-20 flex justify-center align-items-center">
                        <CorporateFareIcon />
                      </div>
                      <div className=" w-80 ">
                        <small>
                          <p>Company Name</p>
                        </small>
                        <p>Biological Solutions pvt ltd.</p>
                      </div>
                    </div>
                    <div className=" flex m-1" style={{ width: "90%" }}>
                      <div className=" w-20 flex justify-center align-items-center">
                        <AccountBalanceWalletIcon />
                      </div>
                      <div className=" w-80 ">
                        <small>
                          <p>Credits</p>
                        </small>
                        <p>15</p>
                      </div>
                    </div>
                  </div>
                </div>
              </Box>

              <Box style={{'height':'50%'}}>
                <Typography
                  variant="h6"
                  //   color={colors.grey[300]}
                  sx={{ m: "15px 0 5px 20px" }}
                >
                  History
                </Typography>
                <div className="flex justify-center">
                  <div className="align-center   pt-2" style={{ width: "90%" }}>
                    <LocalizationProvider
                      className="w-100"
                      dateAdapter={AdapterDayjs}
                      style={{ width: "90%" }}
                    >
                      <DatePicker
                        label={"Select Date"}
                        value={selectedDate}
                        onChange={setSelecteddate}
                        format="DD/MM/YYYY"
                        views={["year", "month", "day"]}
                      />
                    </LocalizationProvider>
                  </div>
                </div>

                <div
                  className="flex justify-content-center"
                  style={{ height: "350px" }}
                >
                  <DataGrid
                    className="mt-2 "
                    style={{ marginLeft: "5%", marginRight: "5%" }}
                    rows={mockProjectHistorydate}
                    columns={columns}
                  />
                </div>
              </Box>
            </div>
          </Box> */}
        </Box>

        <div
          className=" flex  flex-col w-100 sm:w-80"
          style={{ "overflow": "hidden" }}
        >
          <div
            className="flex  align-items-center"
            style={{ height: "15%", width: "95%", margin: "auto" }}
          >
            <div
              className=" flex justify-center align-items-center "
              style={{ height: "100px", width: "100%" }}
            >
              <div className="flex justify-content-between w-full">
                <div
                  className=" input-group border rounded flex justify-content-between align-items-center  "
                  style={{ height: "60px", width: "60%" }}
                >
                  <input
                    type="text"
                    placeholder="Search your project ..."
                    style={{ height: "50px", width: "90%", border: "none",  backgroundColor: "transparent" }}
                    className="ps-3 searchBox"
                    value={search}
                    onChange={(e)=>setSearch(e.target.value)}
                  />

                  {search.trim().length>0?
                    <CloseIcon onClick={()=>setSearch('')} className="me-3" style={{ cursor: "pointer" }} />
                  :
                    <SearchIcon className="me-3" style={{ cursor: "pointer" }} />
                  }
                  
                  
                  
                </div>
                {/* <div
                className="border rounded"
                style={{ 'height': "50px", width: "20%" }}
              ></div> */}
                <button
                  type="button"
                  className="btn text-white me-5"
                  style={{ backgroundColor: colors.greenAccent[600]}}
                  onClick={handleOpen}
                >
                  New Project
                </button>
              </div>
            </div>
          </div>
          <Box
           sx={{
             "& .MuiDataGrid-root": {
               border: "none",
             },
             "& .MuiDataGrid-cell": {
               borderBottom: "none",
             },
             "& .name-column--cell": {
               color: colors.greenAccent[300],
             },
             "& .MuiDataGrid-columnHeaders": {
               backgroundColor: colors.blueAccent[700],
               borderBottom: "none",
             },
             "& .MuiDataGrid-virtualScroller": {
               backgroundColor: colors.primary[400],
             },
             "& .MuiDataGrid-footerContainer": {
               borderTop: "none",
               backgroundColor: colors.blueAccent[700],
             },
             "& .MuiCheckbox-root": {
               color: `${colors.greenAccent[200]} !important`,
             },
             "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
               color: `${colors.grey[100]} !important`,
             },
           }}
            style={{ height: "40%", width: "95%", margin: "auto" }}
          >
            <DataGrid
              // className="ms-4"
              // style={{ marginLeft: "5%", marginRight: "5%" }}
              rows={getFilteredRows()}
              columns={columns2}
              slots={{
                toolbar: GridToolbar,
              }}
              getRowId={getRowId}
            />
          </Box>
          <div
            className="flex mt-2 justify-between"
            style={{ height: "auto", width: "95%", margin: "auto" }}
          >
            <div
              className=" sm:w-full"
              style={{ width: "800px", height: "auto" }}
            >
              <div className="p-2" style = {{backgroundColor : colors.primary[400]}}>
                {/* <h1 className="text-center m-2 text-xl font-semibold">
                  History
                </h1> */}
                <Box className="m-2 flex justify-evenly flex-wrap">
                  {/* ROW 1 */}
                  <Box
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                  >
                    <Statbox
                      title={userdata.credits_remaining}
                      subtitle="credits"
                      progress={1-userdata.credits_remaining/100}
                      increase="+14%"
                      icon={
                        <PeopleIcon sx={{ color: "green", fontSize: "26px" }} />
                      }
                    />
                  </Box>
                  <Box
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                  >
                    <Statbox
                      title={userdata.project_count}
                      subtitle="Projects"
                      progress={1-userdata.project_count/200}
                      increase="+21%"
                      icon={
                        <PeopleIcon sx={{ color: "green", fontSize: "26px" }} />
                      }
                    />
                  </Box>
                  <Box
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                  >
                    <Statbox
                      title={userdata.samples_count}
                      subtitle="Samples"
                      progress={1-userdata.project_count/500}
                      increase="+5%"
                      icon={
                        <PeopleIcon sx={{ color: "green", fontSize: "26px" }} />
                      }
                    />
                  </Box>
                  <Box
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                  >
                    <Statbox
                      title={userdata.storage_used}
                      subtitle="Storage"
                      progress={1-userdata.storage_used/100}
                      increase="+43%"
                      icon={
                        <PeopleIcon sx={{ color: "green", fontSize: "26px" }} />
                      }
                    />
                  </Box>
                </Box>
              </div>
              <div className="flex align-items-center mt-2"  style={{ height: "100px", backgroundColor:colors.primary[400] }}>
              {projectStatus === 'noproject'?
              <div className="m-2 p-2" role="alert">
                <h4  style = {{color: colors.redAccent[400], fontSize: 18}}>
                    No Project is running !
                </h4>
                  <p style = {{fontSize: 16}}>
                    Run your project for instant results. Modify old project
                    attributes and re-run for a new outlook.{" "}
                  </p>
                  <hr />
                  <p style = {{fontSize: 16}} className="mb-0">
                    Whenever you need to, be sure to contact us
                  </p>
                </div>
              :
              <div className=" m-2 p-2"  style = {{width: "90%"}}>
                <h4 style = {{fontSize: 18}}>
                     Uploading
                    
                  </h4>
                  <LinearProgressWithLabel value={progress} />
                </div>
              }
                
              </div>
            </div>
            <div className="hidden md:block" style={{ width: "300px", backgroundColor: colors.primary[400] }}>
              <h1 className="text-center m-2 text-xl1 font-semibold">
                Procedure
              </h1>
              <h1
                className="ms-8 mb-2 font-semibold"
                style={{ fontSize: "14px" }}
              >
                1. Click on new project button
              </h1>
              <h1 className="text-center text-primary">
                <KeyboardDoubleArrowDownIcon />
              </h1>
              <h1
                className=" ms-8 mb-2 font-semibold"
                style={{ fontSize: "14px" }}
              >
                2.Enter Project details
              </h1>
              <h1 className="text-center text-primary">
                <KeyboardDoubleArrowDownIcon />
              </h1>
              <h1
                className=" ms-8 mb-2 font-semibold"
                style={{ fontSize: "14px" }}
              >
                3. Upload Samples
              </h1>
              <h1 className="text-center text-primary">
                <KeyboardDoubleArrowDownIcon />
              </h1>
              <h1
                className=" ms-8 mb-2 font-semibold"
                style={{ fontSize: "14px" }}
              >
                4. Save Project for later or execute
              </h1>
              <h1 className="text-center text-primary">
                <KeyboardDoubleArrowDownIcon />
              </h1>
              <h1
                className=" ms-8 mb-2 font-semibold"
                style={{ fontSize: "14px" }}
              >
                5. Download Report
              </h1>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Dashboard;
