import type { ReactElement } from "react";

import { ConnectImage } from "~/components/ConnectImage";
import { CustomisableImage } from "~/components/CustomisableImage";
import { Icon } from "~/components/icons";
import { ImagePlaceholder } from "~/components/ImagePlaceholder";
import CmsLayout from "~/components/layouts/Cms";
import ParticipantTestimonialsModal from "~/components/participant-testimonials-modal/+Entry";
import { UserSelectedImageWrapper } from "~/components/UserSelectedImageWrapper";

import { Slides } from "./slides/+Entry";

import { ParticipantTestimonialCx } from "~/context/entities";
import { UedCx } from "~/context/user-editable-data";
import { deepSortByIndex } from "~/helpers/data/process";
import { useHovered } from "~/hooks";

const ParticipantTestimonials = () => {
  const {
    store: { data: testimonials },
  } = UedCx.ParticipantTestimonials.use();

  const slidesInitData = [
    ...deepSortByIndex(testimonials),
    ...(Array(testimonials.length >= 4 ? 0 : 4 - testimonials.length).fill(
      "dummy",
    ) as "dummy"[]),
  ];

  return (
    <div className="group/testimonials">
      <CmsLayout.EditBar className="opacity-40 group-hover/testimonials:opacity-80 hover:!opacity-100">
        <ParticipantTestimonialsModal
          button={({ openModal }) => (
            <div
              className="my-btn my-btn-neutral flex cursor-pointer items-center gap-xs rounded-sm border-transparent"
              onClick={openModal}
            >
              <span className="text-gray-400">
                <Icon.Configure />
              </span>
              <span className="">Edit testimonials</span>
            </div>
          )}
        />
      </CmsLayout.EditBar>

      <Slides
        numSlidesTotal={testimonials.length}
        slides={({ leftMost, rightMost }) =>
          slidesInitData.map((testimonial, i) => (
            <TestimonialWrapper
              slidesView={{
                isFirst: i === leftMost,
                isLast: i === rightMost,
              }}
              key={i}
            >
              {testimonial === "dummy" ? (
                <TestimonialDummy />
              ) : (
                <ParticipantTestimonialCx.Provider testimonial={testimonial}>
                  <TestimonialActual />
                </ParticipantTestimonialCx.Provider>
              )}
            </TestimonialWrapper>
          ))
        }
      />
    </div>
  );
};

export default ParticipantTestimonials;

const TestimonialWrapper = ({
  children,
  slidesView,
}: {
  children: ReactElement;
  slidesView: {
    isFirst?: boolean;
    isLast?: boolean;
  };
}) => {
  const [isHovered, { hoverHandlers }] = useHovered();

  return (
    <div
      className={`relative aspect-[3/4] border-2 border-white transition-transform duration-[275ms] ease-[cubic-bezier(0.24,0.26,0.2,1)] ${
        isHovered ? "md:scale-115" : "scale-100"
      } ${
        slidesView.isFirst
          ? "origin-left"
          : slidesView.isLast
          ? "origin-right"
          : ""
      }`}
      {...hoverHandlers}
    >
      {children}
    </div>
  );
};

const TestimonialDummy = () => (
  <>
    <div className="absolute h-full w-full">
      <ImagePlaceholder placeholderText="" />
    </div>
    <div className="absolute bottom-0 z-10 flex h-4/5 w-full flex-col justify-end gap-sm rounded-b-md bg-gradient-to-t from-black to-transparent p-sm text-center text-lg text-white">
      <div className="overflow-x-auto scrollbar-hide">
        <p className="">
          Herald sad and trumpet be, To this troop come thou not near! To
          themselves yet either neither, Beauty brag, but tis not she; If what
          parts can so remain...
        </p>
      </div>
      <div className="shrink-0 font-medium">
        <p>Person Name</p>
      </div>
    </div>
  </>
);

const TestimonialActual = () => {
  const { endorserName, image, text } = ParticipantTestimonialCx.use();
  return (
    <>
      <div className="absolute h-full w-full">
        <UserSelectedImageWrapper
          dbImageId={image.dbConnect.imageId}
          placeholderText="background image"
        >
          {({ dbImageId }) => (
            <ConnectImage connectedImageId={dbImageId}>
              {({ urls }) => (
                <CustomisableImage urls={urls} position={image.position} />
              )}
            </ConnectImage>
          )}
        </UserSelectedImageWrapper>
      </div>
      <div className="absolute bottom-0 z-10 h-4/5 w-full bg-gradient-to-t from-black to-transparent">
        <div className="absolute bottom-0 z-10 flex h-[63%] w-full flex-col justify-end gap-sm p-sm text-center text-lg text-white">
          <div className="overflow-x-auto scrollbar-hide">
            {text.length ? text : "Testimonial"}
          </div>
          <div className="shrink-0 font-medium">
            <p>{endorserName.length ? endorserName : "Endorser name"}</p>
          </div>
        </div>
      </div>
    </>
  );
};
