import "swiper/css";

import React, { useMemo } from "react";
import type { Swiper as SwiperType } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

import { CustomisableImage } from "~/components/CustomisableImage";
import { ConnectImage } from "~/components/DbImageWrapper";
import { UserSelectedImageWrapper } from "~/components/UserSelectedImageWrapper";
import { Icon } from "~/components/icons";
import { UedCx } from "~/context/user-editable-data";
import { deepSortByIndex } from "~/helpers/data/process";
import { ImagePlaceholder } from "~/components/ImagePlaceholder";

const Slides = () => {
  const [swiper, setSwiper] = React.useState<SwiperType | null>(null);

  const {
    store: {
      data: {
        photoAlbum: { entries },
      },
    },
  } = UedCx.Programme.use();

  const sorted = useMemo(() => deepSortByIndex(entries), [entries]);

  return (
    <div className="absolute h-full w-full overflow-visible bg-blue-100">
      {!entries.length ? (
        <div className="absolute h-full w-full">
          <ImagePlaceholder placeholderText="workshop photo" />
        </div>
      ) : (
        <>
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
                  <div className="absolute h-full w-full">
                    <UserSelectedImageWrapper
                      dbImageId={entry.image.dbConnections.imageId}
                      placeholderText="photo album image"
                    >
                      {({ dbImageId }) => (
                        <ConnectImage dbImageId={dbImageId}>
                          {({ urls }) => (
                            <CustomisableImage
                              urls={urls}
                              position={entry.image.position}
                            />
                          )}
                        </ConnectImage>
                      )}
                    </UserSelectedImageWrapper>
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>
          <Navigation
            swipeLeft={() => swiper?.slidePrev()}
            swipeRight={() => swiper?.slideNext()}
          />
        </>
      )}
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
    className={`absolute left-0 top-0 z-20 flex h-full -translate-x-1/2 flex-col justify-center bg-opacity-70`}
  >
    <div>
      <button
        className={`bg-gray-200 p-xs text-3xl opacity-60 transition-opacity duration-100 ease-in-out hover:opacity-90`}
        onClick={swipeLeft}
        type="button"
      >
        <Icon.CaretLeft />
      </button>
      <button
        onClick={swipeRight}
        className={`bg-white p-xs text-3xl opacity-60 transition-opacity duration-100 ease-in-out hover:opacity-90`}
        type="button"
      >
        <Icon.CaretRight />
      </button>
    </div>
  </div>
);
