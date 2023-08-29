import { useEffect } from "react";
import Router from "next/router";
import { useBeforeUnload } from "react-use";

export const useLeavePageConfirm = ({
  runConfirmationOn,
  message = "Leave page? You will lose any unsaved changes!",
  onLeavePage,
}: {
  runConfirmationOn: boolean;
  message?: string;
  onLeavePage?: () => void;
}): void => {
  // * below works for closing tab, etc.
  useBeforeUnload(runConfirmationOn, message);

  // * below works for changing routes
  useEffect(() => {
    const handler = () => {
      if (runConfirmationOn && !window.confirm(message)) {
        throw "Route Canceled";
      }

      onLeavePage && onLeavePage();
    };

    Router.events.on("routeChangeStart", handler);

    return () => {
      Router.events.off("routeChangeStart", handler);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [runConfirmationOn, message]);
};
