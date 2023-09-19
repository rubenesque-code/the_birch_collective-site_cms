import { SearchInput } from "~/components/SearchInput";

import { FiltersCx } from "../_state";

const Filters = () => {
  const { query, setQuery, imageType, setImageType } = FiltersCx.use();

  return (
    <div className="grid grid-cols-2 gap-xl">
      <SearchInput
        inputValue={query}
        setInputValue={setQuery}
        placeholder="Search by keyword"
      />

      <div className="flex items-center gap-lg">
        <ImageTypeButton
          onClick={() => setImageType("all")}
          type="all"
          isActive={imageType === "all"}
        />
        <ImageTypeButton
          onClick={() => setImageType("used")}
          type="used"
          isActive={imageType === "used"}
        />
        <ImageTypeButton
          onClick={() => setImageType("unused")}
          type="unused"
          isActive={imageType === "unused"}
        />
      </div>
    </div>
  );
};

export default Filters;

const ImageTypeButton = ({
  type,
  onClick,
  isActive,
}: {
  type: "all" | "used" | "unused";
  onClick: () => void;
  isActive: boolean;
}) => (
  <button
    className={`min-w-[48px] rounded-xl border border-gray-300 px-xs py-xxxs text-sm transition-all duration-75 ease-in-out ${
      !isActive ? "text-gray-300" : "bg-gray-300 text-white"
    }`}
    onClick={onClick}
    type="button"
  >
    {type}
  </button>
);
