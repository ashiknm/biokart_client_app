import {React, useState} from 'react'
import ToggleSwitch from '../../components/ToggleSwitch';
import {  useTheme } from "@mui/material";
import { tokens } from "../../theme";

function NotificationSettings() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [istoggleoneOn, setIstoggleoneOn] = useState(false);
  const [istoggletwoOn, setIstoggletwoOn] = useState(false);
  const [istogglethreeOn, setIstogglethreeOn] = useState(false);
  const [istogglefourOn, setIstogglefourOn] = useState(false);
  return (
    <div className='h-screen w-full flex flex-col' style={{'width' : '100%', 'height' : '100%'}}>
      <div className='my-auto ms-5 ps-10' style = {{height : '50%', width : '70%'}}>
        <h1 className='font-semibold h5 mt-2'>Notification preferences</h1>
        <p style={{fontSize : '12px'}}>Select the kind of notifications you get about your activities and recomendations.</p>

        <div className=' flex justify-between align-items-center mt-2' style={{width : '70%'}} >
          <ToggleSwitch onClick={()=>setIstoggleoneOn(!istoggleoneOn)} label='download' style = {{ width : '30%'}} /> 
          <div  style={{width: '70%'}}>
            <h1 className='h6'>Download</h1>
            <p>when report file is downloaded</p>
          </div>
        </div>
        <div className=' flex justify-between align-items-center mt-2' style={{width : '70%'}} >
          <ToggleSwitch onClick={()=>setIstoggletwoOn(!istoggletwoOn)} label='upload' style = {{ width : '30%'}} /> 
          <div style={{width : '70%'}}>
            <h1 className='h6'>Upload</h1>
            <p>when input file is uploaded</p>
          </div>
        </div>
        <div className=' flex justify-between align-items-center mt-2' style={{width : '70%'}} >
          <ToggleSwitch onClick={()=>setIstogglethreeOn(!istogglethreeOn)} label='logs' style = {{ width : '30%'}} /> 
          <div style={{width : '70%'}}>
            <h1 className='h6'>Logs</h1>
            <p>notification for every change in logs</p>
          </div>
        </div>
        <div className=' flex justify-between align-items-center mt-2' style={{width : '70%'}} >
          <ToggleSwitch onClick={()=>setIstogglefourOn(!istogglefourOn)} label='report' style = {{ width : '30%'}} /> 
          <div style={{width : '70%'}}>
            <h1 className='h6'>Report Generated</h1>
            <p>send mail after report is successfully generated</p>
          </div>
        </div>

        
        
        {/* {istoggleoneOn ?

        <ToggleOnIcon className='cursor-pointer' color='blue'   onClick = {()=>setIstoggleoneOn(false)}  /> : 
        
        <ToggleOffIcon className='cursor-pointer'   onClick = {()=>setIstoggleoneOn(true)} />} */}
      



      </div>
      <div className=' my-auto ms-5 ps-10' style = {{height : '45%', width : '70%', backgroundColor : colors.primary[400]}}>

      <h1 className='font-semibold h5 mt-2'>Email Notifications</h1>
      <p style={{fontSize : '12px'}}>Get notifications to stay up to date with the Biokart.</p>
      <div className='flex'>
      <div className='flex m-2'>
        <input className='mx-2' type = 'radio'  />
        <h1>On</h1>
      </div>
      <div className='flex m-2'>
        <input className='mx-2' type = 'radio'  />
        <h1>Off</h1>
      </div>
      </div>
      
      
      <h1 className='font-semibold h5 mt-3'>Updates you made</h1>
      <p style={{fontSize : '12px'}}>When you turn on notifications  you’ll get a email notification directly from biokart when you made create or upload</p>
      <div className='flex m-3'>
        <input className='mx-2' type = 'checkbox'  />
        <h1>Projects</h1>
      </div>
      <div className='flex m-3'>
        <input className='mx-2' type = 'checkbox'  />
        <h1>Samples</h1>
      </div>



</div>
    </div>
  )
}

export default NotificationSettings;