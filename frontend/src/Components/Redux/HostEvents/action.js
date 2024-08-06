import axios from "axios";

export const postEventData =
  (hostEventData, showSuccessToast, showErrorToast, navigate) => (dispatch) => {
    axios
      .post(`http://localhost:8080/events/event`, hostEventData)
      .then((res) => {
        showSuccessToast(res.data.msg);
        setTimeout(() => {
          navigate("/adminDashboard");
        }, 2000);
      })
      .catch((err) => {
        showErrorToast("Not Added Event");
      });
  };
