import { Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
const AddButton = ({ onClick, caption = "Create" }) => {
  return (
    <Button
      onClick={onClick}
      variant="contained"
      sx={{
        "&:hover": {
          filter: "brightness(120%)",
          backgroundColor: "#020817",
        },
      }}
      startIcon={
        <AddIcon
          sx={{
            color: "white",
          }}
        />
      }
    >
      {caption}
    </Button>
  );
};

export default AddButton;
