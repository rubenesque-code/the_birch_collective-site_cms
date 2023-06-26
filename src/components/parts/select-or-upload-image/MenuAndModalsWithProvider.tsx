import { MenuAndModals } from "./MenuAndModals";
import { ModalsVisibilityContext } from "./ModalsVisibiltyContext";

export const MenuAndModalsWithProvider = ({
  styles,
}: {
  styles?: { itemsWrapper?: string };
}) => (
  <ModalsVisibilityContext.Provider>
    {(visibilityState) => (
      <MenuAndModals visibilityState={visibilityState} styles={styles} />
    )}
  </ModalsVisibilityContext.Provider>
);
