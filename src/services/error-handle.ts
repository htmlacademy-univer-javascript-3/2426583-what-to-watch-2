import {toast} from 'react-toastify';

export const errorHandle = (message: string): void => {
  toast.warn(message);
};
