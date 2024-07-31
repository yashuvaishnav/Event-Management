import axios from "axios";
import { GET_ADMIN_FAILURE, GET_ADMIN_REQUEST, GET_ADMIN_SUCCESS } from "./actionTypes";

const getAdminRequest = () => {
  return { type: GET_ADMIN_REQUEST };
};
const getAdminError = () => {
  return { type: GET_ADMIN_FAILURE };
};

export const getAdminData = () => (dispatch) => {
  dispatch(getAdminRequest());
  axios
    .get(`http://localhost:8080/admin`)
    .then((res) => {
      dispatch({ type: GET_ADMIN_SUCCESS, payload: res.data[0] });
    })
    .catch((err) => {
      dispatch(getAdminError());
    });
};

export const postSignUpData = (adminSignup, showErrorToast, showSuccessToast, navigate) => (dispatch) => {
  
    axios
      .post(`http://localhost:8080/admin/signup`, adminSignup)
      .then((res) => {
        showSuccessToast(res.data.msg);
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      })
      .catch((err) => {
        showErrorToast(err.response.data.msg);
      });
};

export const postLoginData = (adminLogin, showErrorToast, showSuccessToast, navigate) => (dispatch) => {
  
  axios
    .post(`http://localhost:8080/admin/login`, adminLogin)
    .then((res) => {
      showSuccessToast(res.data.msg);
      localStorage.setItem('token', res.data.token);
      setTimeout(() => {
        navigate("/");
      }, 2000);
    })
    .catch((err) => {
      showErrorToast(err.response.data.msg);
    });
};

export const Logout = (showSuccessToast,showErrorToast,navigate) => (dispatch) => {
  
  axios
    .post(`http://localhost:8080/admin/logout`)
    .then((res) => {
      showSuccessToast(res.data.msg);
      setTimeout(() => {
        navigate("/");
      }, 2000);
    })
    .catch((err) => {
      showErrorToast(err.response.data.msg);
    });
};

  