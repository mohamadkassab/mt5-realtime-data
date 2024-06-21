import { Button } from "@mui/material";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
 const EditButton = ({onClick, caption="EDIT"})=>{
    return(
        <Button
        onClick={onClick}
        variant="contained"
        color="secondary"
        sx={{
          "&:hover": {
            filter: "brightness(110%)",
            backgroundColor: "#ffffff",
          },
        }}
        startIcon={
            <ModeEditOutlineOutlinedIcon 
            sx={{
              color: "black",
            }}
          />
        }
      >
        {caption}
      </Button>
    )
}

export default EditButton