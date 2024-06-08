import axios from "axios";
import {
  API_ADMIN_LOGIN,
  ATFXTOKEN,
  GLOBAL_REQUEST_TIMEOUT,
} from "../../constants/Constants";
import {
  EL_REQUEST,
  EL_SUCCESS,
  EL_FAILURE,
  ISAUTHENTICATED_SUCCESS,
  ISAUTHENTICATED_FAILURE,
} from "../ActionTypes";

export const SignIn = (credentials) => {
  return async (dispatch) => {
    try {
      dispatch({ type: EL_REQUEST });
      const apiIp = process.env.REACT_APP_API_IP;
      const apiPort = process.env.REACT_APP_API_PORT;

      const response = await axios.post(
        `${apiIp}:${apiPort}${API_ADMIN_LOGIN}`,
        credentials,
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          timeout: GLOBAL_REQUEST_TIMEOUT,
        }
      );
      const data = response.data;
      localStorage.setItem(
        ATFXTOKEN,
        `${data.token_type} ${data.access_token}`
      );

      const status = response.status;
      if (status >= 200 && status < 300) {
        dispatch({ type: EL_SUCCESS });
        dispatch({ type: ISAUTHENTICATED_SUCCESS });
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
      localStorage.removeItem(ATFXTOKEN);
      dispatch({ type: ISAUTHENTICATED_FAILURE });
      dispatch({ type: EL_FAILURE, payload: errorPayload });
    }
  };
};

export const SignOut = () => {
  return async (dispatch) => {
    try {
      dispatch({ type: EL_REQUEST });

      localStorage.removeItem(ATFXTOKEN);
      dispatch({ type: ISAUTHENTICATED_FAILURE });
      dispatch({ type: EL_SUCCESS });
    } catch (error) {
      const errorPayload = {
        message: error.message,
        code: error.code,
      };

      dispatch({ type: EL_FAILURE, payload: errorPayload });
    }
  };
};
