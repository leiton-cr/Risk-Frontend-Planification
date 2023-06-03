import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import PaginationCustom from "../details/components/Pagination";
import { tableHeaders, totalPoints, ENV } from "../../utils/helpers";
import useAlerts from "../../hooks/useAlerts";
import { searchTasks } from "../search/searchTasks";
import { SearchOptionSelect } from "../search/SearchOptionSelect";

const Index = () => {
  const { getData, deleteData } = useFetch();
  const [project, setProjects] = useState([]);
  const [paginateProject, setPaginateProject] = useState(Array<any>);
  const [activePage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchOption, setSearchOption] = useState("id");
  const { promiseAlert, toastAlert } = useAlerts();
  const [pages, setPages] = useState(0);

  const handleSearchTermChange = (event: any) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchOptionChange = (option: any) => {
    setSearchOption(option);
  };

  const handleSearch = () => {
    if (!searchTerm) {
      fetchData();
    } else {
      const results = searchTasks(project, searchTerm, searchOption);
      setPaginateProject(results);
      setPages(results.length);
    }
  };

  const clickPage = (index: any) => {
    setPaginateProject(paginateJSON(project, index));
  };

  const fetchData = async () => {
    await getData(`${ENV.BASE_URL}Register`).then((response) => {
      setProjects(response);
      setPaginateProject(paginateJSON(response, 1));
    });
  };

  const paginateJSON = (jsonData: any, page: number = 1) => { 
    const resultsPerPage = 10;
    const startIndex = (page - 1) * resultsPerPage;
    const endIndex = startIndex + resultsPerPage;

    if (startIndex >= jsonData.length) {
      return [];
    }
    return jsonData.slice(startIndex, endIndex);
  };

  const handleDelete = async (id: Number) => {
    promiseAlert("Are you sure?", "This record will be deleted").then(
      async (response) => {
        if (response.isConfirmed) {
          toastAlert("Risk Delete Successfully!!", "success");
          await deleteData(`${ENV.BASE_URL}Register?id=${id}`);
          fetchData();
        }
      }
    );
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    setPages(project.length);
  }, [project]);

  return (
    <>
      <div className="container-fluid px-5">
        <div className="my-3">
          <h4>RISK REGISTER</h4>
        </div>
        <button
          onClick={() => (window.location.href = "/create")}
          className="mb-3 btn btn-primary btn-block"
        >
          Add New Task <i className="bi bi-plus-lg"></i>
        </button>

        <div className="row g-2 mx-autocol-md-12">
          <div className="col-sm- col-md-3 col-lg-2">
            <SearchOptionSelect onChange={handleSearchOptionChange} />
          </div>
          <div className="col-sm-4 col-md-3 col-lg-2">
            <input
              className="form-control mb-3"
              type="text"
              value={searchTerm}
              placeholder="Search Value.."
              onChange={handleSearchTermChange}
            />
          </div>
          <div className="col-md-1 d-flex">
            <button className="btn btn-secondary mb-3" onClick={handleSearch}>
              <i className="bi bi-search"></i>
            </button>
            <button className="ms-2 btn btn-secondary mb-3" onClick={fetchData}>
              <i className="bi bi-arrow-clockwise"></i>
            </button>
          </div>
        </div>

        <div className="table-container ">
          <table className="table table-table-striped table-hover">
            <thead className="bg-dark text-white">
              <tr>
                {tableHeaders.map((hader, i) => (
                  <th key={i}>{hader}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {paginateProject.map((project: any, index) => (
                <tr key={index}>
                  <td>{project.projectId}</td>
                  <td>{project.project.name}</td>
                  <td>{project.taskId}</td>
                  <td>{project.taskDescription}</td>
                  <td>{project.tblDetails.length}</td>
                  <td>{totalPoints(project)}</td>
                  <td>
                    {project.updatedAt
                      ? project.updatedAt.replace("T00:00:00", "")
                      : ""}
                  </td>
                  <td>
                    <Link to={`/matrix/${project.id}`}>
                      <button className="btn btn-primary">
                        <i className="bi bi-grid-fill"></i>
                      </button>
                    </Link>
                  </td>
                  <td>
                    <Link to={`/edit/${project.id}`}>
                      <button className="btn btn-warning">
                        <i className="bi bi-pencil-fill"></i>
                      </button>
                    </Link>
                  </td>
                  <td className="">
                    <button
                      onClick={() => handleDelete(project.id)}
                      className="btn btn-danger"
                    >
                      <i className="bi bi-trash3"></i>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div>
            <PaginationCustom
              totalResult={pages}
              maxButtons={5}
              onPageChange={clickPage}
              activePage={activePage}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Index;
