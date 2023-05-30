import { useContext, ReactElement } from "react";
import "./template.css";
import icon from "/app_ico.png";
import { AuthContext } from "../../../contexts/AuthProvider";
import Header from "./header";

interface Props {
  title: string;
  icon:string
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
      {/* <header className='template_header'>
                <h1 className='template_title'>{title}</h1>
                <div className='header_logo'>
                    <button onClick={logout}>Logout</button>
                    <img src={icon} className='template_image'/>
                </div>
            </header> */}
      {children}
      <footer>&copy; Copyright 2023</footer>
    </>
  );
};

export default Template;
