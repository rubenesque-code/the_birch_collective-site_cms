import { useState } from "react";

import { Icon } from "~/components/icons";
import { MyMenu } from "~/components/styled-bases";
import { WithTooltip } from "~/components/WithTooltip";

import { NewImageCx } from "../_state";

import { UedCx } from "~/context/user-editable-data";
import { getIds } from "~/helpers/data/query";
import { fuzzySearch } from "~/helpers/fuzzy-search";
import { strArrayDivergence } from "~/helpers/query-arr";
import { generateUid } from "~/lib/external-packages-rename";
import type { MyDb } from "~/types/database";

const Keywords = () => (
  <div className="">
    <div className="flex items-center justify-between border-b pb-xs">
      <div className="flex items-center gap-sm">
        <h3 className="text-gray-800">Keywords</h3>
        <span className="italic text-gray-300">optional</span>
      </div>
      <div className="flex items-center gap-xs text-sm text-gray-400">
        <span>
          <Icon.Info />
        </span>
        <p>Can be used to search for images in future.</p>
      </div>
    </div>
    <div className="mt-md">
      <ImageKeywords />
    </div>
    <div className="mt-md">
      <AddKeyword />
    </div>
  </div>
);

export default Keywords;

const ImageKeywords = () => {
  const newImageStore = NewImageCx.use();

  const {
    store: { data: keywordStore },
  } = UedCx.Keywords.use();

  const entries = (
    newImageStore.data.keywords
      .map((entry) => ({
        id: entry.id,
        connectedKeyword: keywordStore.find(
          (keyword) => keyword.id === entry.dbConnections.keywordId,
        ),
      }))
      .filter((entry) => entry.connectedKeyword) as {
      id: string;
      connectedKeyword: MyDb["keyword"];
    }[]
  ).sort((a, b) =>
    a.connectedKeyword.text.localeCompare(b.connectedKeyword.text),
  );

  return (
    <div className="">
      {!newImageStore.data.keywords.length ? (
        <p className="text-gray-400">None yet.</p>
      ) : (
        <div className="flex flex-wrap items-center gap-x-sm gap-y-xs">
          {entries.map((entry, i) => (
            <div
              className="group/keyword relative border-b border-transparent text-sm text-gray-500 transition-all duration-100 ease-in-out hover:border-gray-300"
              key={entry.id}
            >
              <span>{entry.connectedKeyword.text}</span>

              {i < entries.length - 1 ? "," : ""}

              <WithTooltip text="remove">
                <div
                  className="absolute right-0 top-0 -translate-y-full cursor-pointer rounded-full p-xxs text-xs opacity-0 transition-opacity duration-100 ease-in-out group-hover/keyword:opacity-100 hover:bg-gray-100 hover:text-my-alert-content"
                  onClick={() =>
                    newImageStore.actions.keywords.remove({
                      findBy: { id: entry.id },
                    })
                  }
                >
                  <Icon.Remove />
                </div>
              </WithTooltip>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const AddKeyword = () => (
  <MyMenu
    button={
      <div className="inline-flex cursor-pointer items-center gap-xs rounded-md border px-xs py-xxs text-sm text-gray-400 transition-all duration-75 ease-in-out hover:bg-gray-100">
        <span>
          <Icon.Keyword />
        </span>
        <span>Add keyword</span>
      </div>
    }
    styles={{ itemsWrapper: "border translate-y-xxs" }}
  >
    <AddKeywordPanel />
  </MyMenu>
);

const AddKeywordPanel = () => {
  const [inputValue, setInputValue] = useState("");

  const newImageStore = NewImageCx.use();

  const { store: keywordStore } = UedCx.Keywords.use();

  const existingKeywordMatch = keywordStore.data.find(
    (keyword) => keyword.text.toLowerCase() === inputValue.toLowerCase(),
  );

  const existingKeywordMatchIsAlreadyConnected = existingKeywordMatch
    ? newImageStore.data.keywords.some(
        (entry) => entry.dbConnections.keywordId === existingKeywordMatch.id,
      )
    : null;

  const inputValueIsValid =
    inputValue.length && !existingKeywordMatchIsAlreadyConnected;

  const handleSubmit = () => {
    if (!inputValueIsValid) {
      return;
    }

    if (existingKeywordMatch) {
      newImageStore.actions.keywords.add({
        id: generateUid(),
        dbConnections: { keywordId: existingKeywordMatch.id },
      });

      setInputValue("");

      return;
    }

    const newKeywordId = generateUid();

    keywordStore.actions.create({ id: newKeywordId, text: inputValue });

    newImageStore.actions.keywords.add({
      id: generateUid(),
      dbConnections: { keywordId: newKeywordId },
    });

    setInputValue("");
  };

  return (
    <div className="">
      <form
        className="relative flex items-center gap-sm border-b py-xs pl-2xl pr-xl"
        onSubmit={(e) => {
          e.preventDefault();

          handleSubmit();
        }}
        onKeyDown={(e) => {
          if (e.code === "Enter" || e.code === "Space") {
            e.stopPropagation();
          }
        }}
      >
        <div className="relative">
          <input
            className={`min-w-[220px] rounded-sm py-xxs text-gray-700 focus-within:bg-gray-50`}
            type="text"
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Search for or add keyword..."
            value={inputValue}
            size={1}
            autoComplete="one-time-code"
            id="keyword-input"
          />
          <label
            className="absolute -left-[3rem] top-1/2 -translate-x-full -translate-y-1/2"
            htmlFor="keyword-input"
          >
            <SearchOrAddIcon />
          </label>
        </div>

        <div
          className={`text-xs text-gray-400 ${
            inputValueIsValid ? "opacity-100" : "opacity-0"
          }`}
        >
          Press enter to submit
        </div>
      </form>

      <SearchList inputValue={inputValue} />
    </div>
  );
};

const SearchOrAddIcon = () => (
  <div className="relative text-gray-400">
    <span className="absolute -left-[1px] -top-[1px] -translate-x-full text-xs">
      <Icon.Create />
    </span>

    <div className="h-[20px] w-[1px] rotate-45 bg-gray-300" />

    <span className="absolute -bottom-[1px] -right-[1px] translate-x-full text-xs">
      <Icon.Search />
    </span>
  </div>
);

const SearchList = ({ inputValue }: { inputValue: string }) => {
  const keywordStore = UedCx.Keywords.use();

  const newImageStore = NewImageCx.use();

  const unused = strArrayDivergence(
    getIds(keywordStore.store.data),
    newImageStore.data.keywords.map((k) => k.dbConnections.keywordId),
  )
    .map(
      (keywordId) =>
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        keywordStore.store.data.find((keyword) => keyword.id === keywordId)!,
    )
    .sort((a, b) => a.text.localeCompare(b.text));

  const filteredByInputValue = !inputValue.length
    ? unused
    : fuzzySearch({
        entities: unused,
        keys: ["text"],
        pattern: inputValue,
      }).sort((a, b) => a.text.localeCompare(b.text));

  return (
    <div className="px-[4.5rem] py-sm">
      {!keywordStore.store.data.length ? (
        <p className="pl-md text-gray-400">None yet.</p>
      ) : !unused.length ? (
        <p className="pl-md text-gray-400">None unused.</p>
      ) : !filteredByInputValue.length ? (
        <p className="pl-md text-gray-400">No matches.</p>
      ) : (
        <div className="flex max-h-[200px] flex-col items-start gap-xs overflow-y-auto">
          {filteredByInputValue.map((keyword) => (
            <WithTooltip text="Click to add keyword to image" key={keyword.id}>
              <div
                className="cursor-pointer rounded-lg px-md text-gray-600 hover:bg-gray-100"
                onClick={() =>
                  newImageStore.actions.keywords.add({
                    id: generateUid(),
                    dbConnections: { keywordId: keyword.id },
                  })
                }
              >
                {keyword.text}
              </div>
            </WithTooltip>
          ))}
        </div>
      )}
    </div>
  );
};
