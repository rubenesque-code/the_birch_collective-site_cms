import { MyModal } from "~/components/styled-bases";
import { Button } from "./Button";
import { SaveContext } from "./_state";
import { Icon } from "~/components/icons";
import { WarningPanel } from "~/components/WarningPanel";
import { useToast } from "~/hooks";

// □ ideally, a delay on undone toast

export const Revision = () => (
  <div className="flex items-center gap-md">
    <Undo />
    <Save />
  </div>
);

const Undo = () => {
  const {
    actions: { undo },
    data: { isChange },
  } = SaveContext.use();

  const toast = useToast();

  return (
    <MyModal.DefaultButtonAndPanel
      button={({ openModal }) => (
        <Button
          icon={<Icon.Undo weight="light" />}
          onClick={() => isChange && openModal()}
          tooltip={(isChange) =>
            isChange ? "undo all changes since last save" : "nothing to undo"
          }
        />
      )}
      panelContent={({ closeModal }) => (
        <WarningPanel
          callback={() => {
            undo();
            closeModal();
            toast.neutral("undone");
          }}
          closeModal={closeModal}
          text={{
            body: "Are you sure? This can't be undone.",
            title: "Undo changes since last save",
          }}
        />
      )}
    />
  );
};

const Save = () => {
  const {
    actions: { save },
    data: { isChange },
  } = SaveContext.use();

  return (
    <Button
      icon={<Icon.Save weight="light" />}
      onClick={save}
      tooltip={(isChange) => (isChange ? "save" : "nothing to save")}
    >
      <span
        className={`absolute left-[2.5px] top-[2.5px] h-[8px] w-[8px] rounded-full bg-green-active transition-opacity ease-in-out ${
          !isChange ? "opacity-0" : "opacity-100"
        }`}
      />
    </Button>
  );
};
