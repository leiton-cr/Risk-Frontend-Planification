import { useEffect, useState } from "react";
import { SearchOptionSelect } from "./SearchOptionSelect";
import { searchTasks } from "./searchTasks";
import useFetch from "../../hooks/useFetch";
import { ENV } from "../../utils/helpers";

// Componente principal
const useSearch = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchOption, setSearchOption] = useState("id");
  const [searchResults, setSearchResults] = useState(Array<any>);
  const [project, setProjects] = useState([]);

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
  };

  useEffect(() => {
    const fetchData = async () => {
      await getData(`${ENV.BASE_URL}Register`).then((response) => {
        setProjects(response);
      });
    };

    fetchData();
  });

  return {handleSearchTermChange, handleSearchOptionChange,handleSearch , searchResults, searchTerm }
}
export default useSearch;