import { TextInputForm } from "~/components/forms";
import { Slides } from "~/components/swiper";
import { useHovered } from "~/hooks";
import { NextImage, generateUid } from "~/lib/external-packages-rename";
import { dummyData } from "~/static-data";
import type { MyDb } from "~/types/database";
import { UserEditableDataCx } from "../_state";
import { deepSortByIndex } from "~/helpers/data/process";

// □ testimonial endorser name not saving (seems updating okay)
// □ max width. move nav buttons to right.
// □ will probably need to reset mydb.testimonials order at points
/* const createDummyTestimonial = (input: {
  order: number;
}): MyDb["testimonial"] => ({
  endorserName: "",
  id: generateUid(),
  order: input.order,
  text: "",
}); */

export const TestimonialSlides = () => {
  const pageData = UserEditableDataCx.useData("page");

  const slidesInitData = [
    ...deepSortByIndex(pageData.testimonials),
    ...(Array(
      pageData.testimonials.length >= 4 ? 0 : 4 - pageData.testimonials.length,
    ).fill("dummy") as "dummy"[]),
  ];

  /*   const landingTestimonials = localStateLandingTestimonials
    .sort((a, b) => a.order - b.order)
    .map((t) => t.id);

  const numDummy =
    landingTestimonials.length >= 4 ? 0 : 4 - landingTestimonials.length;

  const x: "dummy"[] = [];

  for (let i = 0; i < numDummy; i++) {
    x.push("dummy");
  } */

  return (
    <div>
      <Slides
        numSlidesTotal={4}
        slides={({ leftMost, rightMost }) =>
          slidesInitData.map((landingData, i) => (
            <Testimonial
              slidesView={{ isFirst: i === leftMost, isLast: i === rightMost }}
              landingData={landingData}
              key={i}
            />
          ))
        }
      />
    </div>
  );
};

const Testimonial = ({
  landingData,
  slidesView,
}: {
  slidesView: {
    isFirst?: boolean;
    isLast?: boolean;
  };
  landingData: MyDb["pages"]["landing"]["testimonials"][number] | "dummy";
}) => {
  const [isHovered, { hoverHandlers }] = useHovered();

  const allTestimonials = UserEditableDataCx.useData("testimonials");

  const testimonialData =
    landingData === "dummy"
      ? "dummy"
      : allTestimonials.find(
          (testimonial) =>
            testimonial.id === landingData.dbConnections.testimonialId,
        );

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
      {!testimonialData ? (
        <TestimonialErrorContent />
      ) : (
        <TestimonialContent data={testimonialData} />
      )}
    </div>
  );
};

const TestimonialErrorContent = () => (
  <div className="grid h-full place-items-center">
    <h4>Error</h4>
    <p>Could not find testimonial. It may have been deleted</p>
  </div>
);

// TODO: should seperate dummy and actual
const TestimonialContent = ({
  data,
}: {
  data: MyDb["testimonial"] | "dummy";
}) => {
  const userAction = UserEditableDataCx.useAction();
  const pageData = UserEditableDataCx.useData("page");

  return (
    <>
      <NextImage
        alt=""
        className="absolute h-full w-full"
        fill
        src={dummyData.imageSrc}
        // src={data === 'dummy' ? dummyData.imageSrc : data.}
        style={{
          objectFit: "cover",
        }}
      />
      <div className="absolute bottom-0 z-10 flex h-4/5 w-full flex-col justify-end gap-sm bg-gradient-to-t from-black to-transparent p-sm text-center text-lg text-white">
        <div className="overflow-auto scrollbar-hide">
          The time I got to spend with others on the camp was just something so
          magical and wonderful and beautiful I can&apos;t fully describe it. If
          you find interacting with others difficult or intimidating, or if
          you&apos;re struggling with your mental health, please consider giving
          it a go. It was absolutely worth it and I am incredibly thankful I got
          to go.
        </div>
        <div className="shrink-0 font-medium">
          <TextInputForm
            input={{ placeholder: "Endorser name" }}
            localStateValue={data === "dummy" ? "" : data.endorserName}
            onSubmit={({ inputValue }) => {
              if (data === "dummy") {
                const newTestimonialId = generateUid();
                const newTestimonialOrder = pageData.testimonials.length;
                userAction.testimonial.create({
                  dbConnections: { imageId: null },
                  endorserName: inputValue,
                  id: newTestimonialId,
                  index: newTestimonialOrder,
                  text: "",
                });
                userAction.page.testimonials.create({
                  dbConnections: { testimonialId: newTestimonialId },
                  id: generateUid(),
                  index: newTestimonialOrder,
                });
              } else {
                userAction.testimonial.endorserName.update({
                  id: data.id,
                  newVal: inputValue,
                });
              }
            }}
          />
        </div>
      </div>
    </>
  );
};
