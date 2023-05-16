/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-empty-function */
import { ReactNode, useState, createContext } from "react"

interface Props {
    children: ReactNode
}

export const AuthContext = createContext({login: function(_email:string, _pass:string){},logout: function(){}, email:"" });

const AuthProvider = ({children}:Props) => {

    const [user, setUser] = useState({email:""})

    function login (email:string)  {
        setUser({email: email})
    }
    
    function logout ()  {
        setUser({email:""})
    }

    const authContext = {login, logout, email:user.email}

  return <AuthContext.Provider value={authContext}>{children}</AuthContext.Provider>
}

export default AuthProvider