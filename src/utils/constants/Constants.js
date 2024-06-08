import GridViewRoundedIcon from "@mui/icons-material/GridViewRounded";
import ListAltIcon from "@mui/icons-material/ListAlt";

// Common
export const ATFXTOKEN = "ATFXTOKEN";
export const GLOBAL_REQUEST_TIMEOUT = 10000;
export const ROWS_PER_PAGE = [10, 15, 30];

// AUTH
export const API_ADMIN_LOGIN = "/users/login/";

// SHEET
export const API_SHEET = "/";

// MANAGER
export const API_MANAGER = "/admins/MT5ManagersAdmin/";

// MT5MANAGER
export const API_MT5MANAGER = "/users/MT5AllManagers/";

// MT5SYMBOLCONFIGURATION
export const API_MT5SYMBOLCONFIGURATION = "/users/MT5SymbolsConfigurations/";

// API_MT5SUFFIXES
export const API_MT5SUFFIXES = "/users/MT5SymbolsSuffixes/";

// API_401_RES
export const API_401_RES = "Request failed with status code 401";

export const Menu = [
  {
    name: "Dashboard",
    path: "/dashboard",
    icon: <GridViewRoundedIcon fontSize="large" />,
  },
];

export const CoreMenu = [
  {
    name: "Sheets",
    path: "/sheets",
    icon: <ListAltIcon fontSize="large" />,
  },
];

export const Sheet1DataColumns = [
  {
    dataField: "id",
    caption: "Id",
    alignment: "left",
    hideColumn: true,
  },
  {
    dataField: "sheet_name",
    caption: "Sheet Name",
    alignment: "center",
  },
  {
    dataField: "visibility",
    caption: "Visibility",
    alignment: "center",
  },
  {
    dataField: "server_id",
    caption: "Server",
    alignment: "center",
  },
  {
    dataField: "manager_id",
    caption: "Manager",
    alignment: "center",
  },
  {
    dataField: "symbol_configuration_id",
    caption: "Symbol Configuration",
    alignment: "center",
  },
  {
    dataField: "dealer_id",
    caption: "Dealer Id",
    alignment: "center",
  },
  {
    dataField: "dealer_manager_symbols_formulas",
    caption: "Dealer manager symbols formulas",
    alignment: "center",
  },
  {
    dataField: "dealer_configuration_symbol_formula",
    caption: "Dealer configuration symbol formula",
    alignment: "center",
  },
];
export const dealer_manager_symbols_formulas = [
  {
    dataField: "symbol",
    caption: "Symbol ",
    alignment: "left",
  },
  {
    dataField: "value",
    caption: "Value",
    alignment: "center",
  },
];

export const dealer_configuration_symbol_formula = [
  {
    dataField: "coverage_id",
    caption: "Coverage Id ",
    alignment: "left",
  },
  {
    dataField: "symbol",
    caption: "Symbol",
    alignment: "center",
  },
  {
    dataField: "value",
    caption: "Value",
    alignment: "center",
  },
  {
    dataField: "dealer_configuration_id",
    caption: "Dealer configuration id",
    alignment: "center",
  },
];

export const Sheet2DataColumns = [
  {
    dataField: "configuration",
    caption: "Configuration",
    alignment: "left",
    allowUpdating:false
  },
  {
    dataField: "symbol",
    caption: "Symbol",
    alignment: "left",
    allowUpdating:false
  },
];
