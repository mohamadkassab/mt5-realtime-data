import CircularProgress from "@mui/material/CircularProgress";

const LoadingElement = ({ isDrawerOpen, componentName }) => {
  const isLogin = isDrawerOpen ? false : (componentName === undefined ? true : false);
  const isSemiDrawer = isDrawerOpen ? false : (isLogin ? false : true);
  return (
    <div className="flex justify-center items-center">
      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2   p-4 rounded-lg ">
        <CircularProgress
          color="primary"
          className={`${isDrawerOpen && "ml-[239px]"} ${isSemiDrawer && "ml-[64px]"}`}
        />
      </div>
    </div>
  );
};

export default LoadingElement;
