import InputGroup from "../../shared/components/InputGroup";
import useLogin from "./useLogin";

import "./login.css";
import { GoogleLogin } from "@react-oauth/google";

const Login = () => {
  const {
    inputs,
    formHandler,
    handleSubmit,
    responseGoogleLogin,
    errorGoogleLogin,
  } = useLogin();

  return (
    <section className="container py-5  ">
      <div className="col-sm-10 col-md-6 col-lg-6 col-xl-4 mx-auto shadow p-5 rounded-2">
        <h1 className="login_title">Sign in</h1>

        <form className="mb-3" action="POST" onSubmit={handleSubmit}>
          {inputs.map((i) => (
            <InputGroup {...i} key={i.id} handler={formHandler}></InputGroup>
          ))}

          <div className="d-grid ">
            <button className="btn btn-primary" type="submit">
              Sign in
            </button>
          </div>
        </form>
        <div className="d-flex justify-content-center">
          <GoogleLogin
            onSuccess={responseGoogleLogin}
            onError={errorGoogleLogin}
          />
        </div>
      </div>
    </section>
  );
};

export default Login;
