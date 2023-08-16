import { createContext, useContext, type ReactNode } from "react";
import type { MyDb } from "~/types/database";

type ContextValue = MyDb["professional-testimonial"];

const Context = createContext<ContextValue | null>(null);

function Provider({
  children,
  testimonial,
}: {
  children: ReactNode | ((args: ContextValue) => ReactNode);
  testimonial: MyDb["professional-testimonial"];
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
      "ProfessionalTestimonialCx.use must be used within its provider!",
    );
  }

  return context;
};

function ProfessionalTestimonialCx() {
  throw new Error(
    "ProfessionalTestimonialCx exists for naming purposes only and should not be used as a component",
  );
}

export { ProfessionalTestimonialCx };

ProfessionalTestimonialCx.Provider = Provider;
ProfessionalTestimonialCx.use = useThisContext;
