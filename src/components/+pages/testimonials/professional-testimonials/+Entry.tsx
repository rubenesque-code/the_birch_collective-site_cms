import { UedCx } from "~/context/user-editable-data";

import { TextAreaForm, TextInputForm } from "~/components/forms";
import { UserSelectedImageWrapper } from "~/components/UserSelectedImageWrapper";
import { ConnectImage } from "~/components/DbImageWrapper";
import { CustomisableImage } from "~/components/CustomisableImage";
import { deepSortByIndex } from "~/helpers/data/process";
import React from "react";
import { ProfessionalTestimonialCx } from "~/context/entities/ProfessionalTestimonialCx";
import CmsLayout from "~/components/layouts/Cms";
import ProfessionalTestimonialsModal from "~/components/professional-testimonials-modal/+Entry";
import { DndKit } from "~/components/dnd-kit";
import { getIds } from "~/helpers/data/query";

const ProfessionalTestimonials = () => {
  return (
    <div className="group/testimonials">
      <Heading />
      <div>
        <Text />
      </div>
      <TestimonialsList />
    </div>
  );
};

export default ProfessionalTestimonials;

const Heading = () => {
  const {
    revision: { undoKey },
    store: {
      data: { professionals },
      actions: { professionals: professionalsAction },
    },
  } = UedCx.Pages.Testimonials.use();

  return (
    <div className="w-full text-center font-display text-5xl font-bold text-brandOrange">
      <TextAreaForm
        localStateValue={professionals.heading}
        onSubmit={professionalsAction.heading}
        key={undoKey}
        tooltip="Click to edit professionals heading"
        textArea={{
          placeholder: "Professionals heading",
          styles: "font-bold text-center",
        }}
      />
    </div>
  );
};

const Text = () => {
  const {
    revision: { undoKey },
    store: {
      data: { professionals },
      actions: { professionals: professionalsAction },
    },
  } = UedCx.Pages.Testimonials.use();

  return (
    <div className="custom-prose prose mt-md w-full max-w-full">
      <TextAreaForm
        localStateValue={professionals.text}
        textArea={{
          placeholder: "Professionals testimonials text",
        }}
        onSubmit={professionalsAction.text}
        tooltip="Click to edit professionals testimonials text"
        key={undoKey}
      />
    </div>
  );
};

const TestimonialsList = () => {
  const {
    store: { data, actions },
  } = UedCx.ProfessionalTestimonials.use();

  const sorted = React.useMemo(() => deepSortByIndex(data), [data]);

  return (
    <div className="mt-lg">
      <CmsLayout.EditBar className="opacity-50 transition-opacity duration-100 ease-in-out group-hover/testimonials:opacity-80 hover:!opacity-100">
        <ProfessionalTestimonialsModal
          button={({ openModal }) => (
            <CmsLayout.EditBar.Button.Edit
              buttonText="Edit testimonials"
              onClick={openModal}
            />
          )}
        />
      </CmsLayout.EditBar>
      {!sorted.length ? (
        <p className="mt-md text-gray-400">No professional testimonials yet.</p>
      ) : (
        <div className="mt-xl grid grid-cols-1 gap-xl">
          <DndKit.Context
            elementIds={getIds(sorted)}
            onReorder={actions.reorder}
          >
            {sorted.map((testimonial, i) => (
              <DndKit.Element elementId={testimonial.id} key={testimonial.id}>
                <ProfessionalTestimonialCx.Provider testimonial={testimonial}>
                  <Testimonial align={i % 2 === 0 ? "left" : "right"} />
                </ProfessionalTestimonialCx.Provider>
              </DndKit.Element>
            ))}
          </DndKit.Context>
        </div>
      )}
    </div>
  );
};

const Testimonial = ({ align }: { align: "left" | "right" }) => {
  const { endorserName, id, image, text, endorserTitle } =
    ProfessionalTestimonialCx.use();

  const {
    store: { actions },
  } = UedCx.ProfessionalTestimonials.use();

  return (
    <div className={`flex flex-col ${align === "right" ? "justify-end" : ""}`}>
      <div
        className={`flex items-center gap-md ${
          align === "right" ? "flex-row-reverse " : ""
        }`}
      >
        <div className="group/testimonial-image relative h-[80px] w-[80px] shrink-0 rounded-full">
          <UserSelectedImageWrapper
            dbImageId={image.dbConnections.imageId}
            placeholderText=""
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
          <div className="text-xl text-brandGreen">
            <TextInputForm
              localStateValue={endorserName}
              onSubmit={(inputValue) =>
                actions.endorserName({ id, newVal: inputValue })
              }
              input={{ placeholder: "Endorser name", styles: "font-semibold" }}
              tooltip="Click to edit endorser name"
            />
          </div>
          <div
            className={`mt-xxs text-lg text-brandBrown ${
              align === "right" ? "text-right" : ""
            }`}
          >
            <TextInputForm
              localStateValue={endorserTitle}
              onSubmit={(inputValue) =>
                actions.endorserTitle({ id, newVal: inputValue })
              }
              input={{
                placeholder: "Endorser job title",
              }}
              tooltip="Click to edit endorser job title"
            />
          </div>
        </div>
      </div>

      <div
        className={`custom-prose prose mt-sm  w-[600px] ${
          align === "right" ? "ml-auto" : ""
        }`}
      >
        <TextAreaForm
          localStateValue={text}
          onSubmit={(inputValue) => actions.text({ id, newVal: inputValue })}
          textArea={{
            placeholder: "testimonial text",
            styles: `w-full ${align === "right" ? "text-right " : ""}`,
          }}
          tooltip="Click to edit endorsement text"
        />
      </div>
    </div>
  );
};
{
  /* <div className="ml-auto">
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
              some of their time to help out, so we arranged for them to spend
              the day at one of our partner SEND schools in Milton Keynes. The
              guys took on the task clearing and rejuvenating a woodland and
              pond area, giving the children a fantastic camping, wildlife and
              outdoor adventure space that will benefit them all year round!
            </div>
          </div> */
}
