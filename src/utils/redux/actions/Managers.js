import axios from "axios";
import {
  API_MANAGER,
  ATFXTOKEN,
  GLOBAL_REQUEST_TIMEOUT,
  API_401_RES
} from "../../constants/Constants";
import {
  GET_MANAGER_REQUEST,
  GET_MANAGER_SUCCESS,
  GET_MANAGER_FAILURE,
  ISAUTHENTICATED_FAILURE,
} from "../ActionTypes";


export const GetManagers = () => {
  return async (dispatch) => {
    try {
      dispatch({ type: GET_MANAGER_REQUEST });
      const apiIp = process.env.REACT_APP_API_IP;
      const apiPort = process.env.REACT_APP_API_PORT;
      const authorizationToken = localStorage.getItem(ATFXTOKEN);
      const response = await axios.get(`${apiIp}:${apiPort}${API_MANAGER}`, {
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
        dispatch({ type: GET_MANAGER_SUCCESS, payload: data});
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
      dispatch({ type: GET_MANAGER_FAILURE, payload: errorPayload });
      if(errorPayload.message === API_401_RES){
        dispatch({ type: ISAUTHENTICATED_FAILURE });
      }
      
    }
  };
};



