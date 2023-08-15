import "swiper/css";

import React from "react";
import type { Swiper as SwiperType } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

import { isFinite } from "lodash";
import { useImmer, type Updater } from "use-immer";
import { Icon } from "~/components/icons";
import { WithTooltip } from "../WithTooltip";

type DateOfBirth = { day: number; month: number; year: number };

const Slides = () => {
  const [swiper, setSwiper] = React.useState<SwiperType | null>(null);
  const [currentSlideIndex, setCurrentSlideIndex] = React.useState(0);

  const [numViewedSlides, setNumViewedSlides] = React.useState(1);

  const [name, setName] = React.useState("");
  const [dateOfBirth, setDateOfBirth] = useImmer({
    day: 1,
    month: 1,
    year: 2000,
  });
  console.log("dateOfBirth:", dateOfBirth);

  const [showErrorMessage, setShowErrorMessage] = React.useState(false);

  const numSlides = 10;

  const handleGoNext = () => {
    if (currentSlideIndex + 1 === numSlides) {
      return;
    }

    swiper?.slideNext();

    setCurrentSlideIndex(currentSlideIndex + 1);

    if (
      numViewedSlides < numSlides &&
      currentSlideIndex + 1 === numViewedSlides
    ) {
      setNumViewedSlides(numViewedSlides + 1);
    }
  };

  const handleSubmitSlide = () => {
    if (currentSlideIndex < 3) {
      handleGoNext();
      return;
    }

    if (currentSlideIndex === 3) {
      if (!name.length) {
        setShowErrorMessage(true);
        return;
      }
      handleGoNext();
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
      handleGoNext();
    }
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
          : "Okay"
      }
      goNext={handleGoNext}
      goPrev={() => {
        if (currentSlideIndex === 0) {
          return;
        }

        setCurrentSlideIndex(currentSlideIndex - 1);

        swiper?.slidePrev();
      }}
      onClickGoNextButton={handleSubmitSlide}
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
              <Slide4
                name={name}
                setName={setName}
                showErrorMessage={showErrorMessage}
                resetShowErrorMessage={() => setShowErrorMessage(false)}
              />
            </SlideWrapper>
          </SwiperSlide>
          ,
          <SwiperSlide key="slide-5">
            <SlideWrapper>
              <Slide5
                dateOfBirth={dateOfBirth}
                setDateOfBirth={setDateOfBirth}
                showErrorMessage={showErrorMessage}
                resetShowErrorMessage={() => setShowErrorMessage(false)}
              />
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
  onClickGoNextButton: () => void;
}) => {
  return (
    <div className="flex h-[400px] max-h-[400px] w-[600px] flex-col ">
      <div className="mt-xs flex-shrink-0 text-center font-display text-5xl font-bold tracking-wide text-orangeLight">
        Birch Events
      </div>

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

          <div
            className="cursor-pointer rounded-sm bg-brandLightOrange px-sm py-xs text-xl font-semibold text-white"
            onClick={props.onClickGoNextButton}
          >
            {props.buttonText}
          </div>

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
  <div className="absolute h-full w-full overflow-y-auto p-xs">{children}</div>
);

type SlideErrorProps = {
  showErrorMessage: boolean;
  resetShowErrorMessage: () => void;
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

const Slide4 = ({
  name,
  setName,
  resetShowErrorMessage,
  showErrorMessage,
}: {
  name: string;
  setName: (name: string) => void;
} & SlideErrorProps) => {
  return (
    <>
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

            if (showErrorMessage) {
              resetShowErrorMessage();
            }
          }}
          type="text"
          placeholder="Enter full name here"
        />

        <div className="mt-xs flex justify-between">
          {showErrorMessage ? (
            <p className="text-[#FF8983]">Oops...please enter your full name</p>
          ) : (
            <span></span>
          )}
          <span className="italic text-gray-500">required</span>
        </div>
      </div>
    </>
  );
};

const Slide5 = ({
  dateOfBirth,
  setDateOfBirth,
  resetShowErrorMessage,
  showErrorMessage,
}: {
  dateOfBirth: DateOfBirth;
  setDateOfBirth: Updater<DateOfBirth>;
} & SlideErrorProps) => {
  return (
    <>
      <div className="text-lg text-[#2F4858]">1.</div>
      <div className="mt-sm text-xl font-medium text-brandOrange">
        Your date of birth:
      </div>
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

              resetShowErrorMessage();

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

              resetShowErrorMessage();

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

              resetShowErrorMessage();

              setDateOfBirth((draft) => {
                draft.year = number;
              });
            }}
            type="text"
          />
        </div>
      </div>

      <div className="mt-xs flex justify-between">
        {showErrorMessage ? (
          <p className="text-[#FF8983]">Oops...please enter a valid date.</p>
        ) : (
          <span></span>
        )}
        <span className="italic text-gray-500">required</span>
      </div>
    </>
  );
};
