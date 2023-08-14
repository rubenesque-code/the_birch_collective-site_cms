import { TextAreaForm, TextInputForm } from "~/components/forms";
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
      <div className="font-display text-3xl font-bold tracking-wider text-brandGreen">
        <TextInputForm
          localStateValue={signUp.heading}
          input={{
            placeholder: "Sign up heading",
          }}
          onSubmit={signUpAction.heading}
          tooltip="Click to edit sign up heading"
          key={undoKey}
        />
      </div>

      <div className="custom-prose prose mt-sm w-full max-w-full">
        <TextAreaForm
          localStateValue={signUp.text}
          textArea={{
            placeholder: "Sign up text",
          }}
          onSubmit={signUpAction.text}
          tooltip="Click to edit tickets text"
          key={undoKey}
        />
      </div>

      <div className="mt-md inline-flex cursor-pointer items-center gap-sm rounded-lg bg-brandGreen px-sm py-xs text-white">
        <TextInputForm
          localStateValue={signUp.buttonText}
          input={{
            placeholder: "Sign up form button text",
          }}
          onSubmit={signUpAction.buttonText}
          tooltip="Click to edit sign up form button text"
          key={undoKey}
        />
      </div>
    </div>
  );
};

export default SignUp;
