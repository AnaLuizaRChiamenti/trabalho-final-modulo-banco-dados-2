import React from "react";

const Login: React.FC = () => {
  return (
    <React.Fragment>
      <main className="w-[100vw] h-[100vh] bg-[#F6F2EB] ">
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 ">
          <div className="w-[600px] h-[600px] bg-white mx-auto max-w-md py-8 px-10 shadow rounded-3xl">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
              <img
                className="mx-auto h-10 w-auto"
                src="./assets/images/sakura.png"
                alt="Your Company"
              />
              <h2 className="mt-10 text-center text-3xl leading-9 tracking-tight text-gray-900 font-mplus">
                Faça seu login
              </h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
              <form className="space-y-6" action="#" method="POST">
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm leading-6 text-gray-900 font-mplus"
                  >
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
                  <div className=" text-sm pt-5">
                    <a href="/#" className="font-mplus text-pink-500 hover:text-[#ff9db0] ">
                      Esqueceu sua senha?
                    </a>
                  </div>
                </div>

                <div className="w-full flex justify-center">
                  <button
                    type="button"
                    className="text-white w-80 h-10 bg-gradient-to-r from-pink-400 via-pink-500 to-pink-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-pink-300 dark:focus:ring-pink-800 rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 font-mplus"
                  >
                    Login
                  </button>
                </div>
              </form>

              <p className="mt-10 text-center text-sm text-gray-500 font-mplus">
                Não tem uma conta?{" "}
                <a href="/#" className="font-mplus leading-6 text-pink-500 hover:text-[#ff9db0]">
                  Cadastre-se!
                </a>
              </p>
            </div>
          </div>
        </div>
      </main>
    </React.Fragment>
  );
};

export default Login;
