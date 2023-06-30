import { MenuAndModals } from "./MenuAndModals";
import {
  ModalsVisibility,
  ComponentAPI,
  type ComponentAPIContextValue,
} from "./_state";

export const MenuAndModalsWithProviders = (props: ComponentAPIContextValue) => (
  <ComponentAPI.Provider {...props}>
    <ModalsVisibility.Provider>
      <MenuAndModals />
    </ModalsVisibility.Provider>
  </ComponentAPI.Provider>
);
