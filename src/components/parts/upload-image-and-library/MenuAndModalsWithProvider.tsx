import { MenuAndModals } from "./MenuAndModals";
import {
  ModalsVisibilityContext,
  ComponentAPI,
  type ComponentAPIProps,
} from "./_state";

export const MenuAndModalsWithProviders = (props: ComponentAPIProps) => (
  <ComponentAPI.Provider {...props}>
    <ModalsVisibilityContext.Provider>
      <MenuAndModals />
    </ModalsVisibilityContext.Provider>
  </ComponentAPI.Provider>
);
