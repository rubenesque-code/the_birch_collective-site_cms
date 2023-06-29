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
    promise(
      asyncFunc: () => Promise<void>,
      messages: { pending: string; success: string; error: string },
    ) {
      void reactToast.promise(async () => await asyncFunc(), {
        pending: {
          render: () => <Toast type="neutral" text={messages.pending} />,
          icon: false,
        },
        success: {
          render: () => <Toast type="neutral" text={messages.success} />,
          icon: false,
          delay: 500,
        },
        error: {
          render: () => <Toast type="error" text={messages.error} />,
          icon: false,
          delay: 500,
        },
      });
    },
  };

  return toast;
};
