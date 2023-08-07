import { toast } from "react-toastify";

// FIXME: EMERGING-143 remove it and use Manitne

export const infoToast = (message: string): void => {
  toast.info(message, {
    className: "infoToast",
  });
};

export const successToast = (message: string): void => {
  toast.success(message, {
    className: "successToast",
  });
};

export const errorToast = (message: string): void => {
  toast.error(message, {
    className: "errorToast",
  });
};

export const warningToast = (message: string): void => {
  toast.warning(message, {
    className: "warningToast",
  });
};
