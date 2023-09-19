import React from "react";
import { useStore } from "zustand";

import { createStore } from "./store/createStore";
import type { Store } from "./store/types";

import { getIds } from "~/helpers/data/query";
import { strArrayDivergence } from "~/helpers/query-arr";
import { useDocsRevisionData } from "~/hooks";
import { generateUid } from "~/lib/external-packages-rename";
import type { MyDb } from "~/types/database";
import type { DocPartialWithId } from "~/types/database/_helpers";

type ContextValue = { store: Store } & {
  revision: {
    isChange: boolean;
    undoKey: string;
    saveData: {
      created: MyDb["image"][];
      deleted: string[];
      updated: DocPartialWithId<MyDb["image"]>[];
    };
    handleUndo: () => void;
    onSaveSuccess: () => void;
  };
};

const Context = React.createContext<ContextValue | null>(null);

function Provider({
  children,
  dbData,
}: {
  children: React.ReactNode | ((args: ContextValue) => React.ReactNode);
  dbData: Store["data"];
}) {
  const [initData, setInitData] = React.useState(dbData);
  const [undoKey, setUndoKey] = React.useState(generateUid());

  const storeRef = React.useRef<ReturnType<typeof createStore>>();

  if (!storeRef.current) {
    storeRef.current = createStore({ initData: dbData });
  }

  const store = useStore(storeRef.current, (store) => store);

  React.useEffect(() => {
    // · on add or delete image (followng query refresh)
    if (dbData.length === initData.length) {
      return;
    }

    setInitData(dbData);

    if (dbData.length > initData.length) {
      const newImageIds = strArrayDivergence(getIds(dbData), getIds(initData));

      newImageIds.forEach((id) => {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        const newImage = dbData.find((image) => image.id === id)!;

        store.actions.add(newImage);
      });
    }

    if (dbData.length < initData.length) {
      const removedImageIds = strArrayDivergence(
        getIds(initData),
        getIds(dbData),
      );

      removedImageIds.forEach((id) => {
        store.actions.delete({ id });
      });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dbData]);

  const { isChange, saveData } = useDocsRevisionData({
    initData,
    updatedData: store.data,
  });

  const handleUndo = () => {
    if (!isChange) {
      return;
    }

    store.actions.overWrite(initData);

    setUndoKey(generateUid());
  };

  const value: ContextValue = {
    store,
    revision: {
      isChange,
      undoKey,
      saveData,
      handleUndo,
      onSaveSuccess: () => {
        setInitData(store.data);
      },
    },
  };

  return (
    <Context.Provider value={value}>
      {typeof children === "function" ? children(value) : children}
    </Context.Provider>
  );
}

function useContext() {
  const context = React.useContext(Context);
  if (!context) throw new Error("Missing ImagesDataCx.Provider in the tree");

  return context;
}

function ImagesDataCx() {
  throw new Error(
    "ImagesDataCx exists for naming purposes only and should not be used as a component",
  );
}

export { ImagesDataCx };

ImagesDataCx.Provider = Provider;
ImagesDataCx.use = useContext;
