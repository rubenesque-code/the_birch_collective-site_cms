import { SearchInput } from "~/components/SearchInput";

import { SearchCx } from "../_state";

const Search = () => {
  const { query, setQuery } = SearchCx.use();

  return (
    <SearchInput
      inputValue={query}
      setInputValue={setQuery}
      placeholder="Search by keyword"
    />
  );
};

export default Search;
