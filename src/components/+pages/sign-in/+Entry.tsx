import React from "react";
import { Transition } from "@headlessui/react";
import { GoogleLogo } from "@phosphor-icons/react";
import { useQuery } from "react-query";

import { Icon } from "~/components/icons";
import { Spinner } from "~/components/Spinner";

import { validateEmail } from "~/helpers/form";
import fbAuth from "~/my-firebase/auth";
import fbFunctions from "~/my-firebase/functions";
import { localStorage } from "~/static-data";
import type { AuthPersistence } from "~/types/auth";

const SignInPage = () => (
  <div className="grid h-screen place-items-center">
    <div>
      <div className="flex flex-col items-center">
        <h1 className="font-display text-6xl font-bold tracking-wider text-brandLightOrange">
          The Birch Collective
        </h1>
        <div className="mt-xl flex flex-col items-start rounded-lg border p-md">
          <div className="border-b pb-sm">
            <p className="text-gray-300">Content Managment System</p>

            <h2 className="mt-xs font-serif text-xl tracking-wide text-gray-700">
              Sign in
            </h2>
          </div>

          <div className="mt-lg">
            <SignInForm />
          </div>
        </div>
      </div>

      <div className="mt-sm pl-xl">
        <div className="flex items-center text-lg leading-none text-gray-300">
          <span className="text-blue-300">
            <GoogleLogo />
          </span>
          <span className="tracking-wide">oogle</span>
        </div>
        <p className="pl-md text-sm text-gray-300">Authentication</p>
      </div>
    </div>
  </div>
);

export default SignInPage;

const SignInForm = () => {
  const [email, setEmail] = React.useState("");
  const [staySignedIn, setStaySignedIn] = React.useState(false);

  const [showEmailError, setShowEmailError] = React.useState(false);

  const [showLinkSentPopup, setShowLinkSentPopup] = React.useState(false);

  const { refetch: checkIsAdmin, isFetching: isFetchingAdminCheck } = useQuery(
    ["is-admin", email],
    () => fbFunctions.auth.checkIsAdmin(email),
    {
      enabled: false,
    },
  );

  const onSendSignInLinkSubmit = async () => {
    const isValidEmail = validateEmail(email);

    if (!isValidEmail) {
      setShowEmailError(true);
      return;
    }

    const isAdminQueryRes = await checkIsAdmin();

    if (isAdminQueryRes.data?.isAdmin) {
      const authPersistence: AuthPersistence = staySignedIn
        ? "local"
        : "session";

      fbAuth.mutate.sendSignInLinkToEmail({ email });

      window.localStorage.setItem(
        localStorage.keys.auth_persistence,
        authPersistence,
      );

      window.localStorage.setItem(localStorage.keys.email_signin, email);

      setShowLinkSentPopup(true);
    } else {
      setShowEmailError(true);
    }
  };

  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();

          void onSendSignInLinkSubmit();
        }}
        className={`relative mt-md flex flex-col`}
      >
        <fieldset disabled={isFetchingAdminCheck}>
          <div className="relative">
            <EmailInput
              onChange={(email) => {
                setEmail(email);

                if (showEmailError) {
                  setShowEmailError(false);
                }
              }}
              value={email}
            />

            <p
              className={`absolute -bottom-xs mt-xs translate-y-full text-my-error-content transition-opacity ease-in-out ${
                showEmailError ? "opacity-100" : "opacity-0"
              }`}
            >
              Invalid email
            </p>
          </div>

          <StaySignedInCheckbox
            setValue={setStaySignedIn}
            value={staySignedIn}
          />

          <button className="my-btn my-btn-neutral mt-md" type="submit">
            Submit
          </button>
        </fieldset>
      </form>

      <CheckingAuthStatusPopup open={isFetchingAdminCheck} />

      <EmailLinkSentPopup email={email} open={showLinkSentPopup} />
    </>
  );
};

const emailInputId = "email-inputId";

const EmailInput = ({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) => (
  <div>
    <label className={`text-gray-400`} htmlFor={emailInputId}>
      Email
    </label>
    <input
      className={`w-full rounded-md border border-gray-300 px-sm pb-1 pt-2 text-gray-700 outline-none focus:outline-none`}
      id={emailInputId}
      value={value}
      onChange={(e) => {
        onChange(e.target.value);
      }}
      type="text"
      placeholder="Enter email"
    />
  </div>
);

const staySignedInCheckboxId = "stay-signed-in-checkbox";

const StaySignedInCheckbox = ({
  setValue,
  value,
}: {
  value: boolean;
  setValue: (staySignedIn: boolean) => void;
}) => (
  <div className={`mt-xs flex items-center justify-end gap-xs `}>
    <label className={`text-sm text-gray-400`} htmlFor={staySignedInCheckboxId}>
      Stay signed in
    </label>
    <input
      id={staySignedInCheckboxId}
      checked={value}
      onChange={(e) => {
        const isChecked = e.target.checked;
        setValue(isChecked);
      }}
      type="checkbox"
    />
  </div>
);

const CheckingAuthStatusPopup = ({ open }: { open: boolean }) => (
  <>
    <Transition
      show={open}
      as="div"
      className="fixed inset-0 left-0 top-0 z-50 grid place-items-center"
      enter="transition duration-300 ease-out"
      enterFrom="transform opacity-0"
      enterTo="transform opacity-100"
      leave="transition duration-500 ease-out"
      leaveFrom="transform opacity-100"
      leaveTo="transform opacity-0"
    >
      <div
        className={`flex flex-col items-center rounded-xl bg-white/40 p-3xl shadow-lg`}
      >
        <Spinner />
        <p className={`mt-sm`}>Checking status...</p>
      </div>
    </Transition>
    <Transition
      as="div"
      show={open}
      className="fixed inset-0 z-40 bg-white/60"
      enter="transition duration-300 ease-out"
      enterFrom="transform opacity-0"
      enterTo="transform opacity-100"
      leave="transition duration-300 ease-out"
      leaveFrom="transform opacity-100"
      leaveTo="transform opacity-0"
    />
  </>
);

const EmailLinkSentPopup = ({
  email,
  open,
}: {
  open: boolean;
  email: string;
}) => (
  <>
    <Transition
      show={open}
      as="div"
      className="fixed inset-0 left-0 top-0 z-50 grid place-items-center"
      enter="transition duration-300 ease-out"
      enterFrom="transform opacity-0"
      enterTo="transform opacity-100"
      leave="transition duration-500 ease-out"
      leaveFrom="transform opacity-100"
      leaveTo="transform opacity-0"
    >
      <div className={`relative rounded-xl bg-white p-3xl shadow-lg`}>
        {/* <div className="absolute right-sm top-sm flex items-center  gap-xs text-gray-300">
          <span className="text-base text-gray-300">
            <Icon.Lock />
          </span>
          <span className="font-mono text-xs">secure authentication</span>
        </div> */}
        <div className="flex flex-col items-center">
          <p className={`flex justify-center text-3xl text-green-400`}>
            <Icon.Success weight="bold" />
          </p>
          <p className="mt-xs text-gray-400">Email accepted</p>
        </div>
        <p className={`mt-md`}>
          A sign in link has been sent to{" "}
          <span className={`font-medium`}>{email}</span>.
        </p>
        <div className={`mt-xl flex flex-col text-gray-600`}>
          <span>
            Note, the sign in link usually arrives immediately <br /> but can
            take up to 10 minutes to arrive.
          </span>

          <span className="mt-xs">Also, please check your spam folder.</span>
        </div>
        <p className="mt-md text-gray-600">You can close this page.</p>
      </div>
    </Transition>
    <Transition
      as="div"
      show={open}
      className="fixed inset-0 z-40 bg-overlayDark"
      enter="transition duration-300 ease-out"
      enterFrom="transform opacity-0"
      enterTo="transform opacity-100"
      leave="transition duration-300 ease-out"
      leaveFrom="transform opacity-100"
      leaveTo="transform opacity-0"
    />
  </>
);
