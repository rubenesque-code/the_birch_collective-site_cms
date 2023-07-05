import { Slides } from "~/components/swiper";
import { useHovered } from "~/hooks";
import { NextImage, generateUid } from "~/lib/external-packages-rename";
import { dummyData } from "~/static-data";
import { UserEditableDataCx } from "../_state";
import type { MyDb } from "~/types/database";
import { type ReactElement } from "react";
import { useQuery } from "react-query";
import { myDb } from "~/my-firebase/firestore";

// □ max width. move nav buttons to right.
const createDummyTestimonial = (input: {
  order: number;
}): MyDb["testimonial"] => ({
  endorserName: "",
  id: generateUid(),
  order: input.order,
  text: "",
});

export const TestimonialSlides = () => {
  const allTestimonials = UserEditableDataCx.useData("testimonials");

  const landingTestimonials = localStateLandingTestimonials
    .sort((a, b) => a.order - b.order)
    .map((t) => t.id);

  const numDummy =
    landingTestimonials.length >= 4 ? 0 : 4 - landingTestimonials.length;

  const x: "dummy"[] = [];

  for (let i = 0; i < numDummy; i++) {
    x.push("dummy");
  }

  return (
    <div>
      <Slides
        numSlidesTotal={4}
        slides={({ leftMost, rightMost }) =>
          [...landingTestimonials, ...x].map((id, i) => (
            <TestimonialDataWrapper
              isFirstInView={i === leftMost}
              isLastInView={i === rightMost}
              dbId={id}
              order={i}
              key={i}
            >
              {({ data }) => (
                <Testimonial
                  data={data}
                  type={id === "dummy" ? "dummy" : "actual"}
                />
              )}
            </TestimonialDataWrapper>
          ))
        }
      />
    </div>
  );
};

const TestimonialDataWrapper = ({
  children,
  isFirstInView,
  isLastInView,
  order,
  dbId,
}: {
  dbId: string | "dummy";
  isFirstInView?: boolean;
  isLastInView?: boolean;
  order: number;
  children: (arg0: { data: MyDb["testimonial"] }) => ReactElement;
}) => {
  const [isHovered, { hoverHandlers }] = useHovered();

  const query = useQuery(
    "testimonial",
    async () => await myDb.testimonial.fetchOne(dbId),
    { enabled: dbId !== "dummy" },
  );

  return (
    <div
      className={`relative aspect-[3/4] border-2 border-white transition-transform duration-[275ms] ease-[cubic-bezier(0.24,0.26,0.2,1)] ${
        isHovered ? "md:scale-115" : "scale-100"
      } ${isFirstInView ? "origin-left" : isLastInView ? "origin-right" : ""}`}
      {...hoverHandlers}
    >
      {dbId === "dummy" ? (
        children({ data: createDummyTestimonial({ order }) })
      ) : !query.data ? (
        <p>Loading...</p>
      ) : (
        children({ data: query.data })
      )}
    </div>
  );
};

const Testimonial = ({
  data,
  type,
}: {
  data: MyDb["testimonial"];
  type: "dummy" | "actual";
}) => {
  return (
    <>
      <NextImage
        alt=""
        className="absolute h-full w-full"
        fill
        src={dummyData.imageSrc}
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
        <div className="shrink-0 font-medium">Person 1</div>
      </div>
    </>
  );
};
