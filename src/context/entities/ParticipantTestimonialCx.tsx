import { createContext, useContext, type ReactNode } from "react";
import type { MyDb } from "~/types/database";

type ContextValue = MyDb["participant-testimonial"];

const Context = createContext<ContextValue | null>(null);

function Provider({
  children,
  testimonial,
}: {
  children: ReactNode | ((args: ContextValue) => ReactNode);
  testimonial: MyDb["participant-testimonial"];
}) {
  const value: ContextValue = testimonial;

  return (
    <Context.Provider value={value}>
      {typeof children === "function" ? children(value) : children}
    </Context.Provider>
  );
}

const useThisContext = () => {
  const context = useContext(Context);

  if (!context) {
    throw new Error(
      "ParticipantTestimonialCx.use must be used within its provider!",
    );
  }

  return context;
};

function ParticipantTestimonialCx() {
  throw new Error(
    "ParticipantTestimonialCx exists for naming purposes only and should not be used as a component",
  );
}

export { ParticipantTestimonialCx };

ParticipantTestimonialCx.Provider = Provider;
ParticipantTestimonialCx.use = useThisContext;
