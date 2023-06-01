import { useEffect, useState } from "react";
import { SearchOptionSelect } from "./SearchOptionSelect";
import { searchTasks } from "./searchTasks";
import useFetch from "../../hooks/useFetch";
import { ENV } from "../../utils/helpers";
import useSearch from "./useSearch";

// Componente principal
const App = (
  handleSearch: any,
  handleSearchOptionChange: any,
  handleSearchTermChange: any,
  searchResults: any,
  searchTerm: any
) => {
  return (
    <div className="row g-2 mx-autocol-md-12">
      <div className="col-md-5">
        <SearchOptionSelect onChange={handleSearchOptionChange} />
      </div>
      <div className="col-md-5">
        <input
          className="form-control mb-3"
          type="text"
          value={searchTerm}
          placeholder="Search Value.."
          onChange={handleSearchTermChange}
        />
      </div>
      <div className="col-md-2">
        <button className="btn btn-secondary mb-3" onClick={() => handleSearch}>
          Search
        </button>
      </div>
    </div>
  );
};

export default App;
