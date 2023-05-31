import { ReactElement } from "react";
import useStorage from "../../../hooks/useStorage";

interface Props {
  children: ReactElement;
  title: string;
  icon:string
}

const Header = ({ title, children,icon}: Props) => {
  //const { getItem } = useStorage();

  //const token = getItem("token");

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light sticky-top navbar-scroll shadow">
        <div className="container-fluid col-md-10">
          <a className="navbar-brand">
            {" "}
            <strong className="fs-3">{title.toUpperCase()}</strong>{" "}
            <i className={icon}></i>
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarScroll"
            aria-controls="navbarScroll"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarScroll">
            <ul className="navbar-nav me-auto my-2 my-lg-0 navbar-nav-scroll">

              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="/">
                  Home
                </a>
              </li>
            </ul>

            <div className="nav-item dropdown">
              <a
                className="nav-link"
                href="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <i className="fs-2 bi bi-person-circle "></i>
              </a>
              <ul className="dropdown-menu">
                <li>
                  <a className="dropdown-item" href="login">
                    {children}
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
