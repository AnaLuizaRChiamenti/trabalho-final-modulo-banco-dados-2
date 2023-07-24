import React from "react";

const Cadastro: React.FC = () => {
  return (
    <React.Fragment>
      <main className="w-[100vw] h-[100vh] bg-[url('../public/assets/images/fundo.png')] ">
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
          <div className="w-[600px] h-[600px] bg-white mx-auto max-w-md py-8 px-10 shadow-2xl rounded-3xl 	">
            <div className=" w-100% h-16 flex justify-center">
              <img src="data:image/png;base64,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"></img>
            </div>
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
              <h2 className="mt-5 text-center text-3xl leading-9 tracking-tight text-gray-900 font-mplus">
                Faça seu cadastro
              </h2>
            </div>

            <div className="mt-5 sm:mx-auto sm:w-full sm:max-w-sm">
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
                    type="button"
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
          </div>
        </div>
      </main>
    </React.Fragment>
  );
};

export default Cadastro;
