import React from "react";
import { Transition } from "@headlessui/react";
import { GoogleLogo } from "@phosphor-icons/react";
import { useQuery } from "react-query";

import { Spinner } from "~/components/Spinner";

import { validateEmail } from "~/helpers/form";
import fbAuth from "~/my-firebase/auth";
import fbFunctions from "~/my-firebase/functions";
import type { AuthPersistence } from "~/types/auth";

const SignInPage = () => (
  <div className="grid h-screen place-items-center">
    <div>
      <div className="flex flex-col items-center">
        <h1 className="font-display text-6xl font-bold tracking-wider text-brandLightOrange">
          The Birch Collective
        </h1>
        <div className="mt-xl flex flex-col items-start rounded-lg border p-md">
          <div className="w-full border-b pb-sm">
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
  const [password, setPassword] = React.useState("");
  const [staySignedIn, setStaySignedIn] = React.useState(false);

  const [showCredentialsError, setShowCredentialsError] = React.useState(false);

  const authPersistence: AuthPersistence = staySignedIn ? "local" : "session";

  const { refetch: signInWithEmailAndPassword, isFetching: isFetchingSignIn } =
    useQuery(
      "sign-in",
      async () => {
        const isValidEmail = validateEmail(email);

        if (!isValidEmail) {
          setShowCredentialsError(true);
          return;
        }

        const isAdmin = await fbFunctions.auth.checkIsAdmin(email);
        console.log("isAdmin:", isAdmin);

        if (!isAdmin) {
          setShowCredentialsError(true);
          return;
        }

        const signInRes = await fbAuth.mutate.signInWithEmailAndPassword({
          authPersistence,
          email,
          password,
        });
        console.log("signInRes:", signInRes);

        if (signInRes === "invalid") {
          setShowCredentialsError(true);
          return;
        }
      },
      {
        enabled: false,
      },
    );

  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();

          void signInWithEmailAndPassword();
        }}
        className={`relative mt-md flex flex-col`}
      >
        <fieldset disabled={isFetchingSignIn}>
          <div className="relative">
            <EmailInput
              onChange={(email) => {
                setEmail(email);

                if (showCredentialsError) {
                  setShowCredentialsError(false);
                }
              }}
              value={email}
            />

            <div className="mt-xs">
              <PasswordInput
                onChange={(password) => {
                  setPassword(password);

                  if (showCredentialsError) {
                    setShowCredentialsError(false);
                  }
                }}
                value={password}
              />
            </div>

            <p
              className={`absolute -bottom-xs mt-xs translate-y-full text-my-error-content transition-opacity ease-in-out ${
                showCredentialsError ? "opacity-100" : "opacity-0"
              }`}
            >
              Invalid credentials
            </p>
          </div>

          <StaySignedInCheckbox
            setValue={setStaySignedIn}
            value={staySignedIn}
          />

          <button
            className="mt-md rounded-md bg-[#599483] px-[0.75rem] py-xxs text-sm font-medium text-white transition-colors ease-in-out hover:bg-[#6BB188]"
            type="submit"
          >
            Submit
          </button>
        </fieldset>
      </form>

      <CheckingCredentialsPopup open={isFetchingSignIn} />
    </>
  );
};

const email_input_id = "email-input-id";

const EmailInput = ({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) => (
  <div>
    <label className={`text-gray-400`} htmlFor={email_input_id}>
      Email
    </label>
    <input
      className={`w-full rounded-md border border-gray-300 px-sm pb-1 pt-2 text-gray-700 outline-none focus:outline-none`}
      id={email_input_id}
      value={value}
      onChange={(e) => {
        onChange(e.target.value);
      }}
      type="text"
      placeholder="Enter email"
    />
  </div>
);

const password_input_id = "password-input-id";

const PasswordInput = ({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) => {
  const [passwordIsShowing, setShowPassword] = React.useState(false);

  return (
    <div>
      <label className={`text-gray-400`} htmlFor={password_input_id}>
        Password
      </label>

      <div className="relative">
        <input
          className={`w-full rounded-md border border-gray-300 px-sm pb-1 pt-2 text-gray-700 outline-none focus:outline-none ${
            passwordIsShowing ? "font-mono text-sm" : ""
          }`}
          id={password_input_id}
          value={value}
          onChange={(e) => {
            onChange(e.target.value);
          }}
          type={passwordIsShowing ? "text" : "password"}
          placeholder="Enter password"
        />

        <div
          className="absolute right-xxs top-1/2 z-10 -translate-y-1/2 cursor-pointer rounded-lg border bg-white/30 px-xxs text-xs text-gray-500 transition-colors ease-in-out hover:bg-gray-100"
          onClick={() => setShowPassword(!passwordIsShowing)}
        >
          {passwordIsShowing ? "hide" : "show"}
        </div>
      </div>
    </div>
  );
};

const staySignedInCheckboxId = "stay-signed-in-checkbox";

const StaySignedInCheckbox = ({
  setValue,
  value,
}: {
  value: boolean;
  setValue: (staySignedIn: boolean) => void;
}) => (
  <div className={`mt-xs flex  items-center justify-end gap-xs`}>
    <label
      className={`cursor-pointer text-sm text-gray-400`}
      htmlFor={staySignedInCheckboxId}
    >
      Stay signed in
    </label>
    <input
      className="cursor-pointer"
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

const CheckingCredentialsPopup = ({ open }: { open: boolean }) => (
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
        <p className={`mt-sm`}>Checking credentials</p>
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
