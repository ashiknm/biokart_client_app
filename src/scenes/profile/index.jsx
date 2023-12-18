import React from 'react'
import { useState, useEffect } from 'react';
import Statbox from '../../components/Statbox';
import PeopleIcon from "@mui/icons-material/People";
import { Box} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { Link } from 'react-router-dom';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';

import { useLocation, useNavigate } from 'react-router-dom';

import { useTheme } from "@mui/material";
import { tokens } from "../../theme";




const Profile = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [projectdata, setProjectdata] = useState([]);
  const [userdata, setUserdata] = useState({});

  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const location = useLocation();

  const getRowId2 = (row) => row.project_id;

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
}, [axiosPrivate, location, navigate]);



  const columns = [
    { field: "project_id", headerName: "Project ID" , flex: 0.5},
    {
      field: "project_name",
      headerName: "Project Name",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    // {
    //   field: "userid",
    //   headerName: "User Id",
    //   type: "number",
    //   headerAlign: "left",
    //   align: "left",
    // },

    {
      field: "date",
      headerName: "Date",
      flex: 1,
    },
   
    // {
    //   field: "confidence",
    //   headerName: "Confidence",
    //   type: "number",
    //   headerAlign: "left",
    //   align: "left",
    // },
    {
        field: "sample_size",
        headerName: "Sample size",
        type: "number",
        headerAlign: "left",
        align: "left",
      },
      {
        field: "folder_size",
        headerName: "Folder size",
        type: "number",
        headerAlign: "left",
        align: "left",
      },
    {
      field: "status",
      headerName: "status",
      flex: 1,
    },
    
   
  ];
  // const columns2 = [
  //   { field: "id", headerName: "Sl.no", flex: 0.3 },
  //   {
  //     field: "project_id",
  //     headerName: "Project Id",
  //     flex: 1,
  //     cellClassName: "name-column--cell",
  //   },
  //   {
  //     field: "project_name",
  //     headerName: "Project Name",
  //     flex: 1,
  //   },
  //   {
  //     field: "date",
  //     headerName: "Date",
  //     flex: 1,
  //   },
  //   {
  //     // field: "accessLevel",
  //     headerName: "Edit",
  //     field: "edit",
  //     flex: 0.5,
  //     headerAlign: "center",
  //     align: "center",
  //     renderCell: ({ row: { access } }) => {
  //       const handleApproveClick = () => {
  //         alert("Download Succesfull!");
  //       };
  //       return (
  //         <Box
  //           width="60%"
  //           m="0 auto"
  //           p="5px"
  //           display="flex"
  //           justifyContent="center"
  //           onClick={handleApproveClick}
  //           style={{ cursor: "pointer" }}
  //           borderRadius="4px"
  //         >
  //           <Typography sx={{ ml: "5px" }}>
  //             <EditIcon />
  //           </Typography>
  //         </Box>
  //       );
  //     },
  //   },
  //   {
  //     // field: "accessLevel",
  //     headerName: "Execute",
  //     field: "execute",
  //     flex: 0.5,
  //     renderCell: ({ row: { access } }) => {
  //       const handleApproveClick = () => {
  //         alert("Download Succesfull!");
  //       };
  //       return (
  //         <Box
  //           width="60%"
  //           m="0 auto"
  //           p="5px"
  //           display="flex"
  //           justifyContent="center"
  //           onClick={handleApproveClick}
  //           style={{ cursor: "pointer" }}
  //           borderRadius="4px"
  //         >
  //           <Typography sx={{ ml: "5px" }}>
  //             <button
  //               type="button"
  //               class="btn"
  //               style={{ backgroundColor: "#4676FB", color :'white' }}
  //             >
  //               Execute
  //             </button>
  //           </Typography>
  //         </Box>
  //       );
  //     },
  //   },
  // ];


  return (
    <div className='h-screen w-full flex flex-col' style={{'width' : '100%', 'height' : '100%'}}>
      <div className=' m-auto ' style={{'height' : '35%', 'width' : '90%'}}>
        <div className=' bg-slate-400 flex align-items-center p-3' style={{'height' : '20%', borderTopLeftRadius : '15px', borderTopRightRadius : '15px'}}>
          <h1 className='text-white font-semibold'>UID: {userdata.user_id}</h1>
          
        </div>
        <div className=' flex' style={{'height' : '80%',  borderBottomLeftRadius : '15px', borderBottomRightRadius : "15px", backgroundColor: colors.primary[400]}}>
            <div className=' border-r flex align-items-center' style={{'width' : '70%'}}>
                <Box className=" flex flex-wrap" style = {{width: "100%"}}>
                  {/* ROW 1 */}
                  <Box
                    style={{ width: "25%" }}
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
                    style={{ width: "25%" }}
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
                    style={{ width: "25%" }}
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
                    style={{ width: "25%" }}
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
            <div className='border-l-2' style={{'width' : '30%', height : "100%", position : 'relative'}}>
              <div className='flex justify-between p-2' style = {{height: "15%"}}>
                <h1 className='font-semibold'>UID: {userdata.user_id}</h1>
                <h1 className='font-semibold'>{userdata.institution_organization}</h1>
              </div>
              <div className='flex justify-center align-items-center' style = {{height: "60%"}}>
                <h1 className='font-semibold text-center' style={{'fontSize': '30px'}}>{userdata.full_name}</h1>
              </div>
              <div className='flex flex-col p-2 mt-2' style = {{height: "25%"}}>
                <h1 className='font-semibold'>UID: {userdata.user_id}</h1>
                <h1 className='font-semibold'>{userdata.institution_organization}</h1>
              </div>
              <Link to = "/settings/profilesettings">
              <EditIcon style={{position : 'absolute', bottom: 10, right: 50, color : 'blue', cursor : 'pointer'}} />
              </Link>
              
              <DeleteIcon style={{position : 'absolute', bottom: 10, right: 20, color : 'red'}} />
              

            </div>
        </div>
      </div>
      <Box   sx={{
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
         className=' m-auto ' style={{'height' : '55%', 'width' : '90%'}}>
      <DataGrid
              // className="ms-4"
              // style={{ marginLeft: "5%", marginRight: "5%" }}
              rows={projectdata}
              columns={columns}
              slots={{
                toolbar: GridToolbar,
              }}
              getRowId={getRowId2}
            />
      </Box>
    </div>
  )
}

export default Profile;