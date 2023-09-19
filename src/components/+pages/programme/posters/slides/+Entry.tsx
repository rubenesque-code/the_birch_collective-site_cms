import "swiper/css";

import React, { useMemo } from "react";
import type { Swiper as SwiperType } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

import { ConnectImage } from "~/components/ConnectImage";
import { CustomisableImage } from "~/components/CustomisableImage";
import { Icon } from "~/components/icons";
import { ImagePlaceholder } from "~/components/ImagePlaceholder";
import { UserSelectedImageWrapper } from "~/components/UserSelectedImageWrapper";

import { UedCx } from "~/context/user-editable-data";
import { deepSortByIndex } from "~/helpers/data/process";

const Slides = () => {
  const [swiper, setSwiper] = React.useState<SwiperType | null>(null);

  const {
    store: {
      data: { posters },
    },
  } = UedCx.Programme.use();

  const sorted = useMemo(() => deepSortByIndex(posters), [posters]);

  return (
    <div className="relative flex h-full w-full justify-end">
      {!posters.length ? (
        <div className="absolute h-full w-full">
          <ImagePlaceholder placeholderText="flyers" />
        </div>
      ) : (
        <Swiper
          spaceBetween={0}
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
                  placeholderText="programme poster"
                >
                  {({ dbImageId }) => (
                    <ConnectImage connectedImageId={dbImageId}>
                      {({ urls }) => (
                        <CustomisableImage urls={urls} objectFit="contain" />
                      )}
                    </ConnectImage>
                  )}
                </UserSelectedImageWrapper>
              </SwiperSlide>
            );
          })}
        </Swiper>
      )}

      {sorted.length > 1 ? (
        <Navigation
          swipeLeft={() => swiper?.slidePrev()}
          swipeRight={() => swiper?.slideNext()}
        />
      ) : null}
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
  <div
    className={`absolute bottom-0 left-0 z-20 flex h-full -translate-x-1/2 flex-col justify-end bg-opacity-70`}
  >
    <div>
      <button
        className={`bg-gray-200 p-xs text-xl opacity-60 transition-opacity duration-100 ease-in-out hover:opacity-90`}
        onClick={swipeLeft}
        type="button"
      >
        <Icon.CaretLeft />
      </button>
      <button
        onClick={swipeRight}
        className={`bg-white p-xs text-xl opacity-60 transition-opacity duration-100 ease-in-out hover:opacity-90`}
        type="button"
      >
        <Icon.CaretRight />
      </button>
    </div>
  </div>
);
