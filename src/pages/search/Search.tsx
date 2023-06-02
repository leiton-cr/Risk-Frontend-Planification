import { useEffect, useState } from "react";
import { SearchOptionSelect } from "./SearchOptionSelect";
import { searchTasks } from "./searchTasks";
import useFetch from "../../hooks/useFetch";
import { ENV } from "../../utils/helpers";

const App = () => {

  const [searchTerm, setSearchTerm] = useState("");
  const [searchOption, setSearchOption] = useState("id");
  const [searchResults, setSearchResults] = useState(Array<any>);
  const [project, setProjects] = useState(Array<any>);

  const { getData } = useFetch();

  const handleSearchTermChange = (event: any) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchOptionChange = (option: any) => {
    setSearchOption(option);
  };

  const handleSearch = () => {
    
    const results = searchTasks(project, searchTerm, searchOption);
    setSearchResults(results);
    console.log(searchResults);
  };

  useEffect(() => {
    const fetchData = async () => {
      await getData(`${ENV.BASE_URL}Register`).then((response) => {
        setProjects(response);
      });
    };
    console.log(project);

    fetchData();
  },[]);

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
        <button className="btn btn-secondary mb-3" onClick={handleSearch}>
          Search
        </button>
      </div>
      <div>4f9ee4c4-833f-4a71-8a0f-efc23e29e531</div>
      <ul>
        {searchResults.map((task) => (
          <li key={task.id}>{JSON.stringify(task)}</li>
        ))}
      </ul>
    </div>
  );
};

export default App;
