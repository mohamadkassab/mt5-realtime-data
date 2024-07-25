import DefaultLayout from "../layouts/DefaultLayout";
import { MainMenu, CoreMenu, SecondaryPages } from "../utils/constants/Constants";
import React from "react";
import { useLocation } from "react-router-dom";
import SheetsDataTable from "../components/sheets/SheetsDataTable";
import SheetsCreateForm from "../components/sheets/SheetsCreateForm";
import SheetsEditForm from "../components/sheets/SheetsEditForm";

const ControlCenter = () => {
  const location = useLocation();
  const [pageName, setPageName] = React.useState("");
  const [notifications, setNotifications] = React.useState([]);
  const [newNotification, setNewNotification] = React.useState("");

  const checkPathName = () => {
    MainMenu.forEach((page) => {
      if (location.pathname === page.path) {
        setPageName(page.name);
      }
    });
    CoreMenu.forEach((page) => {
      if (location.pathname === page.path) {
        setPageName(page.name);
      }
    });
    SecondaryPages.forEach((page) => {
      if (location.pathname === page.path) {
        setPageName(page.name);
      }
    });
  };

  React.useEffect(() => {
    checkPathName();
  });
  return (
    <DefaultLayout componentName={pageName} notifications={notifications} newNotification={newNotification} >
      {location.pathname === "/sheets" ? <SheetsDataTable setNotifications={setNotifications} setNewNotification={setNewNotification}/> : <></>}
      {location.pathname === "/createSheet" ? <SheetsCreateForm /> : <></>}
      {location.pathname === "/editSheet" ? <SheetsEditForm /> : <></>}
      {location.pathname === "/dashboard" ? <>Dashboard</> : <></>}
    </DefaultLayout>
  );
};

export default ControlCenter;
