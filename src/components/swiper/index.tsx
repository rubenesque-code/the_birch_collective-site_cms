import "swiper/css";

import { type ReactElement, useState } from "react";
import type { Swiper as SwiperType } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

import { CaretLeft, CaretRight } from "@phosphor-icons/react";
import { useMeasure } from "react-use";

export const Slides = ({ slides }: { slides: ReactElement[] }) => {
  const [swiper, setSwiper] = useState<SwiperType | null>(null);

  const navButtonsFuncs = {
    swipeLeft: () => swiper?.slidePrev(),
    swipeRight: () => swiper?.slideNext(),
  };

  return (
    <MeasureWidth>
      {(containerWidth) => {
        const numSlidesPerView = containerWidth > 900 ? 3 : 2;
        const navigationIsShowing = swiper && slides.length > numSlidesPerView;

        return (
          <Swiper
            spaceBetween={0}
            slidesPerView={numSlidesPerView}
            onSwiper={(swiper) => setSwiper(swiper)}
          >
            {slides.map((slide, i) => (
              // `SwiperSlide`, as it's imported from swiper/react, needs to be a direct child of `Swiper`; can't be within another component.
              <SwiperSlide key={i}>
                <div className={`h-full border-r p-sm`}>{slide}</div>
              </SwiperSlide>
            ))}
            {navigationIsShowing ? <Navigation_ {...navButtonsFuncs} /> : null}
          </Swiper>
        );
      }}
    </MeasureWidth>
  );
};

const Navigation_ = ({
  swipeLeft,
  swipeRight,
}: {
  swipeLeft: () => void;
  swipeRight: () => void;
}) => {
  return (
    <div
      className={`absolute right-0 top-0 z-20 flex h-full min-w-[110px] flex-col justify-center bg-opacity-70`}
    >
      <div className={`-translate-x-sm `}>
        <button
          className={`bg-white p-xs text-3xl opacity-60 hover:opacity-90`}
          onClick={swipeLeft}
          type="button"
        >
          <CaretLeft />
        </button>
        <button
          onClick={swipeRight}
          className={`bg-white p-xs text-3xl`}
          type="button"
        >
          <CaretRight />
        </button>
      </div>
    </div>
  );
};

// todo: ideally, should clone children and wait for width?
function MeasureWidth({
  children,
  styles = "",
}: {
  children: (width: number) => ReactElement | null;
  styles?: "";
}) {
  const [ref, { width }] = useMeasure<HTMLDivElement>();

  return (
    <div className={`w-full ${styles}`} ref={ref}>
      {children(width)}
    </div>
  );
}
