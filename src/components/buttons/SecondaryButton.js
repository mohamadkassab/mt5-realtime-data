import { Button } from "@mui/material";

const SecondaryButton = ({ onClick, caption }) => {
  return (
    <Button
    onClick={onClick}
    variant="contained"
    color="secondary"
    sx={{
      mt: 2,
      mx: 2,
      width: "100px",
      "&:hover": {
        filter: "brightness(110%)",
        backgroundColor: "#ffffff",
      },
    }}
  >
    {caption}
  </Button>
  );
};

export default SecondaryButton;
