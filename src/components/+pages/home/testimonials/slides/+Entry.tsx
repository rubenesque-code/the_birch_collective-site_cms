import "swiper/css";

import { useState, type ReactElement } from "react";
import type { Swiper as SwiperType } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

import { useMeasure } from "react-use";
import { Icon } from "~/components/icons";

export const Slides = ({
  numSlidesTotal,
  slides,
}: {
  numSlidesTotal: number;
  slides: (arg0: { leftMost: number; rightMost: number }) => ReactElement[];
}) => {
  const [swiper, setSwiper] = useState<SwiperType | null>(null);
  const [hoveredSlide, setHoveredSlide] = useState<number | null>(null);
  const [leftMostIndex, setLeftMostIndex] = useState(0);

  return (
    <MeasureWidth>
      {(containerWidth) => {
        const numSlidesInView = containerWidth > 900 ? 3 : 2;
        const navigationIsShowing = true;

        return (
          <Swiper
            spaceBetween={0}
            slidesPerView={numSlidesInView}
            onSwiper={(swiper) => setSwiper(swiper)}
            style={{
              paddingTop: 50,
              paddingBottom: 50,
            }}
          >
            {slides({
              leftMost: leftMostIndex,
              rightMost: leftMostIndex + numSlidesInView - 1,
            }).map((slide, i) => {
              return (
                // · `SwiperSlide`, as it's imported from swiper/react, needs to be a direct child of `Swiper`; can't be within another component.
                <SwiperSlide
                  key={i}
                  style={{
                    zIndex: i === hoveredSlide ? 10 : 0,
                  }}
                >
                  <SlideWrapper
                    onMouseEnter={() => setHoveredSlide(i)}
                    onMouseLeave={() => setHoveredSlide(null)}
                  >
                    {slide}
                  </SlideWrapper>
                </SwiperSlide>
              );
            })}
            {navigationIsShowing ? (
              <Navigation
                swipeLeft={() => {
                  swiper?.slidePrev();
                  if (leftMostIndex > 0) {
                    setLeftMostIndex(leftMostIndex - 1);
                  }
                }}
                swipeRight={() => {
                  swiper?.slideNext();
                  if (leftMostIndex < numSlidesTotal - numSlidesInView) {
                    setLeftMostIndex(leftMostIndex + 1);
                  }
                }}
              />
            ) : null}
          </Swiper>
        );
      }}
    </MeasureWidth>
  );
};

const SlideWrapper = (props: {
  children: ReactElement;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}) => {
  return <div className={`h-full pr-sm`} {...props} />;
};

const Navigation = ({
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
          <Icon.CaretLeft />
        </button>
        <button
          onClick={swipeRight}
          className={`bg-white p-xs text-3xl`}
          type="button"
        >
          <Icon.CaretRight />
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
