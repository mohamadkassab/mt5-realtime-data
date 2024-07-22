import React from "react";
import { styled, useTheme, keyframes } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { Menu, CoreMenu } from "../utils/constants/Constants";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { SignOut } from "../utils/redux/actions/Auth";
import LoadingElement from "../components/common/LoadingElement";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { Stack } from "@mui/material";

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

const DefaultLayout = ({ componentName, children }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showSuccess, setShowSuccess] = React.useState(false);
  const [showError, setShowError] = React.useState(false);
  const [isConnected, setIsConnected] = React.useState(false);
  const [open, setOpen] = React.useState(true);
  const sheetStatus = useSelector((state) => state.sheetStatus);
  const loading = useSelector((state) => state.loading);
  const success = useSelector((state) => state.success);
  const error = useSelector((state) => state.error);
  const theme = useTheme();

  // Start Online Tag
  const pulse = keyframes`
  0% {
    transform: scale(0.95);
    box-shadow: 0 0 0 0 rgba(0, 255, 0, 0.7);
  }

  70% {
    transform: scale(1);
    box-shadow: 0 0 0 10px rgba(0, 255, 0, 0);
  }

  100% {
    transform: scale(0.95);
    box-shadow: 0 0 0 0 rgba(0, 255, 0, 0);
  }
`;

  const Circle = styled(({ isConnected, ...other }) => <Box {...other} />)(
    ({ isConnected }) => ({
      width: 12,
      height: 12,
      borderRadius: "50%",
      backgroundColor: isConnected ? "green" : "red",
      animation: isConnected ? `${pulse} 1.5s infinite` : "none",
    })
  );

  // End Online Tag

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const signOutHandler = async () => {
    try {
      await dispatch(SignOut());
      navigate("/");
    } catch (error) {}
  };

  React.useEffect(() => {
    setIsConnected(sheetStatus);
  }, [sheetStatus]);

  React.useEffect(() => {
    if (success) {
      setShowSuccess(true);
      const successTimer = setTimeout(() => {
        setShowSuccess(false);
      }, 2000);

      return () => clearTimeout(successTimer);
    }
    if (error) {
      setShowError(true);
      const errorTimer = setTimeout(() => {
        setShowError(false);
      }, 2000);

      return () => clearTimeout(errorTimer);
    }
  }, [success, error]);

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: "none" }),
            }}
          >
            <MenuIcon />
          </IconButton>

          <div className="w-full flex items-center justify-between">
            <div>
              <Typography variant="h6" noWrap component="div">
                {componentName}
              </Typography>
            </div>
            <div>
              {componentName === "Sheets" && (
                <Box display="flex" alignItems="center">
                  <Circle isConnected={isConnected} />
                  <Typography
                    variant="body1"
                    style={{
                      marginLeft: 8,
                      fontWeight: isConnected ? "bold" : "normal",
                    }}
                  >
                    {isConnected ? "Online" : "Offline"}
                  </Typography>
                </Box>
              )}
            </div>
          </div>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <List>
          {Menu.map((item, index) => (
            <React.Fragment key={index}>
              <ListItem disablePadding sx={{ display: "block" }}>
                <ListItemButton
                  href={item.path}
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? "initial" : "center",
                    px: 2.5,
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : "auto",
                      justifyContent: "center",
                    }}
                  >
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText
                    primary={item.name}
                    sx={{ opacity: open ? 1 : 0 }}
                  />
                </ListItemButton>
              </ListItem>
              {item.dividerBottom && <Divider sx={{ my: 1 }} />}
            </React.Fragment>
          ))}
        </List>
        <Divider />
        <List>
          {CoreMenu.map((item, index) => (
            <React.Fragment key={index}>
              <ListItem disablePadding sx={{ display: "block" }}>
                <ListItemButton
                  href={item.path}
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? "initial" : "center",
                    px: 2.5,
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : "auto",
                      justifyContent: "center",
                    }}
                  >
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText
                    primary={item.name}
                    sx={{ opacity: open ? 1 : 0 }}
                  />
                </ListItemButton>
              </ListItem>
              {item.dividerBottom && <Divider sx={{ my: 1 }} />}
            </React.Fragment>
          ))}
        </List>
        <Divider />
        <List>
          <ListItem disablePadding sx={{ display: "block" }}>
            <ListItemButton
              onClick={signOutHandler}
              sx={{
                minHeight: 48,
                justifyContent: open ? "initial" : "center",
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                }}
              >
                <ExitToAppIcon fontSize="large" />
              </ListItemIcon>
              <ListItemText primary="Sign out" sx={{ opacity: open ? 1 : 0 }} />
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        {children}
      </Box>

      {loading && (
        <LoadingElement isDrawerOpen={open} componentName={componentName} />
      )}
      <Stack
        spacing={2}
        sx={{ position: "fixed", bottom: 20, left: 20, zIndex: 1400 }}
      >
        {showSuccess && (
          <Alert severity="success" variant="filled" sx={{ width: "100%" }}>
            SUCCESS
          </Alert>
        )}
        {showError && (
          <Alert
            severity="error"
            variant="filled"
            sx={{ width: "100%", bgcolor: "#d9534f" }}
          >
            FAILED
          </Alert>
        )}
      </Stack>
    </Box>
  );
};

export default DefaultLayout;
