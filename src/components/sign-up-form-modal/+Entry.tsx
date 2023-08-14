import { type ReactElement } from "react";
import { Modal } from "../styled-bases";
import { ComponentApiCx, type ContextApiCxProps } from "./_state";
import { Icon } from "../icons";

const SignUpFormModal = ({
  button,
  ...contextProps
}: {
  button: (arg0: { openModal: () => void }) => ReactElement;
} & ContextApiCxProps) => {
  return (
    <ComponentApiCx.Provider {...contextProps}>
      <Modal.WithVisibilityProvider
        button={button}
        panelContent={
          <div className="relative grid max-h-[70vh] w-[90vw] max-w-[1200px] place-items-center rounded-2xl border-4  border-orange bg-white p-xl text-left shadow-xl">
            <SignUpForm />
          </div>
        }
      />
    </ComponentApiCx.Provider>
  );
};

export default SignUpFormModal;

const SignUpForm = () => {
  return (
    <div className="max-w-[620px]">
      <div className="mt-xs text-center font-display text-5xl font-bold tracking-wide text-orangeLight">
        Birch Events
      </div>
      <div className="mt-lg text-center text-xl font-bold text-[#2F4858]">
        Thanks for showing an interest in one of our events.
      </div>

      <div className="mt-md text-center text-xl text-[#2F4858]">
        The following questions help us get to know a bit about you. We need to
        take some really basic info from you, such as your contact details. This
        means we can get in touch with you so we can discuss getting started -
        so please double-check the details you&apos;re giving us are correct!
      </div>

      <div className="mt-lg flex flex-col items-center">
        <div className="rounded-sm bg-brandLightOrange px-sm py-xs text-xl font-semibold text-white">
          Start
        </div>

        <div className="mt-sm flex items-center gap-xxs text-sm text-gray-500">
          <span>
            <Icon.Time />
          </span>
          <span>Takes 2 minutes</span>
        </div>
      </div>
    </div>
  );
};
