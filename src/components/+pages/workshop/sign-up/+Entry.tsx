import { WithTooltip } from "~/components/WithTooltip";
import { TextAreaForm, TextInputForm } from "~/components/forms";
import { Icon } from "~/components/icons";
import SignUpFormModal from "~/components/sign-up-form-modal/+Entry";
import { UedCx } from "~/context/user-editable-data";

const SignUp = () => {
  const {
    store: {
      data: { signUp },
      actions: { signUp: signUpAction },
    },
    revision: { undoKey },
  } = UedCx.Pages.Workshop.use();

  return (
    <div className="">
      <div className="text-center font-display text-5xl text-brandLightOrange">
        <TextInputForm
          localStateValue={signUp.heading}
          input={{
            placeholder: "Sign up heading",
            styles: "text-center tracking-wider font-bold",
          }}
          onSubmit={signUpAction.heading}
          tooltip="Click to edit sign up heading"
          key={undoKey}
        />
      </div>

      <div className="custom-prose prose mt-xs w-full max-w-full text-center">
        <TextAreaForm
          localStateValue={signUp.text}
          textArea={{
            placeholder: "Sign up text",
            styles: "text-center",
          }}
          onSubmit={signUpAction.text}
          tooltip="Click to edit tickets text"
          key={undoKey}
        />
      </div>

      <div className="mt-lg flex justify-center">
        <div className="flex  items-center gap-xs rounded-lg bg-orange px-sm py-xs font-display text-2xl text-white">
          <SignUpFormModal
            button={({ openModal }) => (
              <WithTooltip text="click to open sign up form">
                <div className="cursor-pointer" onClick={openModal}>
                  <Icon.SignUp />
                </div>
              </WithTooltip>
            )}
          />

          <TextInputForm
            localStateValue={signUp.buttonText}
            input={{
              placeholder: "Sign up form button text",
              styles: "tracking-wide font-bold",
            }}
            onSubmit={signUpAction.buttonText}
            tooltip="Click to edit sign up form button text"
            key={undoKey}
          />
        </div>
      </div>
    </div>
  );
};

export default SignUp;
