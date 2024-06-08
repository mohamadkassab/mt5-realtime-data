import DefaultLayout from "../layouts/DefaultLayout";
import { Menu, CoreMenu } from "../utils/constants/Constants";
import React from "react";
import { useLocation } from "react-router-dom";
import SheetsDataTable from "../components/tables/SheetsDataTable";

const ControlCenter = () => {
  const location = useLocation();
  const [pageName, setPageName] = React.useState("");

  const checkPathName = () => {
    Menu.map((page) => {
      if (location.pathname === page.path) {
        setPageName(page.name);
      }
    });
    CoreMenu.map((page) => {
      if (location.pathname === page.path) {
        setPageName(page.name);
      }
    });
  };

  React.useEffect(() => {
    checkPathName();
  });
  return (
    <DefaultLayout componentName={pageName}>
      {location.pathname === "/sheets" ? <SheetsDataTable /> : <></>}
    </DefaultLayout>
  );
};

export default ControlCenter;
