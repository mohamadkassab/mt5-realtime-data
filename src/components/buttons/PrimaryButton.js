import { Button } from "@mui/material";
const PrimaryButton = ({ onClick, caption, type="" }) => {
  return (
    <Button
    onClick={onClick}
    variant="contained"
    color="primary"
    sx={{
      mt: 2,
      width: "100px",
      "&:hover": {
        filter: "brightness(120%)",
        backgroundColor: "#020817",
      },
    }}
    type={type === "submit" ? "submit" : "button"}
  >
    {caption}
  </Button>
  );
};

export default PrimaryButton;
