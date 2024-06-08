import logo from "../../resources/images/logo-lg.png";

const LogoContainer = () => {
  return (
    <div className="w-full flex flex-col items-center">
      <div className="max-w-screen-md flex flex-col items-center ">
        <img src={logo} alt="logo" height={260} width={260} />
      </div>
    </div>
  );
};
export default LogoContainer;
