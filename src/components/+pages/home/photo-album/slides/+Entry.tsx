import "swiper/css";

import React, { type ReactElement } from "react";
import type { Swiper as SwiperType } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

import { UserEditableDataCx } from "../../_state";

import { CustomisableImage } from "~/components/CustomisableImage";
import { DbImageWrapper } from "~/components/DbImageWrapper";
import { UserSelectedImageWrapper } from "~/components/UserSelectedImageWrapper";

const Slides = () => {
  const [swiper, setSwiper] = React.useState<SwiperType | null>(null);

  const {
    page: {
      photoAlbum: { images },
    },
  } = UserEditableDataCx.useAllData();

  return (
    <div className="relative">
      <Swiper
        spaceBetween={0}
        slidesPerView={1}
        onSwiper={(swiper) => setSwiper(swiper)}
        style={{
          paddingTop: 50,
          paddingBottom: 50,
        }}
      >
        {images.map((image, i) => {
          return (
            <SwiperSlide key={i}>
              <div className="">
                <UserSelectedImageWrapper
                  dbImageId={image.dbConnections.imageId}
                  placeholderText="photo album image"
                >
                  {({ dbImageId }) => (
                    <DbImageWrapper dbImageId={dbImageId}>
                      {({ urls }) => (
                        <CustomisableImage
                          urls={urls}
                          position={image.position}
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
    </div>
  );
};

export default Slides;
