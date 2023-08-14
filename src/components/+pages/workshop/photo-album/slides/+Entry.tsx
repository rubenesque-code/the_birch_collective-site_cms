import "swiper/css";

import React, { type ReactElement, useMemo } from "react";
import type { Swiper as SwiperType } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { useMeasure } from "react-use";

import { CustomisableImage } from "~/components/CustomisableImage";
import { ConnectImage } from "~/components/DbImageWrapper";
import { ImagePlaceholder } from "~/components/ImagePlaceholder";
import { UserSelectedImageWrapper } from "~/components/UserSelectedImageWrapper";
import { Icon } from "~/components/icons";
import { UedCx } from "~/context/user-editable-data";
import { deepSortByIndex } from "~/helpers/data/process";

const Slides = ({ heading }: { heading: ReactElement }) => {
  const [swiper, setSwiper] = React.useState<SwiperType | null>(null);

  const {
    store: {
      data: {
        photoAlbum: { entries },
      },
    },
  } = UedCx.Pages.Workshop.use();

  const sorted = useMemo(() => deepSortByIndex(entries), [entries]);

  const [containerRef, { width: containerWidth, height: containerHeight }] =
    useMeasure<HTMLDivElement>();

  return (
    <div className="h-full w-full">
      <div
        className="relative flex h-full w-full justify-end"
        ref={containerRef}
      >
        {!entries.length ? (
          <div className="absolute h-full w-full">
            <ImagePlaceholder placeholderText="workshop photo" />
          </div>
        ) : (
          <Swiper
            spaceBetween={30}
            slidesPerView={1}
            onSwiper={(swiper) => setSwiper(swiper)}
            style={{
              position: "absolute",
              width: "100%",
              height: "100%",
            }}
          >
            {sorted.map((entry, i) => {
              return (
                <SwiperSlide key={i}>
                  <UserSelectedImageWrapper
                    dbImageId={entry.image.dbConnections.imageId}
                    placeholderText="workshop photo"
                  >
                    {({ dbImageId }) =>
                      containerWidth && containerHeight ? (
                        <ConnectImage dbImageId={dbImageId}>
                          {({ urls, naturalDimensions }) => {
                            const aspectRatio =
                              naturalDimensions.width /
                              naturalDimensions.height;

                            const isLandscape =
                              naturalDimensions.width >
                              naturalDimensions.height;

                            let width: number;
                            let height: number;

                            if (isLandscape) {
                              width = containerWidth;
                              height = containerWidth / aspectRatio;
                            } else {
                              height = containerHeight;
                              width = containerHeight * aspectRatio;
                            }

                            return (
                              <div
                                className="absolute right-0 top-1/2 grid -translate-y-1/2 place-items-center bg-gray-100"
                                style={{ width, height }}
                              >
                                <CustomisableImage
                                  urls={urls}
                                  objectFit="contain"
                                />
                                <div className="text-center">
                                  <p>fetching image...</p>
                                  <span>
                                    <Icon.ImageLoading />
                                  </span>
                                </div>
                              </div>
                            );
                          }}
                        </ConnectImage>
                      ) : null
                    }
                  </UserSelectedImageWrapper>
                </SwiperSlide>
              );
            })}
          </Swiper>
        )}
      </div>

      <div className="flex justify-end">
        <div className="mt-xs inline-flex justify-end gap-xl bg-white/40 px-sm">
          {sorted.length > 1 ? (
            <Navigation
              swipeLeft={() => swiper?.slidePrev()}
              swipeRight={() => swiper?.slideNext()}
            />
          ) : null}

          <div>{heading}</div>
        </div>
      </div>
    </div>
  );
};

export default Slides;

const Navigation = ({
  swipeLeft,
  swipeRight,
}: {
  swipeLeft: () => void;
  swipeRight: () => void;
}) => (
  <div className="flex gap-md">
    <button
      className={`text-lg opacity-60 transition-opacity duration-100 ease-in-out hover:opacity-90`}
      onClick={swipeLeft}
      type="button"
    >
      <Icon.CaretLeft />
    </button>

    <button
      onClick={swipeRight}
      className={`text-lg opacity-60 transition-opacity duration-100 ease-in-out hover:opacity-90`}
      type="button"
    >
      <Icon.CaretRight />
    </button>
  </div>
);
