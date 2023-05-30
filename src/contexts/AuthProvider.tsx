/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-empty-function */
import { ReactNode, useState, createContext } from "react"
import useStorage from "../hooks/useStorage";

interface Props {
    children: ReactNode
}

// export const AuthContext = createContext({login: function(_email:string, _pass:string){},logout: function(){}, email:"" });

// const AuthProvider = ({children}:Props) => {

//     const [user, setUser] = useState({email:""})

//     function login (email:string)  {
//         setUser({email: email})
//     }

//     function logout ()  {
//         setUser({email:""})
//     }

//     const authContext = {login, logout, email:user.email}

//   return <AuthContext.Provider value={authContext}>{children}</AuthContext.Provider>
// }

export const AuthContext = createContext({ login: function (_token: string) { }, logout: function () { }, token: "" });

const AuthProvider = ({ children }: Props) => {

    const { removetem, saveItem } = useStorage();

    const [token, setToken] = useState({ token: "" })

    function login(_token: string) {
        setToken({ token: _token })
        saveItem("token", { token: _token });
    }

    function logout() {
        setToken({ token: "" })
        removetem("token");
    }

    const authContext = { login, logout, token: token.token }

    return <AuthContext.Provider value={authContext}>{children}</AuthContext.Provider>
}

export default AuthProvider