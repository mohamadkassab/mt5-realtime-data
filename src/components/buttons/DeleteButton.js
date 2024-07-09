import { Button } from "@mui/material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
const DeleteButton = ({ onClick, caption = "EDIT" }) => {
  return (
    <Button
      onClick={onClick}
      variant="contained"
      color="complementaryRed"
      sx={{
        "&:hover": {
          filter: "brightness(110%)",
        },
      }}
      startIcon={
        <DeleteOutlineIcon
          sx={{
            color: "#ffffff",
          }}
        />
      }
    >
      {caption}
    </Button>
  );
};

export default DeleteButton;
