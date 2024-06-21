import GridViewRoundedIcon from "@mui/icons-material/GridViewRounded";
import ListAltIcon from "@mui/icons-material/ListAlt";
import { symbolCellRender, coverageSymbolCellRender } from "../../components/cellRendering/CellRendering";

// Common
export const ATFXTOKEN = "ATFXTOKEN";
export const GLOBAL_REQUEST_TIMEOUT = 10000;
export const ROWS_PER_PAGE = [10, 15, 30];

// AUTH
export const API_ADMIN_LOGIN = "/users/login/";

// SHEET POST
export const API_SHEET = "/users/dealerConfigurationsAndDetails/";

// SHEET GET
export const API_GET_SHEET = "/users/allDealerConfigurationsAndDetails/";

// MANAGER
export const API_MANAGER = "/users/MT5ManagersAdmin/";

// MT5SYMBOLCONFIGURATION
export const API_MT5SYMBOLCONFIGURATION = "/users/MT5SymbolsConfigurations/";

// API_MT5SUFFIXES
export const API_MT5SUFFIXES = "/users/MT5SymbolsSuffixes/";

// API_COVERAGEACCOUNTS
export const API_COVERAGEACCOUNTS = "/users/MT5CoverageAdmin/";

// API_MT5SymbolsConfigurationsAndSuffixes
export const API_MT5SymbolsConfigurationsAndSuffixes = "/admins/MT5SymbolsConfigurationsAndSuffixes/";

// API_Servers
export const API_SERVER = "/users/configurations/minimal/";

// API_MT5COVERAGESYMBOLS
export const API_MT5COVERAGESYMBOLS = "/users/MT5CoverageSymbols/";

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

export const SecondaryPages = [
  {
    name: "Create Sheet",
    path: "/createSheet",

  },
];

export const SheetDataColumns = [
  {
    dataField: "id",
    caption: "Id",
  },
  {
    dataField: "sheet_name",
    caption: "Sheet Name",
  },
  {
    dataField: "visibility",
    caption: "visibility",
  },
  {
    dataField: "server_id",
    caption: "Server",
  },
  {
    dataField: "manager_id",
    caption: "Manager",
  },
  {
    dataField: "symbol_configuration_id",
    caption: "Symbol Configuration",
  },
  {
    dataField: "dealer_id",
    caption: "Dealer Id",
  },
  {
    dataField: "dealer_manager_symbols_formulas",
    caption: "Dealer manager symbols formulas",
  },
  {
    dataField: "dealer_configuration_symbol_formula",
    caption: "Dealer configuration symbol formula",
  },
  {
    dataField: "symbol_configuration_name",
    caption: "Symbol Configuration Name",
  },
  {
    dataField: "managers_name",
    caption: "managers Name",
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
    caption: "Coverage Account ",
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
    dataField: "name",
    caption: "Configuration",
    alignment: "left",
    allowUpdating:false,
    sortable:true
  },
  {
    dataField: "manager",
    caption: "Manager",
    alignment: "left",
    allowUpdating:false,
    sortable:true
  },
  {
    dataField: "symbol",
    caption: "Symbol",
    alignment: "left",
    allowUpdating:false,
    sortable:true,
    cellRender: (data) => symbolCellRender(data)
    
  },
];

export const Sheet3DataColumns = [
  {
    dataField: "empty",
    caption: "",
    alignment: "left",
    allowUpdating:false,
    sortable:true
  },
  {
    dataField: "coverage",
    caption: "Coverage",
    alignment: "left",
    allowUpdating:false,
    sortable:true
  },
  {
    dataField: "symbol",
    caption: "Symbol",
    alignment: "left",
    allowUpdating:false,
    sortable:true,
    cellRender: (data) => coverageSymbolCellRender(data)
  },
];

