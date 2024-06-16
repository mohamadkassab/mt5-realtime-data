import axios from "axios";
import {
  API_SHEET,
  ATFXTOKEN,
  GLOBAL_REQUEST_TIMEOUT,
  API_401_RES,
} from "../../constants/Constants";
import {
    GET_SHEET_REQUEST,
    GET_SHEET_SUCCESS,
    GET_SHEET_FAILURE,
    SEL_REQUEST,
    SEL_SUCCESS,
    SEL_FAILURE,
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

  export const GetSheets = () => {
    return async (dispatch) => {
      try {
        dispatch({ type: GET_SHEET_REQUEST });
        const apiIp = process.env.REACT_APP_API_IP;
        const apiPort = process.env.REACT_APP_API_PORT;
        const authorizationToken = localStorage.getItem(ATFXTOKEN);
  
        const response = await axios.get(`${apiIp}:${apiPort}${API_SHEET}`, {
          headers: {
            Authorization: `${authorizationToken}`,
          },
          timeout: GLOBAL_REQUEST_TIMEOUT,
        });
  
        const status = response.status;
        if (status >= 200 && status < 300) {
          let data;
          try {
            data = JSON.parse(response.data);
          } catch (e) {
            data = response.data;
          }
          dispatch({ type: GET_SHEET_SUCCESS, payload: data });
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
        dispatch({ type: GET_SHEET_FAILURE, payload: errorPayload });
        if(errorPayload.message === API_401_RES){
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
          `${apiIp}:${apiPort}${API_SHEET}${params}`,
  
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
        if(errorPayload.message === API_401_RES){
          dispatch({ type: ISAUTHENTICATED_FAILURE });
        }
        
      }
    };
  };