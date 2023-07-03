import { Slides } from "~/components/swiper";
import { useHovered } from "~/hooks";
import { NextImage } from "~/lib/external-packages-rename";
import { dummyData } from "~/static-data";

export const TestimonialSlides = () => {
  return (
    <div>
      <Slides
        numSlidesTotal={4}
        slides={({ leftMost, rightMost }) =>
          [1, 2, 3, 4].map((_, i) => {
            console.log("leftMost:", leftMost);
            console.log("rightMost:", rightMost);
            return (
              <Testimonial
                isFirst={i === leftMost}
                isLast={i === rightMost}
                key={i}
              />
            );
          })
        }
      />
    </div>
  );
};

const Testimonial = ({
  isFirst,
  isLast,
}: {
  isFirst?: boolean;
  isLast?: boolean;
}) => {
  const [isHovered, { hoverHandlers }] = useHovered();

  return (
    <div
      className={`relative aspect-[3/4] border-2 border-white transition-transform duration-[275ms] ease-[cubic-bezier(0.24,0.26,0.2,1)] ${
        isHovered ? "md:scale-115" : "scale-100"
      } ${isFirst ? "origin-left" : ""} ${isLast ? "origin-right" : ""}`}
      {...hoverHandlers}
    >
      <NextImage
        alt=""
        className="absolute h-full w-full"
        fill
        src={dummyData.imageSrc}
        style={{
          objectFit: "cover",
        }}
      />
    </div>
  );
};
