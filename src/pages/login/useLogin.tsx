/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import { FormEvent, useState, useEffect, useContext } from "react";
import useStorage from "../../hooks/useStorage.tsx";

import { AuthContext } from "../../contexts/AuthProvider";
import { useNavigate } from "react-router-dom";
import useFetch from "../../hooks/useFetch.tsx";
import parseJwt from "../../utils/jwt.ts";

const useLogin = () => {
  const { login } = useContext(AuthContext);

  const { postData, getData } = useFetch();

  const navigate = useNavigate();

  const { saveItem, getItem, removetem } = useStorage();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    remember_me: false,
    show_password: false,
  });

  const inputs = [
    {
      id: "Email",
      inputType: "text",
      state: formData.email,
      placeholder: "JohnDoe@domain.com",
    },
    {
      id: "Password",
      inputType: "password",
      state: formData.password,
      placeholder: "********",
    },
    { id: "remember_me", inputType: "checkbox", state: formData.remember_me },
  ];

  const formHandler = (e: FormEvent) => {
    if (e.currentTarget.id === "remember_me") {
      setFormData({
        ...formData,
        [e.currentTarget.id]: (e.target as HTMLInputElement).checked,
      });
      return;
    }
    setFormData({
      ...formData,
      [e.currentTarget.id]: (e.target as HTMLInputElement).value,
    });
  };

  const checkHandler = (e: FormEvent) => {
    if (e.currentTarget.id === "show_password") {
      setFormData({
        ...formData,
        [e.currentTarget.id]: (e.target as HTMLInputElement).checked,
      });
      return;
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (formData.email && formData.password) {
      const user = {
        email: formData.email,
        pass: formData.password,
      };

      postData("https://localhost:7071/Auth", user)
        .then(validateLogin)
        .catch(() => {
          alert("Error on server");
        });
    } else {
      alert("Missing email or password");
    }
  };

  const responseGoogleLogin = async (response: any) => {
    const parseResponse = parseJwt(JSON.stringify(response));
    getData("https://localhost:7071/Auth/EmailExists/" + parseResponse.email)
      .then(validateLogin)
      .catch(() => {
        alert("Error on server");
      });

    //save localStorage
  };
  const errorGoogleLogin = () => {
    // Handle the error here
    console.log("An error occurred during Google login");
  };

  const validateLogin = (response: any) => {
    if (response.validation && response.jwt) {
      login(response.jwt);
      navigate("/");
    } else {
      alert("Error on credentials");
    }
  };

  // Main load effect
  useEffect(() => {
    const remember_me = getItem("remember_me");
    if (remember_me) {
      setFormData({ ...formData, email: remember_me.email, remember_me: true });
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

  return {
    inputs,
    formHandler,
    handleSubmit,
    responseGoogleLogin,
    errorGoogleLogin,
    checkHandler,
  };
};

export default useLogin;
