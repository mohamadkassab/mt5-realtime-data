import Avatar from "@mui/material/Avatar";
const AvatarMenu = ({ children }) => {
  return (
    <Avatar
      sx={{
        bgcolor: "#0000008a",
        width: 36,
        height: 36,
        borderRadius: 2,
      }}
    >
      {children}
    </Avatar>
  );
};
export default AvatarMenu;
