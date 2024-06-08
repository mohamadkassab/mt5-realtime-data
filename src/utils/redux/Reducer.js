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
  GET_MT5MANAGER_REQUEST,
  GET_MT5MANAGER_SUCCESS,
  GET_MT5MANAGER_FAILURE,
  GET_MT5SYMBOLCONFIGURATIONS_REQUEST,
  GET_MT5SYMBOLCONFIGURATIONS_SUCCESS,
  GET_MT5SYMBOLCONFIGURATIONS_FAILURE,
  GET_MT5SUFFIX_REQUEST,
  GET_MT5SUFFIX_SUCCESS,
  GET_MT5SUFFIX_FAILURE,
} from "./ActionTypes";
import produce from "immer";
import { ATFXTOKEN } from "../constants/Constants";

const initialState = {

  mt5Managers: [],
  mt5SymbolConfigurations: [],
  mt5Suffixes: [],
  isAuthenticated: localStorage.getItem(ATFXTOKEN) || false,
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
      break;

    // MT5 MANAGER
    case GET_MT5MANAGER_REQUEST:
      draft.mt5Managers= [];
      draft.error = false;
      draft.loading = true;
      break;
    case GET_MT5MANAGER_SUCCESS:
      draft.mt5Managers = action.payload.map((item) => item);
      draft.error = false;
      draft.loading = false;
      break;
    case GET_MT5MANAGER_FAILURE:
      draft.mt5Managers = [];
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


    default:
      break;
  }
}, initialState);

export default reducer;
