import {
  ComponentApi,
  ModalsVisibilityContext,
  type ComponentAPIProps,
} from "./_state";
import { MenuAndModals } from "./MenuAndModals";

export const MenuAndModalsWithProviders = (props: ComponentAPIProps) => (
  <ComponentApi.Provider {...props}>
    <ModalsVisibilityContext.Provider>
      <MenuAndModals />
    </ModalsVisibilityContext.Provider>
  </ComponentApi.Provider>
);
