import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import PaginationCustom from "../details/components/Pagination";

const Index = () => {
  const { getData } = useFetch();
  const [project, setProjects] = useState([]);
  const [activePage, setActivePage] = useState(1);

  const totalPoints = (projects: any) => {
    return projects.tblDetails.reduce(
      (sum: any, detail: any) => sum + detail.points,
      0
    );
  };

  const tableHeaders = [
    "PID",
    "PROJECT",
    "TID",
    "TASK",
    "RISK COUNT",
    "TOTAL POINTS",
    "LAST UPDATE",
    "MATRIX",
    "EDIT",
    "DELETE",
  ];

  const clickPage = (index: any) => {
    console.log(index);
  };

  useEffect(() => {
    getData(`https://localhost:7071/Register`).then((response) => {
      setProjects(response);
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

        <div className="table-container">
          <table className="table table-table-striped table-hover">
            <thead className="bg-dark text-white">
              <tr>
                {tableHeaders.map((_, i) => (
                  <th>{tableHeaders[i]}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {project.map((project: any, index) => (
                <>
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
                    <td>
                      <button className="btn btn-danger">
                        <i className="bi bi-trash3"></i>
                      </button>
                    </td>
                  </tr>
                </>
              ))}
            </tbody>
          </table>
          <div>
            {/* totalresult project.details.length() */}
            <PaginationCustom
              totalResult={100}
              maxButtons={5}
              onPageChange={clickPage}
              activePage={activePage}
            />
          </div>
        </div>
      </div>

      <Link to={"/login"}>/login</Link>
      <br />
      <Link to={"/"}>/index</Link>
      <br />

      <br />
      <Link to={"/edit/1"}>/edit/:id</Link>
      <br />
      <Link to={"/matrix/61d17eb0-d463-48fc-99c5-a34f7ec482d3"}>
        /matrix/:id
      </Link>
      <br />
    </>
  );
};

export default Index;
