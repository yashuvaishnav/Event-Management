// Toastify.js
import React from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/ReactToastify.min.css";

const showToast = (message, type) => {
  toast(message, { type });
};

export const Toastify = () => {
  return <ToastContainer position="bottom-left" newestOnTop />;
};

export const showSuccessToast = (message) => showToast(message, "success");
export const showErrorToast = (message) => showToast(message, "error");
