import { UedCx } from "~/context/user-editable-data";

import { TextAreaForm } from "~/components/forms";
import { UserSelectedImageWrapper } from "~/components/UserSelectedImageWrapper";
import { ConnectImage } from "~/components/DbImageWrapper";
import { CustomisableImage } from "~/components/CustomisableImage";

const ProfessionalTestimonials = () => {
  return (
    <div className="">
      <Text />
    </div>
  );
};

export default ProfessionalTestimonials;

const Text = () => {
  const {
    revision: { undoKey },
    store: {
      data: { participants },
      actions: { participants: participantsAction },
    },
  } = UedCx.Pages.Testimonials.use();

  return (
    <div>
      <div className="w-full text-center font-display text-5xl font-bold text-brandOrange">
        Professionals
      </div>
      <div className="mt-xl flex flex-col gap-xl">
        <div className="">
          <div className="flex items-center gap-md">
            <div className="group/amy-image relative h-[80px] w-[80px] shrink-0 rounded-full">
              <UserSelectedImageWrapper
                dbImageId={"5cc91205-fad7-4fb2-8af7-7f9ed192a097"}
                placeholderText="amy image"
                isCircle
              >
                {({ dbImageId }) => (
                  <ConnectImage dbImageId={dbImageId}>
                    {({ urls }) => (
                      <CustomisableImage
                        urls={urls}
                        position={{ x: 50, y: 50 }}
                        objectFit="cover"
                        isCircle
                      />
                    )}
                  </ConnectImage>
                )}
              </UserSelectedImageWrapper>
            </div>
            <div>
              <div className="text-xl font-semibold text-brandGreen">
                Dave Chukwa
              </div>
              <div className="mt-xxs text-lg text-brandBrown">
                Social Worker
              </div>
            </div>
          </div>

          <div className="custom-prose prose mt-sm max-w-[600px]">
            Doug, Brent and Gary from Worldpay FIS really wanted to volunteer
            some of their time to help out, so we arranged for them to spend the
            day at one of our partner SEND schools in Milton Keynes. The guys
            took on the task clearing and rejuvenating a woodland and pond area,
            giving the children a fantastic camping, wildlife and outdoor
            adventure space that will benefit them all year round!
          </div>
        </div>

        <div className="ml-auto">
          <div className="flex items-center justify-end gap-md">
            <div>
              <div className="text-xl font-semibold text-brandGreen">
                Dave Chukwa
              </div>
              <div className="mt-xxs text-lg text-brandBrown">
                Social Worker
              </div>
            </div>

            <div className="group/amy-image relative h-[80px] w-[80px] shrink-0 rounded-full">
              <UserSelectedImageWrapper
                dbImageId={"5cc91205-fad7-4fb2-8af7-7f9ed192a097"}
                placeholderText="amy image"
                isCircle
              >
                {({ dbImageId }) => (
                  <ConnectImage dbImageId={dbImageId}>
                    {({ urls }) => (
                      <CustomisableImage
                        urls={urls}
                        position={{ x: 50, y: 50 }}
                        objectFit="cover"
                        isCircle
                      />
                    )}
                  </ConnectImage>
                )}
              </UserSelectedImageWrapper>
            </div>
          </div>

          <div className="custom-prose prose mt-sm max-w-[600px]">
            Doug, Brent and Gary from Worldpay FIS really wanted to volunteer
            some of their time to help out, so we arranged for them to spend the
            day at one of our partner SEND schools in Milton Keynes. The guys
            took on the task clearing and rejuvenating a woodland and pond area,
            giving the children a fantastic camping, wildlife and outdoor
            adventure space that will benefit them all year round!
          </div>
        </div>

        <div className="">
          <div className="flex items-center gap-md">
            <div className="group/amy-image relative h-[80px] w-[80px] shrink-0 rounded-full">
              <UserSelectedImageWrapper
                dbImageId={"5cc91205-fad7-4fb2-8af7-7f9ed192a097"}
                placeholderText="amy image"
                isCircle
              >
                {({ dbImageId }) => (
                  <ConnectImage dbImageId={dbImageId}>
                    {({ urls }) => (
                      <CustomisableImage
                        urls={urls}
                        position={{ x: 50, y: 50 }}
                        objectFit="cover"
                        isCircle
                      />
                    )}
                  </ConnectImage>
                )}
              </UserSelectedImageWrapper>
            </div>
            <div>
              <div className="text-xl font-semibold text-brandGreen">
                Dave Chukwa
              </div>
              <div className="mt-xxs text-lg text-brandBrown">
                Social Worker
              </div>
            </div>
          </div>

          <div className="custom-prose prose mt-sm max-w-[600px]">
            Doug, Brent and Gary from Worldpay FIS really wanted to volunteer
            some of their time to help out, so we arranged for them to spend the
            day at one of our partner SEND schools in Milton Keynes. The guys
            took on the task clearing and rejuvenating a woodland and pond area,
            giving the children a fantastic camping, wildlife and outdoor
            adventure space that will benefit them all year round!
          </div>
        </div>
      </div>
    </div>
  );
};
