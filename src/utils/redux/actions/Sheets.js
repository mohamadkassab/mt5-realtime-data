import axios from "axios";
import {
  API_SHEET,
  API_DELETE_SHEET,
  API_GET_SHEETTOEDITIDS,
  ATFXTOKEN,
  GLOBAL_REQUEST_TIMEOUT,
  API_401_RES,
  API_UPDATE_SHEET,
} from "../../constants/Constants";
import { jwtDecode } from "jwt-decode";
import {
  GET_SHEETS_REQUEST,
  GET_SHEETS_SUCCESS,
  GET_SHEETS_FAILURE,
  SEL_REQUEST,
  SEL_SUCCESS,
  SEL_FAILURE,
  GET_SHEETTOEDITIDS_REQUEST,
  GET_SHEETTOEDITIDS_SUCCESS,
  GET_SHEETTOEDITIDS_FAILURE,
  ISAUTHENTICATED_FAILURE,
} from "../ActionTypes";

export const CreateSheet = (formData) => {
  return async (dispatch) => {
    try {
      dispatch({ type: SEL_REQUEST });

      const apiIp = process.env.REACT_APP_API_IP;
      const apiPort = process.env.REACT_APP_API_PORT;
      const authorizationToken = localStorage.getItem(ATFXTOKEN);
      const params = formData;

      const response = await axios.post(
        `${apiIp}:${apiPort}${API_SHEET}`,
        params,
        {
          headers: {
            Authorization: `${authorizationToken}`,
          },
          timeout: GLOBAL_REQUEST_TIMEOUT,
        }
      );
      const status = response.status;
      if (status >= 200 && status < 300) {
        dispatch({ type: SEL_SUCCESS });
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
      console.log(errorPayload);
      dispatch({ type: SEL_FAILURE, payload: errorPayload });
    }
  };
};

export const EditSheet = (formData, sheetId) => {
  return async (dispatch) => {
    try {
      console.log(formData)
      dispatch({ type: SEL_REQUEST });

      const apiIp = process.env.REACT_APP_API_IP;
      const apiPort = process.env.REACT_APP_API_PORT;
      const authorizationToken = localStorage.getItem(ATFXTOKEN);
      const params = formData;

      const response = await axios.put(
        `${apiIp}:${apiPort}${API_UPDATE_SHEET}${sheetId}`,
        params,
        {
          headers: {
            Authorization: `${authorizationToken}`,
          },
          timeout: GLOBAL_REQUEST_TIMEOUT,
        }
      );
      const status = response.status;
      if (status >= 200 && status < 300) {
        dispatch({ type: SEL_SUCCESS });
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
      console.log(errorPayload);
      dispatch({ type: SEL_FAILURE, payload: errorPayload });
    }
  };
};

export const GetSheets = () => {
  return async (dispatch) => {
    try {
      dispatch({ type: GET_SHEETS_REQUEST });
      const apiIp = process.env.REACT_APP_API_IP;
      const apiPort = process.env.REACT_APP_API_PORT;
      const authorizationToken = localStorage.getItem(ATFXTOKEN);
      const decodedToken = jwtDecode(authorizationToken);
      const response = await axios.get(
        `${apiIp}:${apiPort}${API_SHEET}${decodedToken.id}`,
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
          data = JSON.parse(response.data.sheets);
        } catch (e) {
          data = response.data.sheets;
        }
        dispatch({ type: GET_SHEETS_SUCCESS, payload: data });
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
      dispatch({ type: GET_SHEETS_FAILURE, payload: errorPayload });
      if (errorPayload.message === API_401_RES) {
        dispatch({ type: ISAUTHENTICATED_FAILURE });
      }
    }
  };
};

export const DeleteSheet = (params) => {
  return async (dispatch) => {
    try {
      dispatch({ type: SEL_REQUEST });
      const apiIp = process.env.REACT_APP_API_IP;
      const apiPort = process.env.REACT_APP_API_PORT;
      const authorizationToken = localStorage.getItem(ATFXTOKEN);
      const response = await axios.delete(
        `${apiIp}:${apiPort}${API_DELETE_SHEET}${params}`,

        {
          headers: {
            Authorization: `${authorizationToken}`,
          },
          timeout: GLOBAL_REQUEST_TIMEOUT,
        }
      );

      const status = response.status;

      if (status >= 200 && status < 300) {
        dispatch({ type: SEL_SUCCESS });
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
      dispatch({ type: SEL_FAILURE, payload: errorPayload });
      if (errorPayload.message === API_401_RES) {
        dispatch({ type: ISAUTHENTICATED_FAILURE });
      }
    }
  };
};

export const GetSheetToEditIds = (params) => {
  return async (dispatch) => {
    try {
      if (Number.isInteger(params)) {
        
        dispatch({ type: GET_SHEETTOEDITIDS_REQUEST });
        const apiIp = process.env.REACT_APP_API_IP;
        const apiPort = process.env.REACT_APP_API_PORT;
        const authorizationToken = localStorage.getItem(ATFXTOKEN);
        
        const response = await axios.get(
          `${apiIp}:${apiPort}${API_GET_SHEETTOEDITIDS}${params}`,
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
          dispatch({ type: GET_SHEETTOEDITIDS_SUCCESS, payload: data });
        } else if (status === 401) {
          dispatch({ type: ISAUTHENTICATED_FAILURE });
        } else {
          throw new Error(`Unexpected status code: ${status}`);
        }
      } 

    } catch (error) {
      const errorPayload = {
        message: error.message,
        code: error.code,
      };
      console.log(error)
      dispatch({ type: GET_SHEETTOEDITIDS_FAILURE, payload: errorPayload });
      if (errorPayload.message === API_401_RES) {
        dispatch({ type: ISAUTHENTICATED_FAILURE });
      }
    }
  };
};
