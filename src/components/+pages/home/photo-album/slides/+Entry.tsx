import "swiper/css";

import React from "react";
import type { Swiper as SwiperType } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

import { UserEditableDataCx } from "../../_state";

import { CustomisableImage } from "~/components/CustomisableImage";
import { DbImageWrapper } from "~/components/DbImageWrapper";
import { UserSelectedImageWrapper } from "~/components/UserSelectedImageWrapper";
import { Icon } from "~/components/icons";

const Slides = () => {
  const [swiper, setSwiper] = React.useState<SwiperType | null>(null);

  const {
    page: {
      photoAlbum: { entries },
    },
  } = UserEditableDataCx.useAllData();

  return (
    <div className="absolute h-full w-full overflow-visible bg-blue-100">
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
        {entries.map((entry, i) => {
          return (
            <SwiperSlide key={i}>
              <div className="absolute h-full w-full">
                <UserSelectedImageWrapper
                  dbImageId={entry.image.dbConnections.imageId}
                  placeholderText="photo album image"
                >
                  {({ dbImageId }) => (
                    <DbImageWrapper dbImageId={dbImageId}>
                      {({ urls }) => (
                        <CustomisableImage
                          urls={urls}
                          position={entry.image.position}
                        />
                      )}
                    </DbImageWrapper>
                  )}
                </UserSelectedImageWrapper>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
      <Navigation
        swipeLeft={() => {
          swiper?.slidePrev();
        }}
        swipeRight={() => {
          swiper?.slideNext();
        }}
      />
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
}) => {
  return (
    <div
      className={`absolute left-0 top-0 z-20 flex h-full -translate-x-1/2 flex-col justify-center bg-opacity-70`}
    >
      <div className={``}>
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
};
