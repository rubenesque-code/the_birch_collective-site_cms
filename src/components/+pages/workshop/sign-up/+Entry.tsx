import EmailNotificationModal from "~/components/email-notification-modal/+Entry";
import { TextAreaForm, TextInputForm } from "~/components/forms";
import { Icon } from "~/components/icons";
import CmsLayout from "~/components/layouts/Cms";

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
    <div className="group/sign-up">
      <CmsLayout.EditBar className="opacity-40 group-hover/sign-up:opacity-80 hover:!opacity-100">
        <EmailNotificationModal
          button={({ openModal }) => (
            <CmsLayout.EditBar.Button
              icon={<Icon.EmailNotify />}
              text="Email"
              onClick={openModal}
              tooltip="Edit notified emails on sign up"
            />
          )}
          currentEmails={signUp.notifyEmails}
          onRemove={signUpAction.notifyEmails.remove}
          onSelect={signUpAction.notifyEmails.add}
        />
      </CmsLayout.EditBar>

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
        <div className="flex items-center gap-xs rounded-lg bg-orange px-sm py-xs font-display text-2xl text-white">
          <div>
            <Icon.SignUp />
          </div>

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
