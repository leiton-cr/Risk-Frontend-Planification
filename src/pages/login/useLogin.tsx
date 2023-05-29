/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import { FormEvent, useState, useEffect, useContext } from "react"
import useStorage from "../../utils/useStorage"


import { AuthContext } from "../../contexts/AuthProvider"
import { useNavigate } from "react-router-dom"
import useFetch from "../../utils/useFetch"
import parseJwt from "../../utils/jwt.ts"

const useLogin = () => {

    const { login } = useContext(AuthContext);

    const { postData, getData } = useFetch();


    const navigate = useNavigate();

    const { saveItem, getItem, removetem } = useStorage();

    const [formData, setFormData] = useState({ email: "", password: "", remember_me: false });

    const inputs = [
        { id: "email", inputType: "text", state: formData.email },
        { id: "password", inputType: "password", state: formData.password },
        { id: "remember_me", inputType: "checkbox", state: formData.remember_me }
    ]

    const formHandler = (e: FormEvent) => {

        if (e.currentTarget.id === "remember_me") {
            setFormData({ ...formData, [e.currentTarget.id]: (e.target as HTMLInputElement).checked });
            return;
        }

        setFormData({ ...formData, [e.currentTarget.id]: (e.target as HTMLInputElement).value });
    }

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();

        if (formData.email && formData.password) {
            const user = {
                email: formData.email,
                pass: formData.password
            }

            postData("https://localhost:7071/Auth", user).then(validateLogin).catch(() => { alert("Error on server") });

        } else {
            alert("Missing email or password")
        }
    }

    const responseGoogleLogin = async (response: any) => {

        const parseResponse = parseJwt(JSON.stringify(response));
        const result = await getData("https://localhost:7071/Auth/EmailExists/" + parseResponse.email);
        //save localStorage
        saveItem("token", result.jwt);

        if (result.jwt) {
            navigate("/");
        }
    };
    const errorGoogleLogin = () => {
        // Handle the error here
        console.log("An error occurred during Google login");
    };




    const validateLogin = (response: any) => {
        if (response.validation) {
            login(formData.email, formData.password)
            navigate("/");
        } else {
            alert("Error on credentials")
        }
    }



    // Main load effect
    useEffect(() => {
        const remember_me = getItem("remember_me");
        if (remember_me) {
            setFormData({ ...formData, "email": remember_me.email, "remember_me": true });
        }
    }, []);

    // Form data update effect
    useEffect(() => {
        if (formData.remember_me) {
            saveItem("remember_me", { email: formData.email, remember_me: true });
            return;
        }
        removetem("remember_me");
    }, [formData]);

    return { inputs, formHandler, handleSubmit, responseGoogleLogin, errorGoogleLogin }
}

export default useLogin