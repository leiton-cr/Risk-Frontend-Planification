import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import PaginationCustom from "../details/components/Pagination";
import { tableHeaders, totalPoints, ENV} from "../../utils/helpers";

const Index = () => {
  const { getData } = useFetch();
  const [project, setProjects] = useState([]);
  const [paginateProject, setPaginateProject] = useState([]);
  const [activePage] = useState(1);

  const clickPage = (index: any) => {
    setPaginateProject(paginateJSON(project, index));
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

  useEffect(() => {
    getData(`${ENV.BASE_URL}Register`).then((response) => {
      setProjects(response);
      setPaginateProject(paginateJSON(response, 1));
    });
  }, []);
  return (
    <>
      <div className="container-fluid px-5">
        <div className="my-3">
          <h4>RISK REGISTER</h4>
        </div>
        <Link to={"/create"}>
          <button className="mb-3 btn btn-primary btn-block">
            Add New Task <i className="bi bi-plus-lg"></i>
          </button>
        </Link>

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
                  <td>{project.id}</td>
                  <td>{project.project.name}</td>
                  <td>{project.taskId}</td>
                  <td>{project.taskDescription}</td>
                  <td>{project.tblDetails.length}</td>
                  <td>{totalPoints(project)}</td>
                  <td>{project.updatedAt}</td>

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
                    <button className="btn btn-danger">
                      <i className="bi bi-trash3"></i>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div>
            {/* totalresult project.details.length() */}
            <PaginationCustom
              totalResult={project.length}
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
