import axios from "axios";
import {
  API_MT5SUFFIXES,
  API_MT5SYMBOLCONFIGURATION,
  API_MT5COVERAGESYMBOLS,
  ATFXTOKEN,
  GLOBAL_REQUEST_TIMEOUT,
  API_MT5SymbolsConfigurationsAndSuffixes,
  API_401_RES,
} from "../../constants/Constants";
import {
  GET_MT5SYMBOLCONFIGURATIONS_REQUEST,
  GET_MT5SYMBOLCONFIGURATIONS_SUCCESS,
  GET_MT5SYMBOLCONFIGURATIONS_FAILURE,
  GET_MT5SUFFIX_REQUEST,
  GET_MT5SUFFIX_SUCCESS,
  GET_MT5SUFFIX_FAILURE,
  ISAUTHENTICATED_FAILURE,
  GET_MT5SymbolsConfigurationsAndSuffixes_REQUEST,
  GET_MT5SymbolsConfigurationsAndSuffixes_SUCCESS,
  GET_MT5SymbolsConfigurationsAndSuffixes_FAILURE,
  GET_MT5COVERAGESYMBOLS_REQUEST,
  GET_MT5COVERAGESYMBOLS_SUCCESS,
  GET_MT5COVERAGESYMBOLS_FAILURE,
} from "../ActionTypes";

export const GetMT5SymbolConfigurations = () => {
  return async (dispatch) => {
    try {
      dispatch({ type: GET_MT5SYMBOLCONFIGURATIONS_REQUEST });
      const apiIp = process.env.REACT_APP_API_IP;
      const apiPort = process.env.REACT_APP_API_PORT;
      const authorizationToken = localStorage.getItem(ATFXTOKEN);
      const response = await axios.get(
        `${apiIp}:${apiPort}${API_MT5SYMBOLCONFIGURATION}`,
        {
          headers: {
            Authorization: `${authorizationToken}`,
          },
          timeout: GLOBAL_REQUEST_TIMEOUT,
        }
      );
      const status = response.status;

      if (status >= 200 && status < 300) {
        let data;
        try {
          data = JSON.parse(response.data);
        } catch (e) {
          data = response.data;
        }
        dispatch({ type: GET_MT5SYMBOLCONFIGURATIONS_SUCCESS, payload: data });
      } else if (status === 401) {
        dispatch({ type: ISAUTHENTICATED_FAILURE });
      } else {
        throw new Error(`Unexpected status code: ${status}`);
      }
    } catch (error) {
      const errorPayload = {
        message: error.message,
        code: error.code,
      };
      dispatch({
        type: GET_MT5SYMBOLCONFIGURATIONS_FAILURE,
        payload: errorPayload,
      });
      if (errorPayload.message === API_401_RES) {
        dispatch({ type: ISAUTHENTICATED_FAILURE });
      }
    }
  };
};

export const GetMT5Suffixes = () => {
  return async (dispatch) => {
    try {
      dispatch({ type: GET_MT5SUFFIX_REQUEST });
      const apiIp = process.env.REACT_APP_API_IP;
      const apiPort = process.env.REACT_APP_API_PORT;
      const authorizationToken = localStorage.getItem(ATFXTOKEN);
      const response = await axios.get(
        `${apiIp}:${apiPort}${API_MT5SUFFIXES}`,
        {
          headers: {
            Authorization: `${authorizationToken}`,
          },
          timeout: GLOBAL_REQUEST_TIMEOUT,
        }
      );
      const status = response.status;

      if (status >= 200 && status < 300) {
        const data = JSON.parse(response.data);
        console.log(data);
        dispatch({ type: GET_MT5SUFFIX_SUCCESS, payload: data });
      } else if (status === 401) {
        dispatch({ type: ISAUTHENTICATED_FAILURE });
      } else {
        throw new Error(`Unexpected status code: ${status}`);
      }
    } catch (error) {
      const errorPayload = {
        message: error.message,
        code: error.code,
      };
      dispatch({ type: GET_MT5SUFFIX_FAILURE, payload: errorPayload });
      if (errorPayload.message === API_401_RES) {
        dispatch({ type: ISAUTHENTICATED_FAILURE });
      }
    }
  };
};

export const GetMT5SymbolsConfigurationsAndSuffixes = () => {
  return async (dispatch) => {
    try {
      dispatch({ type: GET_MT5SymbolsConfigurationsAndSuffixes_REQUEST });
      const apiIp = process.env.REACT_APP_API_IP;
      const apiPort = process.env.REACT_APP_API_PORT;
      const authorizationToken = localStorage.getItem(ATFXTOKEN);
      const response = await axios.get(
        `${apiIp}:${apiPort}${API_MT5SymbolsConfigurationsAndSuffixes}`,
        {
          headers: {
            Authorization: `${authorizationToken}`,
          },
          timeout: GLOBAL_REQUEST_TIMEOUT,
        }
      );
      const status = response.status;

      if (status >= 200 && status < 300) {
        dispatch({
          type: GET_MT5SymbolsConfigurationsAndSuffixes_SUCCESS,
          payload: response.data,
        });
      } else if (status === 401) {
        dispatch({ type: ISAUTHENTICATED_FAILURE });
      } else {
        throw new Error(`Unexpected status code: ${status}`);
      }
    } catch (error) {
      const errorPayload = {
        message: error.message,
        code: error.code,
      };
      console.log(error);
      dispatch({
        type: GET_MT5SymbolsConfigurationsAndSuffixes_FAILURE,
        payload: errorPayload,
      });
      if (errorPayload.message === API_401_RES) {
        dispatch({ type: ISAUTHENTICATED_FAILURE });
      }
    }
  };
};

export const GetMT5CoverageSymbols = () => {
  return async (dispatch) => {
    try {
      dispatch({ type: GET_MT5COVERAGESYMBOLS_REQUEST });
      const apiIp = process.env.REACT_APP_API_IP;
      const apiPort = process.env.REACT_APP_API_PORT;
      const authorizationToken = localStorage.getItem(ATFXTOKEN);
      const response = await axios.get(
        `${apiIp}:${apiPort}${API_MT5COVERAGESYMBOLS}`,
        {
          headers: {
            Authorization: `${authorizationToken}`,
          },
          timeout: GLOBAL_REQUEST_TIMEOUT,
        }
      );
      const status = response.status;

      if (status >= 200 && status < 300) {
        let data;
        try {
          data = JSON.parse(response.data);
        } catch (e) {
          data = response.data;
        }
        dispatch({ type: GET_MT5COVERAGESYMBOLS_SUCCESS, payload: data });
      } else if (status === 401) {
        dispatch({ type: ISAUTHENTICATED_FAILURE });
      } else {
        throw new Error(`Unexpected status code: ${status}`);
      }
    } catch (error) {
      const errorPayload = {
        message: error.message,
        code: error.code,
      };
      dispatch({
        type: GET_MT5COVERAGESYMBOLS_FAILURE,
        payload: errorPayload,
      });
      if (errorPayload.message === API_401_RES) {
        dispatch({ type: ISAUTHENTICATED_FAILURE });
      }
    }
  };
};
