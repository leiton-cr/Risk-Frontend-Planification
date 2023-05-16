/* eslint-disable react-hooks/exhaustive-deps */
import { ReactNode, useEffect, useContext } from "react"
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthProvider";

interface Props {
    children: ReactNode
}

const LoginGuard = ({ children }: Props) => {

    const {email} = useContext(AuthContext);
  
    const navigate = useNavigate();

    useEffect(() => {
        if (email) {
            navigate("/")
        }
    }, [email])

    return (
        <>{children}</>
    )
}

export default LoginGuard