import React from 'react'
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { useState, useEffect } from 'react';
import {  useTheme, Box } from "@mui/material";
import { tokens } from "../../theme";

import useAxiosPrivate from '../../hooks/useAxiosPrivate';

import { useLocation, useNavigate } from 'react-router-dom';



function CreditsSettings() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const getRowId2 = (row) => row.transaction_id;

  const [creditHistory, setCreditHistory] = useState({});

  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const location = useLocation();


  useEffect (() => {
    let isMounted = true;
    // const controller = new AbortController();
    const userId = localStorage.getItem("userId");

   

    const getUserCreditsHistory = async () => {
        try {
            const response = await axiosPrivate.get(`/usercredithistory/${userId}`, {
                // signal: controller.signal
            });
            isMounted &&   setCreditHistory(response.data);
  
        } catch (err) {
            console.error(err);
            navigate('/login', { state: { from: location }, replace: true });
        }
    }

     getUserCreditsHistory();
     

    return () => {
        isMounted = false;
        // controller.abort();
    }
}, [axiosPrivate, location, navigate]);


  const columns = [
    { field: "transaction_id", headerName: "Transaction Id", flex: 0.5 },
    {
      field: "task",
      headerName: "Task",
      
      flex: 1,
    },
    { field: "project_id", headerName: "Project Id", flex: 0.5 },
    {
      field: "credits_used",
      headerName: "Credits",
      flex: 0.3,
      cellClassName: "name-column--cell",
      headerAlign: "center",
    },
    {
      field: "date",
      headerName: "Date",
      flex: 1,
    }
  ];


  // const creditHistory = [
  //   // { 'credits': 6, 'task': 'created task 20', 'time': 'sep 22, 11:00' },
  //   // { 'credits': 13, 'task': 'updated task 19', 'time': 'sep 21, 08:50' },
  //   // { 'credits': 11, 'task': 'completed task 18', 'time': 'sep 20, 16:40' },
  //   // { 'credits': 15, 'task': 'created task 17', 'time': 'sep 19, 14:30' },
  //   {'id': 1, 'credits': 9, 'task': 'updated task 16', 'time': 'sep 18, 12:20' },
  //   {'id': 2, 'credits': 12, 'task': 'created task 15', 'time': 'sep 17, 10:10' },
  //   {'id': 3, 'credits': 7, 'task': 'completed task 14', 'time': 'sep 16, 15:55' },
  //   {'id': 4, 'credits': 10, 'task': 'updated task 13', 'time': 'sep 15, 11:40' },
  //   {'id': 5, 'credits': 13, 'task': 'created task 12', 'time': 'sep 14, 09:30' },
  //   {'id': 6, 'credits': 8, 'task': 'deleted task 11', 'time': 'sep 13, 14:15' },
  //   {'id': 7, 'credits': 14, 'task': 'updated task 10', 'time': 'sep 12, 17:00' },
  //   {'id': 8, 'credits': 6, 'task': 'created task 9', 'time': 'sep 11, 12:25' },
  //   {'id': 9, 'credits': 11, 'task': 'completed task 8', 'time': 'sep 10, 08:45' },
  //   {'id': 10, 'credits': 9, 'task': 'updated task 7', 'time': 'sep 9, 15:10' },
  //   {'id': 11, 'credits': 15, 'task': 'created task 6', 'time': 'sep 8, 13:30' },
  //   {'id': 12, 'credits': 7, 'task': 'deleted task 5', 'time': 'sep 7, 09:15' },
  //   {'id': 13, 'credits': 12, 'task': 'created task 4', 'time': 'sep 6, 11:20' },
  //   {'id': 14, 'credits': 5, 'task': 'completed task 3', 'time': 'sep 5, 14:45' },
  //   {'id': 15, 'credits': 8, 'task': 'updated task 2', 'time': 'sep 4, 10:30' },
  //   {'id': 16, 'credits': 10, 'task': 'created task 1', 'time': 'sep 3, 16:00' },
  // ];
  



  return (
    <div className='h-screen w-full flex' style={{'width' : '100%', 'height' : '100%'}}>
        <div className=' rounded shadow flex  m-auto' style = {{height: '95%', width : '95%'}}>
          <div  style={{width : '70%', height : '100%'}}>
            <div className='flex align-items-end ps-5' style={{height : '10%'}}>
            <h3 className='font-semibold h3'>Credits history</h3>
            </div>
            
            <Box sx={{
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
           }} style={{height : '80%', overflow: 'auto', marginTop: '5%', borderRight:'2px solid #8057D7' }}>
              
            {/* {creditHistory.map((entry, index) => (
        <div className='flex m-auto my-1' style={{ width: '90%'}} key={index}>
          <div style={{ flex: 2 }}>{entry.credits} credit{entry.credits !== 1 ? 's' : ''}</div>
          <div style={{ flex: 10 }}>{entry.task}</div>
          <div style={{ flex: 2 }}>{entry.time}</div>
        </div>
      ))} */}
            <DataGrid
                style={{ marginLeft: "5%", marginRight: "5%" }}
                rows={creditHistory}
                columns={columns}
                getRowId={getRowId2}
              />
            </Box>
          </div>
          <div className='h5 text-center'  style={{height : '80%', width: '30%', overflow: 'auto', marginTop: '10%',}}>
            Credits Left : 100
          </div>
        </div>
    </div>
  )
}

export default CreditsSettings;