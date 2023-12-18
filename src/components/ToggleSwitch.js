// Filename: ToggleSwitch.js 
import React from "react"; 
import { Box, useTheme } from "@mui/material";
import { tokens } from "../theme";
import '../assets/ToggleSwitch.css'

const ToggleSwitch = ({ label }) => { 
const theme = useTheme();
const colors = tokens(theme.palette.mode);
return ( 
	<div > 
	<div className="toggle-switch" > 
		<input type="checkbox" className="checkbox"
			name={label} id={label} /> 
		<label className="label" htmlFor={label}> 
		<span className="inner" /> 
		<span className="switch" /> 
		</label> 
	</div> 
	</div> 
); 
}; 

export default ToggleSwitch;
