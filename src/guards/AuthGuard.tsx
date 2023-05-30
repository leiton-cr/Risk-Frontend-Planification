/* eslint-disable react-hooks/exhaustive-deps */
import { ReactNode, useEffect, useContext } from "react"
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthProvider";
import useStorage from "../utils/useStorage";


interface Props {
    children: ReactNode
}

const AuthGuard = ({ children }: Props) => {

    const {getItem} = useStorage();

    const { token, login } = useContext(AuthContext);

    const navigate = useNavigate();

    useEffect(() => {

        const token = getItem("token");

        if (!token) {
            navigate("/login")
        }else{
           login(token.token);
        }
    }, [token])


    return (
        <>{children}</>
    )
}

export default AuthGuard