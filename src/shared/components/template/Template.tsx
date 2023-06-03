import { useContext, ReactElement } from "react";
import "./template.css";
import icon from "/app_ico.png";
import { AuthContext } from "../../../contexts/AuthProvider";
import Header from "./Header";

interface Props {
  title: string;
  icon: string;
  children: ReactElement;
}

const Template = ({ title, children }: Props) => {
  const { logout } = useContext(AuthContext);

  return (
    <>
      <Header title={title} icon={icon}>
        <label style={{ cursor: "pointer" }} onClick={logout}>
          {" "}
          <i className="fs-4 bi bi-box-arrow-right"></i> Logout{" "}
        </label>
      </Header>
      <div >{children}</div>
      <footer >
        &copy; {new Date().getFullYear()} - Luis Leiton & Steven Rojas
      </footer>
    </>
  );
};

export default Template;
