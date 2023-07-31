import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { useNavigate } from "react-router-dom";

interface FormProps {
  mode: "login" | "create";
}

const Form: React.FC<FormProps> = ({ mode }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repassword, setRepassword] = useState("");
  const [errorEmail, setErrorEmail] = useState(false);
  const [errorPassword, setErrorPassword] = useState(false);
  const [errorRepassword, setErrorRepassword] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const userlogged = useAppSelector((state) => state.userLogged.userLogged);
  const listUsers = useAppSelector((state) => state.users.users);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  function handleSubmit(evento: React.FormEvent<HTMLFormElement>) {
    evento.preventDefault();

    if (mode === "login") {
      const user = {
        email: email,
        password: password,
      };

      const userExist = listUsers.find(
        (value) => value.email === user.email && value.password === user.password,
      );
      if (!userExist) {
        setAlertError(true);
        setTimeout(() => {
          setAlertError(false);
        }, 5000);
        return;
      }

      dispatch(loginAsyncThunk(user));
      dispatch(getNotesAsyncThunk(email));
    } else {
      const newUser = {
        email,
        password,
        repassword,
      };

      const retorno = listUsers.some((value) => value.email === newUser.email);
      if (retorno) {
        setAlertErrorExist(true);
        setTimeout(() => {
          setAlertErrorExist(false);
        }, 5000);
        return;
      }

      setAlertSucess(true);
      setTimeout(() => {
        setAlertSucess(false);
      }, 5000);

      dispatch(userCreateAsyncThunk({ email, password, repassword }));

      setTimeout(() => {
        navigate("/login");
      }, 1000);
    }
  }

  return (
    <React.Fragment>
      <div className="mt-5 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" action="#" method="POST" onSubmit={(ev) => handleSubmit(ev)}>
          <div>
            <label htmlFor="email" className="block text-sm leading-6 text-gray-900 font-mplus">
              Email
            </label>
            <div className="mt-2">
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="block w-full rounded-md border-0 py-1.5 text-pink-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-pink-400 focus:ring-2 focus:ring-inset focus:ring-pink-600 sm:text-sm sm:leading-6 focus: outline-none p-2"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="block text-sm leading-6 text-gray-900 font-mplus"
              >
                Senha
              </label>
            </div>
            <div className="mt-2">
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-pink-400 focus:ring-2 focus:ring-inset focus:ring-pink-600 sm:text-sm sm:leading-6 focus:border-0 focus: outline-none p-2"
              />
            </div>
            <div className="flex items-center justify-between mt-6">
              <label
                htmlFor="password"
                className="block text-sm leading-6 text-gray-900 font-mplus"
              >
                Repetir a senha
              </label>
            </div>
            <div className="mt-2">
              <input
                id="repassword"
                name="repassword"
                type="repassword"
                autoComplete="current-password"
                required
                className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-pink-400 focus:ring-2 focus:ring-inset focus:ring-pink-600 sm:text-sm sm:leading-6 focus:border-0 focus: outline-none p-2"
              />
            </div>
          </div>

          <div className="w-full flex justify-center pt-2">
            <button
              type="submit"
              className="text-white w-80 h-10 bg-gradient-to-r from-pink-400 via-pink-500 to-pink-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-pink-300 dark:focus:ring-pink-800 rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 font-mplus"
            >
              Cadastrar
            </button>
          </div>
        </form>

        <p className="mt-7 text-center text-sm text-gray-500 font-mplus">
          Ja tem uma conta?{" "}
          <a href="/" className="font-mplus leading-6 text-pink-500 hover:text-[#ff9db0]">
            Faça o login!
          </a>
        </p>
      </div>
    </React.Fragment>
  );
};

export default Form;