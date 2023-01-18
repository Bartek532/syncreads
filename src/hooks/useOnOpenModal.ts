import { useEffect } from "react";

export const useOnOpenModal = (isOpen: boolean, callback: () => void) => {
  useEffect(() => {
    if (isOpen) {
      callback();
    }
  }, [callback, isOpen]);
};
