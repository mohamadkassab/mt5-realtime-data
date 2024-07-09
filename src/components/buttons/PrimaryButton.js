import { Button } from "@mui/material";
const PrimaryButton = ({ onClick, caption, type = "", isActive = true }) => {
  return (
    <Button
      onClick={onClick}
      variant="contained"
      color="primary"
      sx={{
        mt: 2,
        mx: { xs: 0, sm: 2 },
        width: "100px",
        "&:hover": {
          filter: "brightness(120%)",
          backgroundColor: "#020817",
        },
      }}
      type={type === "submit" ? "submit" : "button"}
      disabled={!isActive}
    >
      {caption}
    </Button>
  );
};

export default PrimaryButton;
