import DefaultLayout from "../layouts/DefaultLayout";
import { Menu, CoreMenu, SecondaryPages } from "../utils/constants/Constants";
import React from "react";
import { useLocation } from "react-router-dom";
import SheetsDataTable from "../components/tables/SheetsDataTable";
import SheetsCreateForm from "../components/forms/sheets/SheetsCreateForm";
import SheetsEditForm from "../components/forms/sheets/SheetsEditForm";

const ControlCenter = () => {
  const location = useLocation();
  const [pageName, setPageName] = React.useState("");

  const checkPathName = () => {
    Menu.forEach((page) => {
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
    <DefaultLayout componentName={pageName}>
      {location.pathname === "/sheets" ? <SheetsDataTable /> : <></>}
      {location.pathname === "/createSheet" ? <SheetsCreateForm /> : <></>}
      {location.pathname === "/editSheet" ? <SheetsEditForm /> : <></>}
    </DefaultLayout>
  );
};

export default ControlCenter;
