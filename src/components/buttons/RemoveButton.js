import { Button } from "@mui/material";
import RemoveIcon from "@mui/icons-material/Remove";
const RemoveButton = ({ onClick, caption = "Create" }) => {
  return (
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
        <RemoveIcon
          sx={{
            color: "black",
          }}
        />
      }
    >
      {caption}
    </Button>
  );
};

export default RemoveButton;
