import { useState, type ReactElement } from "react";
import { Icon } from "../icons";
import { Modal } from "../styled-bases";
import { ComponentApiCx, type ContextApiCxProps } from "./_state";
import DateOfBirthModal from "./date-of-birth-modal/+Entry";
import { produce } from "immer";
import Slides from "./Slides";

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
  return <Slides />;
};

const Slide1 = () => (
  <div>
    <div className="mt-lg text-center text-xl font-bold text-[#2F4858]">
      Thanks for showing an interest in one of our events.
    </div>

    <div className="mt-md text-center text-xl text-[#2F4858]">
      The following questions help us get to know a bit about you. We need to
      take some really basic info from you, such as your contact details. This
      means we can get in touch with you so we can discuss getting started - so
      please double-check the details you&apos;re giving us are correct!
    </div>

    <div className="mt-lg flex flex-col items-center">
      <div className="cursor-pointer rounded-sm bg-brandLightOrange px-sm py-xs text-xl font-semibold text-white">
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

const Slide2 = () => (
  <div>
    <div className="mt-lg text-center text-lg  text-[#2F4858]">
      First up, we need you to read and understand our confidentiality
      statement: Anything you talk about with one of our team is kept totally
      private within Birch. We won&apos;t share what you tell us with anyone
      else. But if there was an extreme situation, like if you or someone else
      was at risk of being seriously hurt, then we would need to break
      confidentiality to keep you safe. If this happened we would discuss it
      with you first and do our best to make sure you were involved in any
      decisions that have to be made. We know this can be scary and you might
      not want us to share anything, but we will support you through the whole
      thing.
    </div>

    <div className="mt-lg flex flex-col items-center">
      <div className="cursor-pointer rounded-sm bg-brandLightOrange px-sm py-xs text-xl font-semibold text-white">
        Got it
      </div>
    </div>
  </div>
);

const Slide3 = () => (
  <div>
    <div className="mt-lg text-center text-lg  text-[#2F4858]">
      By signing this form, you are giving us permission to contact you about
      opportunities and events from the Birch Collective. In order to comply
      with the General Data Protection Regulation, The Birch Collective is
      seeking your consent to hold your information on our database. We are
      required by our funders to gather information about the people who use our
      services. We will not share your information with third parties other than
      those you have agreed to. We use and store any information that you give
      us in accordance with the Data Protection Act 2003. Information you
      provide will be anonymised before being used in monitoring and evaluation
      reports for our current funders, to support funding applications. Your
      data will be held for a maximum of 2 years after your last engagement. For
      further details on our data protection and information sharing policies or
      for any queries about the data we hold, please get in touch:
    </div>

    <div className="mt-sm flex items-center justify-center gap-xs text-lg text-[#2F4858]">
      <div className="italic">team@thebirchcollective.co.uk</div>

      <span>or</span>

      <div className="italic">07492923273</div>
    </div>

    <div className="mt-lg flex flex-col items-center">
      <div className="cursor-pointer rounded-sm bg-brandLightOrange px-sm py-xs text-xl font-semibold text-white">
        I understand
      </div>
    </div>
  </div>
);

const SlideName = () => {
  const [name, setName] = useState("");
  const [showError, setShowError] = useState(false);

  const handleSubmit = () => {
    if (!name.length) {
      setShowError(true);

      return;
    }

    // submit
  };

  return (
    <form
      className="mt-lg w-4/5"
      onSubmit={(e) => {
        e.preventDefault();

        handleSubmit();
      }}
    >
      <div>
        <div className="text-lg text-[#2F4858]">1.</div>
        <div className="mt-sm text-xl font-medium text-brandOrange">
          Your full name:
        </div>
        <div className="mt-md">
          <input
            className="w-full border-b border-b-[#2F4858] text-lg text-[#2F4858]"
            value={name}
            onChange={(e) => {
              setName(e.target.value);

              if (showError) {
                setShowError(false);
              }
            }}
            type="text"
            placeholder="Enter full name here"
          />
          <div className="mt-xs flex justify-between">
            {showError ? (
              <p className="text-[#FF8983]">
                Oops...please enter your full name
              </p>
            ) : (
              <span></span>
            )}
            <span className="italic text-gray-500">required</span>
          </div>
        </div>
      </div>

      <div className="mt-lg flex justify-center">
        <button
          className="inline-flex cursor-pointer items-center gap-sm rounded-sm bg-brandLightOrange px-sm py-xs text-xl font-semibold text-white"
          type="submit"
        >
          <span>Ok</span>
          <span>
            <Icon.Success />
          </span>
        </button>
      </div>
    </form>
  );
};

const SlideDateOfBirth = () => {
  const [date, setDate] = useState<Date | null>(null);
  const [showError, setShowError] = useState(false);

  const handleSubmit = () => {
    if (!date) {
      setShowError(true);

      return;
    }

    // submit
  };

  return (
    <form
      className="mt-lg w-full"
      onSubmit={(e) => {
        e.preventDefault();

        handleSubmit();
      }}
    >
      <div>
        <div className="text-lg text-[#2F4858]">2.</div>
        <div className="mt-sm text-xl font-medium text-brandOrange">
          Your date of birth:
        </div>
        <div className="mt-md">
          <DateOfBirthModal
            date={date}
            onChange={setDate}
            button={({ dateStr }) => (
              <div
                className="text-lg text-[#2F4858]"
                onClick={() => {
                  if (!showError) {
                    return;
                  }
                  setShowError(false);
                }}
              >
                {date ? dateStr : "click to select date of birth"}
              </div>
            )}
          />

          {showError ? (
            <p className="mt-xs text-[#FF8983]">
              Oops...please enter your date of birth
            </p>
          ) : null}
        </div>
      </div>

      <div className="mt-lg flex justify-center">
        <button
          className="inline-flex cursor-pointer items-center gap-sm rounded-sm bg-brandLightOrange px-sm py-xs text-xl font-semibold text-white"
          type="submit"
        >
          <span>Ok</span>
          <span>
            <Icon.Success />
          </span>
        </button>
      </div>
    </form>
  );
};

const SlideIdentities = () => {
  const [options, setOptions] = useState([
    {
      label: "working class",
      isSelected: false,
    },

    {
      label: "someone with a disablity",
      isSelected: false,
    },

    {
      label: "male or male identifying",
      isSelected: false,
    },

    {
      label: "care experienced",
      isSelected: false,
    },

    {
      label: "lgbtq+",
      isSelected: false,
    },

    {
      label: "english as a second language",
      isSelected: false,
    },

    {
      label: "black or a person of colours",
      isSelected: false,
    },

    {
      label: "unemployed or not in education or training",
      isSelected: false,
    },

    {
      label: "none of the above",
      isSelected: false,
    },
  ]);

  const [showError, setShowError] = useState(false);

  const handleSubmit = () => {
    const isSelection = options.find((option) => option.isSelected);

    if (!isSelection) {
      setShowError(true);

      return;
    }

    // submit
  };

  return (
    <form
      className="mt-lg w-full"
      onSubmit={(e) => {
        e.preventDefault();

        handleSubmit();
      }}
    >
      <div>
        <div className="text-lg text-[#2F4858]">1.</div>
        <div className="mt-sm text-xl font-medium text-brandOrange">
          Do you identify as any of the following?
        </div>
        <p className="mt-xs text-gray-500">Tick all that apply to you.</p>

        <div className="mt-md">
          <div className="flex flex-col gap-xs text-[#2F4858]">
            {options.map((option) => (
              <div className="flex items-center gap-sm" key={option.label}>
                <div>
                  <input
                    id={option.label}
                    checked={option.isSelected}
                    onChange={(e) => {
                      if (showError) {
                        setShowError(false);
                      }

                      const labelStr = e.currentTarget.id;

                      setOptions((options) => {
                        const updated = produce(options, (draft) => {
                          const index = draft.findIndex(
                            (option) => option.label === labelStr,
                          );

                          if (index < 0) {
                            return;
                          }

                          if (labelStr === "none of the above") {
                            draft.forEach((option, i) => {
                              if (i === index) {
                                return;
                              }
                              option.isSelected = false;
                            });
                          } else {
                            const noneOptionIndex = draft.findIndex(
                              (option) => option.label === "none of the above",
                            );
                            draft[noneOptionIndex].isSelected = false;
                          }

                          draft[index].isSelected = !draft[index].isSelected;
                        });

                        return updated;
                      });
                    }}
                    type="checkbox"
                  />
                </div>
                <label htmlFor={option.label}>{option.label}</label>
              </div>
            ))}
          </div>
          <div className="mt-xs flex justify-between">
            {showError ? (
              <p className="text-[#FF8983]">
                Oops...please select at least one option
              </p>
            ) : (
              <span></span>
            )}
            <span className="italic text-gray-500">required</span>
          </div>
        </div>
      </div>

      <div className="mt-lg flex justify-center">
        <button
          className="inline-flex cursor-pointer items-center gap-sm rounded-sm bg-brandLightOrange px-sm py-xs text-xl font-semibold text-white"
          type="submit"
        >
          <span>Ok</span>
          <span>
            <Icon.Success />
          </span>
        </button>
      </div>
    </form>
  );
};

const SlideTextArea = () => {
  const [text, setText] = useState("");

  const handleSubmit = () => {
    // submit
  };

  return (
    <form
      className="mt-lg w-full"
      onSubmit={(e) => {
        e.preventDefault();

        handleSubmit();
      }}
    >
      <div>
        <div className="text-lg text-[#2F4858]">2.</div>
        <div className="mt-sm text-xl font-medium text-brandOrange">
          Do you consider yourself to have any physical health issues or medical
          conditions? e.g ASD? Asthma? Allergies? <br />
          If yes please provide us with some detail:
        </div>
        <div className="mt-md">
          <textarea
            className="w-full resize-none"
            value={text}
            onChange={(e) => setText(e.currentTarget.value)}
            placeholder="Write here"
          />
        </div>
      </div>

      <div className="mt-lg flex justify-center">
        <button
          className="inline-flex cursor-pointer items-center gap-sm rounded-sm bg-brandLightOrange px-sm py-xs text-xl font-semibold text-white"
          type="submit"
        >
          <span>Ok</span>
          <span>
            <Icon.Success />
          </span>
        </button>
      </div>
    </form>
  );
};
