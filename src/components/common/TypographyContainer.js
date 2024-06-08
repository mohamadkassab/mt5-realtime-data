import {
    Typography,
  } from "@mui/material";
  
const TypographyContainer = ({children})=>{
    return(
        <Typography variant="h4" component="h1" gutterBottom align="center">
        {children}
      </Typography>
    )
}

export default TypographyContainer