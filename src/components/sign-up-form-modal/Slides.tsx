import "swiper/css";

import React, { useEffect } from "react";
import type { Swiper as SwiperType } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

import { isFinite } from "lodash";
import { useQuery } from "react-query";
import { useImmer, type Updater } from "use-immer";
import { Icon } from "~/components/icons";
import { validateEmail, validatePhoneNumber } from "~/helpers/form";
import { myDb } from "~/my-firebase/firestore";
import { WithTooltip } from "../WithTooltip";

// todo: should probs place error message beside the submit form
// todo: on site, will have to validate programmes + workshops
// todo: if no events, need to skip slide. Will affect number

type DateOfBirth = { day: number; month: number; year: number };
type EmergencyContact = {
  name: string;
  phoneNumber: string;
  relationship: string;
};
type Identity = {
  label: string;
  isSelected: boolean;
};
type Gender = {
  label: string;
  isSelected: boolean;
};
type Event = {
  name: string;
  isSelected: boolean;
};
type Sources = {
  entries: {
    label: string;
    isSelected: boolean;
  }[];
  medicalProDetails: string;
  otherDetails: string;
};

const Slides = () => {
  const [swiper, setSwiper] = React.useState<SwiperType | null>(null);
  const [currentSlideIndex, setCurrentSlideIndex] = React.useState(0);

  const [numViewedSlides, setNumViewedSlides] = React.useState(1);

  const [name, setName] = React.useState("");
  const [dateOfBirth, setDateOfBirth] = useImmer({
    day: 0,
    month: 0,
    year: 2000,
  });
  const [email, setEmail] = React.useState("");
  const [phoneNumber, setPhoneNumber] = React.useState("");
  const [emergencyContact, setEmergencyContact] = useImmer({
    name: "",
    phoneNumber: "",
    relationship: "",
  });
  const [identities, setIdentities] = useImmer([
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
  const [ethnicity, setEthnicity] = React.useState("");
  const [genders, setGenders] = useImmer([
    {
      label: "girl/woman/female",
      isSelected: false,
    },

    {
      label: "bay/man/male",
      isSelected: false,
    },

    {
      label: "non-binary",
      isSelected: false,
    },

    {
      label: "queer",
      isSelected: false,
    },

    {
      label: "other",
      isSelected: false,
    },

    {
      label: "prefer not to say",
      isSelected: false,
    },
  ]);
  const [healthIssues, setHealthIssues] = React.useState("");
  const [lifeSavingMedications, setLifeSavingMedications] = React.useState("");
  const [events, setEvents] = useImmer<Event[]>([]);
  const [hopeToGet, setHopeToGet] = React.useState("");
  const [sources, setSources] = useImmer<Sources>({
    entries: [
      {
        label: "The Birch Collective social media",
        isSelected: false,
      },
      {
        label: "Other social media",
        isSelected: false,
      },
      {
        label: "Web search",
        isSelected: false,
      },
      {
        label: "Teacher",
        isSelected: false,
      },
      {
        label: "GP or other medical professional",
        isSelected: false,
      },
      {
        label: "Friend",
        isSelected: false,
      },
      {
        label: "Parent or carer",
        isSelected: false,
      },
      {
        label: "Other",
        isSelected: false,
      },
    ],
    medicalProDetails: "",
    otherDetails: "",
  });
  const [receiveNewsLetter, setReceiveNewsLetter] = React.useState<
    boolean | null
  >(null);
  const [imagePermission, setImagePermission] = React.useState<boolean | null>(
    null,
  );

  const [showErrorMessage, setShowErrorMessage] = React.useState(false);

  const programmesQuery = useQuery("programmes", myDb.programme.fetchAll);
  const workshopsQuery = useQuery("workshops", myDb.workshop.fetchAll);

  useEffect(() => {
    if (
      programmesQuery.isError ||
      !programmesQuery.data ||
      workshopsQuery.isError ||
      !workshopsQuery.data ||
      events.length
    ) {
      return;
    }

    const programmes = programmesQuery.data
      .filter((programme) => programme.title.length)
      .map((programme) => ({
        name: programme.title,
        isSelected: false,
      }));

    const workshops = workshopsQuery.data
      .filter((workshop) => workshop.type === "free" && workshop.title.length)
      .map((workshop) => ({
        name: workshop.title,
        isSelected: false,
      }));

    setEvents([...programmes, ...workshops]);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [programmesQuery, workshopsQuery]);

  const numSlides = 19;

  const handleSubmitSlide = (input: { onGoToSlide: () => void }) => {
    if (currentSlideIndex < 3) {
      input.onGoToSlide();
      return;
    }

    if (currentSlideIndex === 3) {
      if (!name.length) {
        setShowErrorMessage(true);
        return;
      }
      input.onGoToSlide();
    }

    if (currentSlideIndex === 4) {
      if (
        dateOfBirth.day < 1 ||
        dateOfBirth.day > 31 ||
        dateOfBirth.month < 1 ||
        dateOfBirth.month > 12 ||
        dateOfBirth.year < 1900 ||
        dateOfBirth.year > 3000
      ) {
        setShowErrorMessage(true);
        return;
      }
      input.onGoToSlide();
    }

    if (currentSlideIndex === 5) {
      if (!validateEmail(email)) {
        setShowErrorMessage(true);
        return;
      }
      input.onGoToSlide();
    }

    if (currentSlideIndex === 6) {
      if (!validatePhoneNumber(phoneNumber)) {
        setShowErrorMessage(true);
        return;
      }
      input.onGoToSlide();
    }

    if (currentSlideIndex === 7) {
      input.onGoToSlide();
    }

    if (currentSlideIndex === 8) {
      if (!identities.find((option) => option.isSelected)) {
        setShowErrorMessage(true);
        return;
      }
      input.onGoToSlide();
    }

    if (currentSlideIndex === 9) {
      input.onGoToSlide();
    }

    if (currentSlideIndex === 10) {
      input.onGoToSlide();
    }

    if (currentSlideIndex === 11) {
      input.onGoToSlide();
    }

    if (currentSlideIndex === 12) {
      input.onGoToSlide();
    }

    if (currentSlideIndex === 13) {
      if (!events.find((option) => option.isSelected)) {
        setShowErrorMessage(true);
        return;
      }
      input.onGoToSlide();
    }

    if (currentSlideIndex === 14) {
      input.onGoToSlide();
    }

    if (currentSlideIndex === 15) {
      input.onGoToSlide();
    }

    if (currentSlideIndex === 16) {
      if (receiveNewsLetter === null) {
        setShowErrorMessage(true);
        return;
      }
      input.onGoToSlide();
    }

    if (currentSlideIndex === 17) {
      if (imagePermission === null) {
        setShowErrorMessage(true);
        return;
      }
      input.onGoToSlide();
    }

    if (currentSlideIndex === 18) {
      input.onGoToSlide();
    }
  };

  const handleGoPrev = () => {
    if (currentSlideIndex - 1 === 0) {
      return;
    }

    handleSubmitSlide({
      onGoToSlide: () => {
        swiper?.slidePrev();

        setCurrentSlideIndex(currentSlideIndex - 1);
      },
    });
  };

  const handleGoNext = () => {
    if (currentSlideIndex + 1 === numSlides) {
      return;
    }

    handleSubmitSlide({
      onGoToSlide: () => {
        swiper?.slideNext();

        setCurrentSlideIndex(currentSlideIndex + 1);

        if (
          numViewedSlides < numSlides &&
          currentSlideIndex + 1 === numViewedSlides
        ) {
          setNumViewedSlides(numViewedSlides + 1);
        }
      },
    });
  };

  return (
    <SlidesContainer
      bottomPanel={
        currentSlideIndex === 0 ? (
          <div className="absolute -bottom-xs flex w-full translate-y-full justify-center">
            <div className="flex items-center gap-xxs text-sm text-gray-500">
              <span>
                <Icon.Time />
              </span>
              <span>Takes 2 minutes</span>
            </div>
          </div>
        ) : null
      }
      buttonText={
        currentSlideIndex === 0
          ? "Start"
          : currentSlideIndex === 1
          ? "Got it"
          : currentSlideIndex === 2
          ? "I understand"
          : currentSlideIndex === numSlides - 1
          ? "Submit"
          : "Okay"
      }
      goNext={handleGoNext}
      goPrev={handleGoPrev}
      isFinalSlide={currentSlideIndex + 1 === numSlides}
      showQuickNextButton={currentSlideIndex + 1 < numViewedSlides}
      showQuickPrevButton={currentSlideIndex > 0}
      textSlides={
        <Swiper
          spaceBetween={0}
          slidesPerView={1}
          direction="vertical"
          onSwiper={(swiper) => setSwiper(swiper)}
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
          }}
        >
          [
          <SwiperSlide key="slide-1">
            <SlideWrapper>
              <Slide1 />
            </SlideWrapper>
          </SwiperSlide>
          ,
          <SwiperSlide key="slide-2">
            <SlideWrapper>
              <Slide2 />
            </SlideWrapper>
          </SwiperSlide>
          ,
          <SwiperSlide key="slide-3">
            <SlideWrapper>
              <Slide3 />
            </SlideWrapper>
          </SwiperSlide>
          ,
          <SwiperSlide key="slide-4">
            <SlideWrapper>
              <QuestionnaireSlideWrapper
                errorMessage={{
                  message: "Oops...please enter your full name",
                  show: showErrorMessage,
                }}
                heading="Your full name:"
                inputs={
                  <Slide4
                    name={name}
                    setName={setName}
                    handleResetShowErrorMessage={() =>
                      showErrorMessage && setShowErrorMessage(false)
                    }
                  />
                }
                isRequired
                questionNumber={1}
              />
            </SlideWrapper>
          </SwiperSlide>
          ,
          <SwiperSlide key="slide-5">
            <SlideWrapper>
              <QuestionnaireSlideWrapper
                errorMessage={{
                  message: "Oops...please enter a valid date.",
                  show: showErrorMessage,
                }}
                heading="Your date of birth:"
                inputs={
                  <Slide5
                    dateOfBirth={dateOfBirth}
                    setDateOfBirth={setDateOfBirth}
                    handleResetShowErrorMessage={() =>
                      showErrorMessage && setShowErrorMessage(false)
                    }
                  />
                }
                isRequired
                questionNumber={2}
              />
            </SlideWrapper>
          </SwiperSlide>
          ,
          <SwiperSlide key="slide-6">
            <SlideWrapper>
              <QuestionnaireSlideWrapper
                errorMessage={{
                  message: "Oops...please enter a valid email.",
                  show: showErrorMessage,
                }}
                heading="Your email address:"
                inputs={
                  <Slide6
                    email={email}
                    setEmail={setEmail}
                    handleResetShowErrorMessage={() =>
                      showErrorMessage && setShowErrorMessage(false)
                    }
                  />
                }
                isRequired
                questionNumber={3}
              />
            </SlideWrapper>
          </SwiperSlide>
          ,
          <SwiperSlide key="slide-7">
            <SlideWrapper>
              <QuestionnaireSlideWrapper
                errorMessage={{
                  message: "Oops...please enter a valid phone number.",
                  show: showErrorMessage,
                }}
                heading="Your phone number:"
                inputs={
                  <Slide7
                    number={phoneNumber}
                    setNumber={setPhoneNumber}
                    handleResetShowErrorMessage={() =>
                      showErrorMessage && setShowErrorMessage(false)
                    }
                  />
                }
                isRequired
                questionNumber={4}
              />
            </SlideWrapper>
          </SwiperSlide>
          ,
          <SwiperSlide key="slide-8">
            <SlideWrapper>
              <QuestionnaireSlideWrapper
                heading="Emergency contact details:"
                inputs={
                  <Slide8
                    emergencyContact={emergencyContact}
                    setEmergencyContact={setEmergencyContact}
                  />
                }
                questionNumber={5}
              />
            </SlideWrapper>
          </SwiperSlide>
          ,
          <SwiperSlide key="slide-9">
            <SlideWrapper>
              <QuestionnaireSlideWrapper
                heading="Do you identify as any of the following?"
                inputs={
                  <Slide9
                    identities={identities}
                    setIdentities={setIdentities}
                    handleResetShowErrorMessage={() =>
                      showErrorMessage && setShowErrorMessage(false)
                    }
                  />
                }
                questionNumber={6}
                errorMessage={{
                  message: "Oops...please enter one of the options",
                  show: showErrorMessage,
                }}
                isRequired
                subheading="Tick all that apply to you."
              />
            </SlideWrapper>
          </SwiperSlide>
          ,
          <SwiperSlide key="slide-10">
            <SlideWrapper>
              <QuestionnaireSlideWrapper
                heading="Your ethnicity"
                inputs={
                  <Slide10 ethnicity={ethnicity} setEthnicity={setEthnicity} />
                }
                questionNumber={7}
              />
            </SlideWrapper>
          </SwiperSlide>
          ,
          <SwiperSlide key="slide-11">
            <SlideWrapper>
              <QuestionnaireSlideWrapper
                heading="Do you identify as any of the following?"
                inputs={<Slide11 genders={genders} setGenders={setGenders} />}
                questionNumber={8}
                subheading="Tick all that apply to you."
              />
            </SlideWrapper>
          </SwiperSlide>
          ,
          <SwiperSlide key="slide-12">
            <SlideWrapper>
              <QuestionnaireSlideWrapper
                heading="Do you consider yourself to have any physical health issues or medical conditions, e.g ASD, Asthma or allergies, ?"
                inputs={
                  <Slide12
                    healthIssues={healthIssues}
                    setHealthIssues={setHealthIssues}
                  />
                }
                questionNumber={9}
                subheading="If yes, please provide us with some detail."
              />
            </SlideWrapper>
          </SwiperSlide>
          ,
          <SwiperSlide key="slide-13">
            <SlideWrapper>
              <QuestionnaireSlideWrapper
                heading="Do you require any regular life saving medication, e.g inhalers, epipen or other?"
                inputs={
                  <Slide13
                    lifeSavingMedication={lifeSavingMedications}
                    setLifeSavingMedication={setLifeSavingMedications}
                  />
                }
                questionNumber={10}
                subheading="If yes, please provide us with some detail."
              />
            </SlideWrapper>
          </SwiperSlide>
          ,
          <SwiperSlide key="slide-14">
            <SlideWrapper>
              <QuestionnaireSlideWrapper
                heading="Which programmes and workshops are you interested in and would like some more information about?"
                inputs={
                  <Slide14
                    events={events}
                    setEvents={setEvents}
                    handleResetShowErrorMessage={() =>
                      showErrorMessage && setShowErrorMessage(false)
                    }
                  />
                }
                questionNumber={11}
                errorMessage={{
                  message: "Oops...please enter at least one option.",
                  show: showErrorMessage,
                }}
                isRequired
              />
            </SlideWrapper>
          </SwiperSlide>
          ,
          <SwiperSlide key="slide-15">
            <SlideWrapper>
              <QuestionnaireSlideWrapper
                heading="What do you hope to get out of going to The Birch Collective's sessions or programmes?"
                inputs={
                  <Slide15 hopeToGet={hopeToGet} setHopeToGet={setHopeToGet} />
                }
                questionNumber={12}
              />
            </SlideWrapper>
          </SwiperSlide>
          ,
          <SwiperSlide key="slide-16">
            <SlideWrapper>
              <QuestionnaireSlideWrapper
                heading="How did you hear about The Birch Collective"
                inputs={<Slide16 setSources={setSources} sources={sources} />}
                questionNumber={13}
                subheading="Tick all that apply."
              />
            </SlideWrapper>
          </SwiperSlide>
          ,
          <SwiperSlide key="slide-17">
            <SlideWrapper>
              <QuestionnaireSlideWrapper
                heading="Would you like to be added to the Birch Collectives monthly newsletter to hear about new workshops, programmes and services we are running?"
                inputs={
                  <Slide17
                    receiveNewsLetter={receiveNewsLetter}
                    setReceiveNewsLetter={setReceiveNewsLetter}
                    handleResetShowErrorMessage={() =>
                      showErrorMessage && setShowErrorMessage(false)
                    }
                  />
                }
                questionNumber={14}
                errorMessage={{
                  message: "Oops...please enter one of the options",
                  show: showErrorMessage,
                }}
                isRequired
              />
            </SlideWrapper>
          </SwiperSlide>
          ,
          <SwiperSlide key="slide-18">
            <SlideWrapper>
              <QuestionnaireSlideWrapper
                heading="Would you like to be added to the Birch Collectives monthly newsletter to hear about new workshops, programmes and services we are running?"
                inputs={
                  <Slide18
                    imagePermission={imagePermission}
                    setImagePermission={setImagePermission}
                    handleResetShowErrorMessage={() =>
                      showErrorMessage && setShowErrorMessage(false)
                    }
                  />
                }
                questionNumber={14}
                errorMessage={{
                  message: "Oops...please enter one of the options",
                  show: showErrorMessage,
                }}
                isRequired
              />
            </SlideWrapper>
          </SwiperSlide>
          ,
          <SwiperSlide key="slide-19">
            <SlideWrapper>
              <Slide19 submit={() => null} />
            </SlideWrapper>
          </SwiperSlide>
          ]
        </Swiper>
      }
    />
  );
};

export default Slides;

const SlidesContainer = (props: {
  goNext: () => void;
  goPrev: () => void;
  showQuickNextButton: boolean;
  showQuickPrevButton: boolean;
  textSlides: React.ReactElement;
  buttonText: string;
  bottomPanel?: React.ReactNode;
  isFinalSlide: boolean;
}) => {
  return (
    <div className="flex h-[400px] max-h-[400px] w-[600px] flex-col">
      {!props.isFinalSlide ? (
        <div className="mt-xs flex-shrink-0 text-center font-display text-5xl font-bold tracking-wide text-orangeLight">
          Birch Events
        </div>
      ) : null}

      <div className="relative mt-sm max-w-full flex-grow">
        {props.textSlides}
      </div>

      <div className="relative mt-lg w-full flex-shrink-0 ">
        <div className="flex w-full items-end justify-between">
          <div className="pointer-events-none flex gap-xxs opacity-0">
            <div
              className={`cursor-pointer rounded-sm bg-brandLightOrange text-lg text-white opacity-80 transition-opacity ease-in-out hover:opacity-100`}
            >
              <Icon.CaretUp weight="bold" />
            </div>

            <div
              className={`cursor-pointer rounded-sm bg-brandLightOrange text-lg text-white opacity-80 transition-opacity ease-in-out hover:opacity-100`}
            >
              <Icon.CaretDown weight="bold" />
            </div>
          </div>

          {!props.isFinalSlide ? (
            <div
              className="cursor-pointer rounded-sm bg-brandLightOrange px-sm py-xs text-xl font-semibold text-white"
              onClick={props.goNext}
            >
              {props.buttonText}
            </div>
          ) : null}

          <div className="flex gap-xxs">
            <WithTooltip text="previous slide">
              <div
                className={`cursor-pointer rounded-sm bg-brandLightOrange text-lg text-white opacity-80 transition-opacity ease-in-out hover:opacity-100 ${
                  !props.showQuickPrevButton
                    ? "pointer-events-none !opacity-0"
                    : ""
                }`}
                onClick={props.goPrev}
              >
                <Icon.CaretUp weight="bold" />
              </div>
            </WithTooltip>

            <WithTooltip text="next slide">
              <div
                className={`cursor-pointer rounded-sm bg-brandLightOrange text-lg text-white opacity-80 transition-opacity ease-in-out hover:opacity-100 ${
                  !props.showQuickNextButton
                    ? "pointer-events-none !opacity-0"
                    : ""
                }`}
                onClick={props.goNext}
              >
                <Icon.CaretDown weight="bold" />
              </div>
            </WithTooltip>
          </div>
          {props.bottomPanel ? props.bottomPanel : null}
        </div>
      </div>
    </div>
  );
};

const SlideWrapper = ({ children }: { children: React.ReactElement }) => (
  <div className="absolute grid h-full w-full place-items-center overflow-y-auto p-xs">
    <div className="w-full">{children}</div>
  </div>
);

type SlideErrorProps = {
  handleResetShowErrorMessage: () => void;
};

const Slide1 = () => (
  <>
    <div className="text-center text-xl font-bold text-[#2F4858]">
      Thanks for showing an interest in one of our events.
    </div>

    <div className="mt-md text-center text-xl text-[#2F4858]">
      The following questions help us get to know a bit about you. We need to
      take some really basic info from you, such as your contact details. This
      means we can get in touch with you so we can discuss getting started - so
      please double-check the details you&apos;re giving us are correct!
    </div>
  </>
);

const Slide2 = () => (
  <>
    <div className="text-center text-lg  text-[#2F4858]">
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
  </>
);

const Slide3 = () => (
  <>
    <div className="text-center text-lg  text-[#2F4858]">
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
  </>
);

const QuestionnaireSlideWrapper = ({
  questionNumber,
  heading,
  subheading,
  errorMessage,
  isRequired,
  inputs,
}: {
  questionNumber: number;
  heading: string;
  subheading?: string;
  errorMessage?: { show: boolean; message: string };
  isRequired?: boolean;
  inputs: React.ReactNode;
}) => (
  <>
    <div className="text-lg text-[#2F4858]">{questionNumber}.</div>

    <div className="mt-sm text-xl font-medium text-brandOrange">{heading}</div>

    {subheading ? <p className="mt-xs text-gray-500">{subheading}</p> : null}

    <div className="mt-md">
      {inputs}

      {errorMessage || isRequired ? (
        <div className="mt-xs flex justify-between">
          {errorMessage?.show ? (
            <p className="text-[#FF8983]">{errorMessage.message}</p>
          ) : (
            <span></span>
          )}
          {isRequired ? (
            <span className="italic text-gray-500">required</span>
          ) : null}
        </div>
      ) : null}
    </div>
  </>
);

const Slide4 = ({
  name,
  setName,
  handleResetShowErrorMessage,
}: {
  name: string;
  setName: (name: string) => void;
} & SlideErrorProps) => (
  <input
    className="w-full border-b border-b-[#2F4858] text-lg text-[#2F4858]"
    value={name}
    onChange={(e) => {
      setName(e.target.value);

      handleResetShowErrorMessage();
    }}
    type="text"
    placeholder="Enter full name here"
  />
);

const Slide5 = ({
  dateOfBirth,
  setDateOfBirth,
  handleResetShowErrorMessage,
}: {
  dateOfBirth: DateOfBirth;
  setDateOfBirth: Updater<DateOfBirth>;
} & SlideErrorProps) => {
  return (
    <>
      <div className="mt-md flex gap-md">
        <div className="flex flex-col gap-xs text-[#2F4858]">
          <label className="text-gray-400" htmlFor="day">
            day
          </label>
          <input
            className="w-[80px]  text-lg"
            id="day"
            value={dateOfBirth.day}
            onChange={(e) => {
              const number = Number(e.target.value);

              if (!isFinite(number)) {
                return;
              }

              handleResetShowErrorMessage();

              setDateOfBirth((draft) => {
                draft.day = number;
              });
            }}
            type="text"
          />
        </div>

        <div className="flex flex-col gap-xs text-[#2F4858]">
          <label className="text-gray-400" htmlFor="month">
            month
          </label>
          <input
            className="w-[80px] text-lg"
            id="month"
            value={dateOfBirth.month}
            onChange={(e) => {
              const number = Number(e.target.value);

              if (!isFinite(number)) {
                return;
              }

              handleResetShowErrorMessage();

              setDateOfBirth((draft) => {
                draft.month = number;
              });
            }}
            type="text"
          />
        </div>

        <div className="flex flex-col gap-xs text-[#2F4858]">
          <label className="text-gray-400" htmlFor="year">
            year
          </label>
          <input
            className="w-[80px] text-lg"
            id="year"
            value={dateOfBirth.year}
            onChange={(e) => {
              const number = Number(e.target.value);

              if (!isFinite(number)) {
                return;
              }

              handleResetShowErrorMessage();

              setDateOfBirth((draft) => {
                draft.year = number;
              });
            }}
            type="text"
          />
        </div>
      </div>
    </>
  );
};

const Slide6 = ({
  email,
  setEmail,
  handleResetShowErrorMessage,
}: {
  email: string;
  setEmail: (name: string) => void;
} & SlideErrorProps) => (
  <input
    className="w-full border-b border-b-[#2F4858] text-lg text-[#2F4858]"
    value={email}
    onChange={(e) => {
      setEmail(e.target.value);

      handleResetShowErrorMessage();
    }}
    type="text"
    placeholder="Enter email here"
  />
);

const Slide7 = ({
  number,
  setNumber,
  handleResetShowErrorMessage,
}: {
  number: string;
  setNumber: (number: string) => void;
} & SlideErrorProps) => (
  <input
    className="w-full border-b border-b-[#2F4858] text-lg text-[#2F4858]"
    value={number}
    onChange={(e) => {
      setNumber(e.target.value);

      handleResetShowErrorMessage();
    }}
    type="number"
    placeholder="Enter phone number here"
  />
);

const Slide8 = ({
  emergencyContact,
  setEmergencyContact,
}: {
  emergencyContact: EmergencyContact;
  setEmergencyContact: Updater<EmergencyContact>;
}) => (
  <div className="flex flex-col gap-sm">
    <div>
      <label className="text-sm text-gray-500" htmlFor="emergency-name">
        Name
      </label>
      <input
        id="emergency-name"
        className="mt-xs w-full border-b border-b-[#2F4858] text-lg text-[#2F4858]"
        value={emergencyContact.name}
        onChange={(e) => {
          setEmergencyContact((draft) => {
            draft.name = e.target.value;
          });
        }}
        type="text"
        placeholder="Enter name here"
      />
    </div>

    <div>
      <label className="text-sm text-gray-500" htmlFor="emergency-phone">
        Phone number
      </label>
      <input
        className="w-full border-b border-b-[#2F4858] text-lg text-[#2F4858]"
        id="emergency-phone"
        value={emergencyContact.phoneNumber}
        onChange={(e) => {
          setEmergencyContact((draft) => {
            draft.phoneNumber = e.target.value;
          });
        }}
        type="text"
        placeholder="Enter phone number here"
      />
    </div>
    <div>
      <label className="text-sm text-gray-500" htmlFor="emergency-phone">
        Relationship
      </label>
      <input
        className="w-full border-b border-b-[#2F4858] text-lg text-[#2F4858]"
        id="emergency-relationship"
        value={emergencyContact.relationship}
        onChange={(e) => {
          setEmergencyContact((draft) => {
            draft.relationship = e.target.value;
          });
        }}
        type="text"
        placeholder="Enter relationship here"
      />
    </div>
  </div>
);

const Slide9 = ({
  identities,
  setIdentities,
  handleResetShowErrorMessage,
}: {
  identities: Identity[];
  setIdentities: Updater<Identity[]>;
} & SlideErrorProps) => (
  <div className="mt-md flex flex-col gap-xs">
    {identities.map((option) => (
      <div className="flex items-center gap-sm" key={option.label}>
        <div>
          <input
            id={option.label}
            checked={option.isSelected}
            onChange={(e) => {
              handleResetShowErrorMessage();

              const labelStr = e.currentTarget.id;

              setIdentities((draft) => {
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
            }}
            type="checkbox"
          />
        </div>
        <label className="text-lg text-[#2F4858]" htmlFor={option.label}>
          {option.label}
        </label>
      </div>
    ))}
  </div>
);

const Slide10 = ({
  ethnicity,
  setEthnicity,
}: {
  ethnicity: string;
  setEthnicity: (ethnicity: string) => void;
}) => (
  <input
    className="mt-sm w-full border-b border-b-[#2F4858] text-lg text-[#2F4858]"
    value={ethnicity}
    onChange={(e) => {
      setEthnicity(e.target.value);
    }}
    type="text"
    placeholder="Enter ethnicity here"
  />
);

const Slide11 = ({
  genders,
  setGenders,
}: {
  genders: Gender[];
  setGenders: Updater<Gender[]>;
}) => (
  <div className="flex flex-col gap-xs">
    {genders.map((option) => (
      <div className="flex items-center gap-sm" key={option.label}>
        <div>
          <input
            id={option.label}
            checked={option.isSelected}
            onChange={(e) => {
              const labelStr = e.currentTarget.id;

              setGenders((draft) => {
                const index = draft.findIndex(
                  (option) => option.label === labelStr,
                );

                if (index < 0) {
                  return;
                }

                draft.forEach((option, i) => {
                  if (i === index) {
                    option.isSelected = !option.isSelected;
                  } else {
                    option.isSelected = false;
                  }
                });
              });
            }}
            type="checkbox"
          />
        </div>
        <label className="text-lg text-[#2F4858]" htmlFor={option.label}>
          {option.label}
        </label>
      </div>
    ))}
  </div>
);

const Slide12 = ({
  healthIssues,
  setHealthIssues,
}: {
  healthIssues: string;
  setHealthIssues: (value: string) => void;
}) => (
  <textarea
    className="w-full resize-none border-b border-b-[#2F4858] text-lg text-[#2F4858]"
    value={healthIssues}
    onChange={(e) => setHealthIssues(e.currentTarget.value)}
    placeholder="Enter health issues here"
  />
);

const Slide13 = ({
  lifeSavingMedication,
  setLifeSavingMedication,
}: {
  lifeSavingMedication: string;
  setLifeSavingMedication: (value: string) => void;
}) => (
  <textarea
    className="w-full resize-none border-b border-b-[#2F4858] text-lg text-[#2F4858]"
    value={lifeSavingMedication}
    onChange={(e) => setLifeSavingMedication(e.currentTarget.value)}
    placeholder="Enter life saving medication here"
  />
);

const Slide14 = ({
  events,
  setEvents,
  handleResetShowErrorMessage,
}: {
  events: Event[];
  setEvents: Updater<Event[]>;
} & SlideErrorProps) => {
  return (
    <>
      <div className="mt-md flex flex-col gap-xs">
        {events.map((option) => (
          <div className="flex items-center gap-sm" key={option.name}>
            <div>
              <input
                id={option.name}
                checked={option.isSelected}
                onChange={(e) => {
                  const name = e.currentTarget.id;

                  setEvents((draft) => {
                    const index = draft.findIndex(
                      (option) => option.name === name,
                    );

                    if (index < 0) {
                      return;
                    }

                    draft[index].isSelected = !draft[index].isSelected;

                    handleResetShowErrorMessage();
                  });
                }}
                type="checkbox"
              />
            </div>
            <label className="text-lg text-[#2F4858]" htmlFor={option.name}>
              {option.name}
            </label>
          </div>
        ))}
      </div>
    </>
  );
};

const Slide15 = ({
  hopeToGet,
  setHopeToGet,
}: {
  hopeToGet: string;
  setHopeToGet: (value: string) => void;
}) => (
  <textarea
    className="w-full resize-none border-b border-b-[#2F4858] text-lg text-[#2F4858]"
    value={hopeToGet}
    onChange={(e) => setHopeToGet(e.currentTarget.value)}
    placeholder="Enter what you hope to get here"
  />
);

const Slide16 = ({
  setSources,
  sources,
}: {
  sources: Sources;
  setSources: Updater<Sources>;
}) => (
  <div className="mt-md flex flex-col gap-xs">
    {sources.entries.map((option) => (
      <div key={option.label}>
        <div className="flex items-center gap-sm">
          <input
            id={option.label}
            checked={option.isSelected}
            onChange={(e) => {
              const label = e.currentTarget.id;

              setSources((draft) => {
                const index = draft.entries.findIndex(
                  (option) => option.label === label,
                );

                if (index < 0) {
                  return;
                }

                draft.entries[index].isSelected =
                  !draft.entries[index].isSelected;
              });
            }}
            type="checkbox"
          />
          <label className="text-lg text-[#2F4858]" htmlFor={option.label}>
            {option.label}
          </label>
        </div>

        {option.label === "GP or other medical professional" &&
        option.isSelected ? (
          <div className="mb-xs mt-xs pl-lg">
            <input
              className="w-full border-b border-b-[#2F4858] text-lg text-[#2F4858]"
              value={sources.medicalProDetails}
              onChange={(e) => {
                setSources(
                  (draft) => (draft.medicalProDetails = e.currentTarget.value),
                );
              }}
              type="text"
              placeholder="Enter medical professional details"
            />
            <p className="mt-xs text-sm text-gray-500">
              Please give name, organisation and email address if you can.
            </p>
          </div>
        ) : null}

        {option.label === "Other" && option.isSelected ? (
          <div className="mt-xs pl-lg">
            <input
              className="w-full border-b border-b-[#2F4858] text-lg text-[#2F4858]"
              value={sources.otherDetails}
              onChange={(e) => {
                setSources(
                  (draft) => (draft.otherDetails = e.currentTarget.value),
                );
              }}
              type="text"
              placeholder="Enter details"
            />
            <p className="mt-xs text-sm text-gray-500">
              Please give any details you can.
            </p>
          </div>
        ) : null}
      </div>
    ))}
  </div>
);

const Slide17 = ({
  receiveNewsLetter,
  setReceiveNewsLetter,
  handleResetShowErrorMessage,
}: {
  receiveNewsLetter: boolean | null;
  setReceiveNewsLetter: (value: boolean) => void;
} & SlideErrorProps) => {
  return (
    <>
      <div className="flex flex-col gap-sm">
        <div className="flex items-center gap-xs">
          <input
            id="news-yes"
            checked={receiveNewsLetter === true}
            onChange={() => {
              setReceiveNewsLetter(true);

              handleResetShowErrorMessage();
            }}
            type="checkbox"
          />

          <label className="text-lg text-[#2F4858]" htmlFor="news-yes">
            Yes
          </label>
        </div>

        <div className="flex items-center gap-xs">
          <input
            id="news-no"
            checked={receiveNewsLetter === false}
            onChange={() => {
              setReceiveNewsLetter(false);

              handleResetShowErrorMessage();
            }}
            type="checkbox"
          />

          <label htmlFor="news-no" className="text-lg text-[#2F4858]">
            No
          </label>
        </div>
      </div>
    </>
  );
};

const Slide18 = ({
  imagePermission,
  setImagePermission,
  handleResetShowErrorMessage,
}: {
  imagePermission: boolean | null;
  setImagePermission: (value: boolean) => void;
} & SlideErrorProps) => (
  <div className="flex flex-col gap-sm">
    <div className="flex items-center gap-xs">
      <input
        id="image-yes"
        checked={imagePermission === true}
        onChange={() => {
          setImagePermission(true);
          handleResetShowErrorMessage();
        }}
        type="checkbox"
      />

      <label className="text-lg text-[#2F4858]" htmlFor="image-yes">
        Yes
      </label>
    </div>

    <div className="flex items-center gap-xs">
      <input
        id="image-no"
        checked={imagePermission === false}
        onChange={() => {
          setImagePermission(false);
          handleResetShowErrorMessage();
        }}
        type="checkbox"
      />

      <label htmlFor="image-no" className="text-lg text-[#2F4858]">
        No
      </label>
    </div>
  </div>
);

const Slide19 = ({ submit }: { submit: () => void }) => (
  <div className="">
    <div className="mt-lg text-center  text-gray-400">
      To finish, click submit:
    </div>

    <div className="mt-lg text-center">
      <div
        className="inline-flex cursor-pointer items-center gap-xs rounded-sm bg-brandLightOrange px-sm py-xs text-xl font-semibold text-white"
        onClick={submit}
      >
        <span>Submit</span>
      </div>
    </div>

    <div className="mt-lg text-center text-xl text-[#2F4858]">
      Thanks for taking the time to get in touch with us. One of the Birch team
      will be in touch with you shortly about the next steps in joining our
      programmes.
    </div>
  </div>
);
