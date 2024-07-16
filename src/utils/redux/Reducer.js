import {

  ISAUTHENTICATED_REQUEST,
  ISAUTHENTICATED_FAILURE,
  ISAUTHENTICATED_SUCCESS,
  EL_REQUEST,
  EL_SUCCESS,
  EL_FAILURE,
  SEL_REQUEST,
  SEL_SUCCESS,
  SEL_FAILURE,
  GET_MANAGER_REQUEST,
  GET_MANAGER_SUCCESS,
  GET_MANAGER_FAILURE,
  GET_MT5SYMBOLCONFIGURATIONS_REQUEST,
  GET_MT5SYMBOLCONFIGURATIONS_SUCCESS,
  GET_MT5SYMBOLCONFIGURATIONS_FAILURE,
  GET_MT5SUFFIX_REQUEST,
  GET_MT5SUFFIX_SUCCESS,
  GET_MT5SUFFIX_FAILURE,
  GET_MT5SymbolsConfigurationsAndSuffixes_REQUEST,
  GET_MT5SymbolsConfigurationsAndSuffixes_SUCCESS,
  GET_MT5SymbolsConfigurationsAndSuffixes_FAILURE,
  GET_COVERAGEACCOUNTS_REQUEST,
  GET_COVERAGEACCOUNTS_SUCCESS,
  GET_COVERAGEACCOUNTS_FAILURE,
  GET_SERVERS_REQUEST,
  GET_SERVERS_SUCCESS,
  GET_SERVERS_FAILURE,
  GET_MT5COVERAGESYMBOLS_REQUEST,
  GET_MT5COVERAGESYMBOLS_SUCCESS,
  GET_MT5COVERAGESYMBOLS_FAILURE,
  GET_SHEETTOEDITIDS_REQUEST,
  GET_SHEETTOEDITIDS_SUCCESS,
  GET_SHEETTOEDITIDS_FAILURE,
  GET_SHEETS_REQUEST,
  GET_SHEETS_SUCCESS,
  GET_SHEETS_FAILURE,
  SHEET_ONLINE,
  SHEET_OFFLINE

} from "./ActionTypes";
import {produce} from "immer";
import { ATFXTOKEN } from "../constants/Constants";

const initialState = {
  Managers: [],
  mt5SymbolConfigurations: [],
  mt5Suffixes: [],
  MT5SymbolsConfigurationsAndSuffixes:[],
  CoverageAccounts:[],
  Servers:[],
  MT5CoverageSymbols:[],
  sheets:[],
  sheetToEditIds:[],
  isAuthenticated: localStorage.getItem(ATFXTOKEN) || false,
  sheetStatus: false,
  blur: false,
  loading: false,
  success: false,
  error: false,
};

const reducer = produce((draft, action) => {

  switch (action.type) {
    // GLOBAL
    case EL_REQUEST:
      draft.error = false;
      draft.loading = true;
      break;
    case EL_SUCCESS:
      draft.error = false;
      draft.loading = false;
      break;
    case EL_FAILURE:
      draft.error = true;
      draft.loading = false;
      break;

    case SEL_REQUEST:
      draft.success = false;
      draft.error = false;
      draft.loading = true;
      break;
    case SEL_SUCCESS:
      draft.success = true;
      draft.error = false;
      draft.loading = false;
      break;
    case SEL_FAILURE:
      draft.success = false;
      draft.error = true;
      draft.loading = false;
      break;

    case ISAUTHENTICATED_REQUEST:
      draft.isAuthenticated = false;
      break;
    case ISAUTHENTICATED_SUCCESS:
      draft.isAuthenticated = true;
      break;
    case ISAUTHENTICATED_FAILURE:
      draft.isAuthenticated = false;
      draft.error = false;
      break;

    // MT5 MANAGER
    case GET_MANAGER_REQUEST:
      draft.Managers= [];
      draft.error = false;
      draft.loading = true;
      break;
    case GET_MANAGER_SUCCESS:
      draft.Managers = action.payload.map((item) => item);
      draft.error = false;
      draft.loading = false;
      break;
    case GET_MANAGER_FAILURE:
      draft.Managers = [];
      draft.error = true;
      draft.loading = false;
      break;

    // MT5 SYMBOL CONFIGURATIONS
    case GET_MT5SYMBOLCONFIGURATIONS_REQUEST:
      draft.mt5SymbolConfigurations= [];
      draft.error = false;
      draft.loading = true;
      break;
    case GET_MT5SYMBOLCONFIGURATIONS_SUCCESS:
      draft.mt5SymbolConfigurations = action.payload.map((item) => item);
      draft.error = false;
      draft.loading = false;
      break;
    case GET_MT5SYMBOLCONFIGURATIONS_FAILURE:
      draft.mt5SymbolConfigurations = [];
      draft.error = true;
      draft.loading = false;
      break;

          
    // MT5 SUFFIX 
    case GET_MT5SUFFIX_REQUEST:
      draft.mt5Suffixes= [];
      draft.error = false;
      draft.loading = true;
      break;
    case GET_MT5SUFFIX_SUCCESS:
      draft.mt5Suffixes = action.payload.map((item) => item);
      draft.error = false;
      draft.loading = false;
      break;
    case GET_MT5SUFFIX_FAILURE:
      draft.mt5Suffixes = [];
      draft.error = true;
      draft.loading = false;
      break;

     // MT5SymbolsConfigurationsAndSuffixes
     case GET_MT5SymbolsConfigurationsAndSuffixes_REQUEST:
      draft.MT5SymbolsConfigurationsAndSuffixes= [];
      draft.error = false;
      draft.loading = true;
      break;
    case GET_MT5SymbolsConfigurationsAndSuffixes_SUCCESS:
      draft.MT5SymbolsConfigurationsAndSuffixes = action.payload.map((item) => item);
      draft.error = false;
      draft.loading = false;
      break;
    case GET_MT5SymbolsConfigurationsAndSuffixes_FAILURE:
      draft.MT5SymbolsConfigurationsAndSuffixes = [];
      draft.error = true;
      draft.loading = false;
      break;

    // COVERAGEACCOUNTS
    case GET_COVERAGEACCOUNTS_REQUEST:
      draft.CoverageAccounts= [];
      draft.error = false;
      draft.loading = true;
      break;
    case GET_COVERAGEACCOUNTS_SUCCESS:
      draft.CoverageAccounts = action.payload.map((item) => item);
      draft.error = false;
      draft.loading = false;
      break;
    case GET_COVERAGEACCOUNTS_FAILURE:
      draft.CoverageAccounts = [];
      draft.error = true;
      draft.loading = false;
      break;
    
      // SERVERS
    case GET_SERVERS_REQUEST:
      draft.Servers= [];
      draft.error = false;
      draft.loading = true;
      break;
    case GET_SERVERS_SUCCESS:
      draft.Servers = action.payload.map((item) => item);
      draft.error = false;
      draft.loading = false;
      break;
    case GET_SERVERS_FAILURE:
      draft.Servers = [];
      draft.error = true;
      draft.loading = false;
      break;

    // SERVERS
    case GET_MT5COVERAGESYMBOLS_REQUEST:
      draft.MT5CoverageSymbols= [];
      draft.error = false;
      draft.loading = true;
      break;
    case GET_MT5COVERAGESYMBOLS_SUCCESS:
      draft.MT5CoverageSymbols = action.payload.map((item) => item);
      draft.error = false;
      draft.loading = false;
      break;
    case GET_MT5COVERAGESYMBOLS_FAILURE:
      draft.MT5CoverageSymbols = [];
      draft.error = true;
      draft.loading = false;
      break;

    // SHEETS
    case GET_SHEETS_REQUEST:
      draft.sheets= [];
      draft.error = false;
      draft.loading = true;
      break;
    case GET_SHEETS_SUCCESS:
      draft.sheets = action.payload.map((item) => item);
      draft.error = false;
      draft.loading = false;
      break;
    case GET_SHEETS_FAILURE:
      draft.sheets = [];
      draft.error = true;
      draft.loading = false;
      break;

    
    // SHEETTOEDITIDS
    case GET_SHEETTOEDITIDS_REQUEST:
      draft.sheetToEditIds= [];
      draft.error = false;
      draft.loading = true;
      break;
    case GET_SHEETTOEDITIDS_SUCCESS:
      draft.sheetToEditIds = action.payload;
      draft.error = false;
      draft.loading = false;
      break;
    case GET_SHEETTOEDITIDS_FAILURE:
      draft.sheetToEditIds = [];
      draft.error = true;
      draft.loading = false;
      break;

      // SHEET STATUS
      case SHEET_ONLINE:
        draft.sheetStatus= true;
        break;
      case SHEET_OFFLINE:
        draft.sheetStatus= false;
        break;


    default:
      break;
  }
}, initialState);

export default reducer;
