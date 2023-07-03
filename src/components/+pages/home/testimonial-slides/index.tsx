import { Slides } from "~/components/swiper";

export const TestimonialSlides = () => {
  return (
    <div>
      <Slides
        slides={[1, 2, 3, 4].map((_, i) => (
          <Slide key={i} />
        ))}
      />
    </div>
  );
};

const Slide = () => {
  return <div className="h-[200px] bg-gray-400">Hello</div>;
};
