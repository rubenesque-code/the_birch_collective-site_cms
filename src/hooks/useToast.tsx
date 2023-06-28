import { toast as reactToast } from "react-toastify";
import { Toast } from "~/components/Toast";

export const useToast = () => {
  const toast = {
    neutral(text: string, toastId?: string) {
      reactToast(<Toast type="neutral" text={text} />, { toastId });
    },
    success(text: string) {
      reactToast(<Toast type="success" text={text} />);
    },
    error(text: string) {
      reactToast(<Toast type="error" text={text} />);
    },
    info(text: string) {
      reactToast(<Toast type="info" text={text} />);
    },
  };

  return toast;
};
