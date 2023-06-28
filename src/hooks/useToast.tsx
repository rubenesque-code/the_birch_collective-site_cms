import { toast } from "react-toastify";
import { Toast } from "~/components/Toast";

export const useToast = () => {
  const myToast = {
    success(text: string) {
      toast(<Toast type="success" text={text} />);
    },
    error(text: string) {
      toast(<Toast type="error" text={text} />);
    },
    info(text: string) {
      toast(<Toast type="info" text={text} />);
    },
  };

  return myToast;
};
