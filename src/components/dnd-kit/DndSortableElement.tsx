import { type ReactElement } from "react";
import {
  defaultAnimateLayoutChanges,
  rectSortingStrategy,
  useSortable,
  type AnimateLayoutChanges,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { WithTooltip } from "../WithTooltip";
import { Icon } from "../icons";

export const DndSortableElement = ({
  isDisabled = false,
  children,
  elementId,
  styles,
}: {
  children: ReactElement;
  elementId: string;
  isDisabled?: boolean;
  styles?: {
    wrapper?: string;
    handle?: string;
  };
}): ReactElement => {
  const animateLayoutChanges: AnimateLayoutChanges = (args) =>
    defaultAnimateLayoutChanges({ ...args });

  const {
    attributes,
    listeners,
    setActivatorNodeRef,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: elementId,
    disabled: isDisabled,
    strategy: rectSortingStrategy,
    animateLayoutChanges,
  });

  const style = {
    transform: CSS.Translate.toString(transform),
    transition,
  };

  return (
    <>
      <div
        className={`group/dndElement relative transition-opacity duration-100 ease-in-out ${
          isDragging ? "z-50 opacity-40" : ""
        } ${styles?.wrapper || ""}`}
        style={style}
        ref={setNodeRef}
      >
        {children}
        <div
          className={`absolute right-0 top-1/2 z-30 grid -translate-y-1/2 place-items-center rounded-sm py-1 opacity-0 transition-opacity duration-150 ease-in-out group-hover/dndElement:opacity-40 hover:!opacity-100 ${
            styles?.handle || ""
          }`}
        >
          <WithTooltip text="drag to change position" isDisabled={isDragging}>
            <button
              className="text-2xl"
              style={{
                cursor: isDragging ? "grabbing" : "grab",
              }}
              type="button"
              {...attributes}
              {...listeners}
              ref={setActivatorNodeRef}
            >
              <Icon.DndHandle />
            </button>
          </WithTooltip>
        </div>
      </div>
      {isDragging ? <div className="fixed inset-0 z-40 "></div> : null}
    </>
  );
};
