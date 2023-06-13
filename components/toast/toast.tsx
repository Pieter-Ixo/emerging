import { toast, ToastContainer as Toast } from 'react-toastify';

export function ToastContainer() {
  return <Toast autoClose={3000} hideProgressBar limit={5} />;
}

export const infoToast = (message: string): void => {
  toast.info(message, {
    className: 'infoToast',
  });
};

export const successToast = (message: string): void => {
  toast.success(message, {
    className: 'successToast',
  });
};

export const errorToast = (message: string): void => {
  toast.error(message, {
    className: 'errorToast',
  });
};

export const warningToast = (message: string): void => {
  toast.warning(message, {
    className: 'warningToast',
  });
};
