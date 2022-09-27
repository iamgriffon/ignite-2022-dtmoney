import { MagnifyingGlass } from "phosphor-react";
import { SearchFormContainer } from "./styes";

export function SearchBox() {
  return (
    <SearchFormContainer>
      <input type="text" placeholder="Search for a transaction" />
      <button type="submit">
        <MagnifyingGlass size={20} />
        Search
      </button>
    </SearchFormContainer>)

}