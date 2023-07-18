import { MyMenu } from "~/components/styled-bases";
import { ComponentMenu } from ".";
import { Icon } from "~/components/icons";
import { WithTooltip } from "~/components/WithTooltip";

const ImagePositionMenu = ({
  position,
  updateX,
  updateY,
  styles,
}: {
  position: { x: number; y: number };
  updateX: (newPosition: number) => void;
  updateY: (newPosition: number) => void;
  styles?: { wrapper?: string };
}) => {
  return (
    <MyMenu
      button={
        <ComponentMenu.Button tooltip="show position controls">
          <Icon.ChangePos />
        </ComponentMenu.Button>
      }
      styles={{
        itemsWrapper: styles?.wrapper,
      }}
    >
      {({ close: closeMenu }) => (
        <>
          <ComponentMenu styles="opacity-100">
            <ComponentMenu.Button
              onClick={() => {
                if (position.x === 0) {
                  return;
                }
                const newPosition = position.x - 10;
                updateX(newPosition);
              }}
              tooltip="move image focus to the left"
              isDisabled={position.x === 0}
            >
              <Icon.PosLeft />
            </ComponentMenu.Button>
            <ComponentMenu.Button
              onClick={() => {
                if (position.x === 100) {
                  return;
                }
                const newPosition = position.x + 10;
                updateX(newPosition);
              }}
              tooltip="move image focus to the right"
              isDisabled={position.x === 100}
            >
              <Icon.PosRight />
            </ComponentMenu.Button>

            <ComponentMenu.Button
              onClick={() => {
                if (position.y === 0) {
                  return;
                }
                const newPosition = position.y - 10;
                updateY(newPosition);
              }}
              tooltip="show higher part of the image"
              isDisabled={position.y === 0}
            >
              <Icon.PosDown />
            </ComponentMenu.Button>
            <ComponentMenu.Button
              onClick={() => {
                if (position.y === 100) {
                  return;
                }
                const newPosition = position.y + 10;
                updateY(newPosition);
              }}
              tooltip="show lower part of the image"
              isDisabled={position.y === 100}
            >
              <Icon.PosUp />
            </ComponentMenu.Button>

            <ComponentMenu.Divider />

            <WithTooltip text="The position of the image won't necessarily change - it depends on its natural aspect ratio against the aspect ratio of its container.">
              <div className="cursor-help text-gray-400">
                <Icon.Info />
              </div>
            </WithTooltip>

            <ComponentMenu.Divider />

            <ComponentMenu.Button
              onClick={closeMenu}
              tooltip="close position controls"
              styles={{ button: "text-gray-600" }}
            >
              <Icon.HideExpandable />
            </ComponentMenu.Button>
          </ComponentMenu>
        </>
      )}
    </MyMenu>
  );
};

export { ImagePositionMenu };
