import { ImagePlaceholder } from "~/components/ImagePlaceholder";
import { Slides } from "~/components/swiper";
import { deepSortByIndex } from "~/helpers/data/process";
import { useHovered } from "~/hooks";
import { NextImage } from "~/lib/external-packages-rename";
import { dummyData } from "~/static-data";
import type { MyDb } from "~/types/database";
import { UserEditableDataCx } from "../_state";
import { EditModal } from "./edit/+Entry";
import { ComponentMenu } from "~/components/menus";
import { Icon } from "~/components/icons";

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
  const testimonials = UserEditableDataCx.useData("testimonials");

  const slidesInitData = [
    ...deepSortByIndex(testimonials),
    ...(Array(testimonials.length >= 4 ? 0 : 4 - testimonials.length).fill(
      "dummy",
    ) as "dummy"[]),
  ];

  return (
    <div className="group/testimonials relative">
      <Slides
        numSlidesTotal={4}
        slides={({ leftMost, rightMost }) =>
          slidesInitData.map((landingData, i) => (
            <Testimonial
              slidesView={{ isFirst: i === leftMost, isLast: i === rightMost }}
              testimonial={landingData}
              key={i}
            />
          ))
        }
      />
      <ComponentMenu styles="group-hover/testimonials:opacity-40">
        <EditModal
          button={({ openModal }) => (
            <ComponentMenu.Button
              tooltip="edit testimonials"
              onClick={openModal}
            >
              <Icon.Configure />
            </ComponentMenu.Button>
          )}
        />
      </ComponentMenu>
    </div>
  );
};

const Testimonial = ({
  testimonial,
  slidesView,
}: {
  slidesView: {
    isFirst?: boolean;
    isLast?: boolean;
  };
  testimonial: MyDb["testimonial"] | "dummy";
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
      {testimonial === "dummy" ? (
        <TestimonialDummy />
      ) : (
        <TestimonialActual data={testimonial} />
      )}
    </div>
  );
};

const TestimonialDummy = () => (
  <>
    <div className="absolute h-full w-full">
      <ImagePlaceholder placeholderText="" />
    </div>
    <div className="absolute bottom-0 z-10 flex h-4/5 w-full flex-col justify-end gap-sm rounded-b-md bg-gradient-to-t from-black to-transparent p-sm text-center text-lg text-white">
      <div className="overflow-auto scrollbar-hide">
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

// TODO: should seperate dummy and actual
const TestimonialActual = ({ data }: { data: MyDb["testimonial"] }) => {
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
      <div className="absolute bottom-0 z-10 flex h-4/5 w-full flex-col justify-end gap-sm rounded-b-md bg-gradient-to-t from-black to-transparent p-sm text-center text-lg text-white">
        <div className="overflow-auto scrollbar-hide">
          {data.text.length ? data.text : "Testimonial"}
        </div>
        <div className="shrink-0 font-medium">
          <p>
            {data.endorserName.length ? data.endorserName : "Endorser name"}
          </p>
        </div>
      </div>
    </>
  );
};

/*           <TextInputForm
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
          /> */
