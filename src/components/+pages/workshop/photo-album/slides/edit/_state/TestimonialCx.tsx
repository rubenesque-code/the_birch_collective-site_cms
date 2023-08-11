import { createContext, useContext, type ReactNode } from "react";
import type { MyDb } from "~/types/database";

type ContextValue = MyDb["testimonial"];

const Context = createContext<ContextValue | null>(null);

function Provider({
  children,
  testimonial,
}: {
  children: ReactNode | ((args: ContextValue) => ReactNode);
  testimonial: MyDb["testimonial"];
}) {
  const value: ContextValue = testimonial;

  return (
    <Context.Provider value={value}>
      {typeof children === "function" ? children(value) : children}
    </Context.Provider>
  );
}

// should use zod for instead of checkObjectHasField?
const useThisContext = () => {
  const context = useContext(Context);

  if (!context) {
    throw new Error("RevisionContext.use must be used within its provider!");
  }

  return context;
};

function TestimonialCx() {
  throw new Error(
    "TestimonialCx exists for naming purposes only and should not be used as a component",
  );
}

export { TestimonialCx };

TestimonialCx.Provider = Provider;
TestimonialCx.use = useThisContext;
