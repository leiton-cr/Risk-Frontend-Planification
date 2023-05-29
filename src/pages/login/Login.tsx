

import InputGroup from "../../shared/components/InputGroup"
import useLogin from "./useLogin"


import "./login.css"
import { GoogleLogin } from "@react-oauth/google";

const Login = () => {
    const { inputs, formHandler, handleSubmit, responseGoogleLogin, errorGoogleLogin} = useLogin();

    return (
        <section className="login_page">

            <div className="login_container">
                <h1 className="login_title">Sign in</h1>

                <form className="login_form" action="POST" onSubmit={handleSubmit}>
                    {inputs.map(i => <InputGroup {...i} key={i.id} handler={formHandler}></InputGroup>)}

                    <div>
                        <button type="submit">Sign in</button>
                    </div>
                </form>
            </div>


            {/* <div className="google_container">
                <button>Google</button>
            </div> */}

            <div className="google_container">
            <GoogleLogin onSuccess={responseGoogleLogin} onError={errorGoogleLogin} />
            </div>


        </section>
    )
}

export default Login