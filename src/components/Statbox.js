import { Box, Typography } from "@mui/material";
import ProgressCircle from "./ProgressCircle";

const Statbox = ({ title, subtitle, icon, progress, increase }) => {

  return (
    <Box width="100%" m="0 30px">
      <Box display="flex" justifyContent="space-between">
        {/* <Box>
          {icon}
          <Typography
            variant="h4"
            fontWeight="bold"
            sx={{ color: 'grey' }}
          >
            {title}
          </Typography>
        </Box> */}
        <Box className = 'flex justify-center align-items-center' style = {{'height': '120px', 'width' : '120px', 'position' : 'relative'}}>
          <ProgressCircle progress={progress} />
          <div style = {{'position' : 'absolute'}}>
        
          <Typography variant="h4" style={{fontWeight: "bold"}}   className="text-center">{title}</Typography >
          <Typography variant="h5"   className="text-xs text-center">{subtitle}</Typography >
          </div>
        </Box>
      </Box>
      <Box display="flex" justifyContent="space-between" mt="2px">
        {/* <Typography variant="h5" sx={{ color: 'green' }}>
          {subtitle}
        </Typography> */}
        {/* <Typography
          variant="h5"
          fontStyle="italic"
          sx={{ color: 'green' }}
        >
          {increase}
        </Typography> */}
      </Box>
    </Box>
  );
};

export default Statbox;
