import CircularProgress from "@mui/material/CircularProgress";

const LoadingElement = () => {
  return (
    <div className="flex justify-center items-center">
      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2  p-4 rounded-lg ">
        <CircularProgress color="primary" />
      </div>
    </div>
  );
};

export default LoadingElement;
