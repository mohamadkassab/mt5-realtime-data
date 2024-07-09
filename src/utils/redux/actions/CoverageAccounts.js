import axios from "axios";
import {
  API_COVERAGEACCOUNTS,
  ATFXTOKEN,
  GLOBAL_REQUEST_TIMEOUT,
  API_401_RES,
} from "../../constants/Constants";
import {
  GET_COVERAGEACCOUNTS_REQUEST,
  GET_COVERAGEACCOUNTS_SUCCESS,
  GET_COVERAGEACCOUNTS_FAILURE,
  ISAUTHENTICATED_FAILURE,
} from "../ActionTypes";

export const GetCoverageAccounts = () => {
  return async (dispatch) => {
    try {
      dispatch({ type: GET_COVERAGEACCOUNTS_REQUEST });
      const apiIp = process.env.REACT_APP_API_IP;
      const apiPort = process.env.REACT_APP_API_PORT;
      const authorizationToken = localStorage.getItem(ATFXTOKEN);
      const response = await axios.get(
        `${apiIp}:${apiPort}${API_COVERAGEACCOUNTS}`,
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

        dispatch({ type: GET_COVERAGEACCOUNTS_SUCCESS, payload: data });
      } else if (status === 401) {
        dispatch({ type: ISAUTHENTICATED_FAILURE });
      } else {
        throw new Error(`Unexpected status code: ${status}`);
      }
    } catch (e) {
      const errorPayload = {
        message: e.message,
        code: e.code,
      };
      dispatch({ type: GET_COVERAGEACCOUNTS_FAILURE, payload: errorPayload });
      if (errorPayload.message === API_401_RES) {
        dispatch({ type: ISAUTHENTICATED_FAILURE });
      }
    }
  };
};
