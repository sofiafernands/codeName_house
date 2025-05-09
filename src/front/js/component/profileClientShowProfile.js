import React, { useState, useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import "../../styles/profile.css";

export const Profileclientshowprofile = () => {
  const { store, actions } = useContext(Context);

  //ESTADOS DE LOS INPUTS A RELLENAR POR EL CLIENTE
  const [name, setName] = useState(store.cmr_profile && store.cmr_profile.name)
  const [phone_number, setPhone_number] = useState(store.crm_profile && store.cmr_profile.phone_number);
  const [email, setEmail] = useState(store.user && store.user.email)
  console.log(phone_number)

  //FUNCION PARA EL FORM (INFORMACION DEL CLIENTE)
  const info_customer = async (e) => {
    e.preventDefault();
    const userId = localStorage.getItem("id");
    actions.profile_customer(phone_number);
  };


  //USEEFFECT PARA QUE CARGUE LA INFORMACION DEL FORMULARIO 
  useEffect(() => {
    actions.get_profile_customer_info();
    actions.get_profile_info();
  }, []);
  

  return (


    <div className="flex flex-col w-full pl-0 md:p-4 md:space-y-4">
      <div className="md:h-screen pt-2 pb-24 pl-2 pr-2 md:overflow-auto md:pt-0 md:pr-0 md:pl-0">
        <div className="flex flex-col flex-wrap sm:flex-row ">
          <div className="w-full">
            <div className="mb-4">
              <div className="w-full p-4 bg-white shadow-lg rounded-2xl dark:bg-gray-700">
                <form onSubmit={(e) => info_customer(e)} className="p-4">
                  <p className="text-center font-bold text-black text-md dark:text-white">
                    Mis Datos
                  </p>
                  <div className="grid md:grid-cols-2 md:gap-6">
                    <div className="relative z-0 w-full mb-6 group">
                      <input
                        onChange={(event) => setName(event.target.value)}
                        type="text"
                        name="floating_first_name"
                        id="floating_first_name"
                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        placeholder="Nombre "
                        value={store.cmr_profile?.name}
                        required
                      />
                      <label
                        htmlFor="floating_first_name"
                        className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                      ></label>
                    </div>
                  </div>
                  <div className="relative z-0 w-full mb-6 group">
                    <input
                      onChange={(event) => setEmail(event.target.value)}
                      type="email"
                      name="floating_email"
                      id="floating_email"
                      className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                      placeholder="Email"
                      value={store.pro_profile && store.pro_profile.email}
                      required
                    />
                    <label
                      htmlFor="floating_email"
                      className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                    ></label>
                  </div>
                  <div className="grid md:grid-cols-1 md:gap-6">
                    <div className="relative z-0 w-full mb-6 group">
                      <input
                        onChange={(event) => setPhone_number(event.target.value)}
                        type="tel"
                        name="floating_phone"
                        id="floating_phone"
                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        placeholder="Teléfono"
                        value={store.cmr_profile && store.cmr_profile.phone_number}
                        required
                      />
                      <label
                        htmlFor="floating_phone"
                        className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                      ></label>
                    </div>
                  </div>
                  <div className="text-center">
                    <button
                      type="submit"
                      className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                      style={{ transition: 'transform 0.2s ease-in-out', willChange: 'transform' }}
                      onMouseOver={(e) => (e.target.style.transform = 'scale(1.3)')}
                      onMouseOut={(e) => (e.target.style.transform = 'scale(1)')}
                    >
                      Guardar
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  );
};
