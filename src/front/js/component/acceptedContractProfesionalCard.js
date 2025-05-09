import React, { useState } from "react";
import { Link } from "react-router-dom";
import house from "../../img/house.png";
import limpieza from "../../img/limpieza.png";
import animales from "../../img/animales.png";
import jardineria from "../../img/jardineria.png";
import niños from "../../img/niños.png";
import chef from "../../img/chef.png";

export const Acceptedcontractprofesionaldcard = ({ contract }) => {
    const [isModalOpen6, setIsModalOpen6] = useState(false);

    const toggleModal6 = () => {
        setIsModalOpen6(!isModalOpen6);
    };

    const hideModal6 = () => {
        setIsModalOpen6(false);
    };

    return (
        <div className="w-full flex flex-col p-3 justify-center mt-10 mb-3">
            <h3 className="text-center font-black text-gray-800 md:text-3xl text-xl">Contratado por: {contract.cmr_profile_id.name}</h3>
            <div className="w-full relative flex flex-col md:flex-row md:space-x-5 space-y-3 md:space-y-0 rounded-xl shadow-lg p-3 mx-auto border border-white bg-white">
                <div className="w-full md:w-1/3 bg-white grid place-items-center">
                    <img src={house} className="rounded-full" />
                </div>
                <div className="w-full md:w-2/3 bg-white dark:bg-gray-700 flex flex-col space-y-2 p-3">
                    <div className="text-left px-3 py-1 rounded-full text-xl  text-gray-800 dark:text-white ">
                        <b>Lugar</b>: {contract.home_id.name}
                    </div>
                    <div className="text-left px-3 py-1 rounded-full text-xl  text-gray-800 dark:text-white ">
                        <b>Dirección</b>: {contract.home_id.address}
                    </div>
                    <div className="text-left px-3 py-1 rounded-full text-xl  text-gray-800 dark:text-white ">
                        <b>Teléfono</b>: {contract.cmr_profile_id.phone_number}
                    </div>
                    <div className="text-left px-3 py-1 rounded-full text-xl  text-gray-800 dark:text-white ">
                        <b>Inicio</b>: {contract.starting_time}
                    </div>
                    <div className="text-left px-3 py-1 rounded-full text-xl  text-gray-800 dark:text-white ">
                        <b>Fin</b>: {contract.finishing_time}
                    </div>
                    <div className="text-left px-3 py-1 rounded-full text-xl  text-gray-800 dark:text-white ">
                        <b>Horas</b>: {contract.time_difference}
                    </div>
                    <div className="text-left px-3 py-1 rounded-full text-xl  text-gray-800 dark:text-white ">
                        <b>Precio final</b>: {contract.total_price} €
                    </div>
                    <div className="text-left px-3 py-1 rounded-full text-xl  text-gray-800 dark:text-white ">
                        <b>Detalle del contrato</b>: {contract.comment}
                    </div>
                    <div className="text-right">
                        {contract.job_status == "Pendiente" ? (
                            <p className="text-white bg-red-700 hover:bg-indigo-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-blue-800"
                            >PENDIENTE DE APROBACION DEL CLIENTE</p>
                        ) : (
                            <button
                                data-modal-target="authenticationModal6"
                                data-modal-toggle="authenticationModal6"
                                type="button"
                                className="text-white bg-indigo-700 hover:bg-indigo-800 focus:ring-4 focus:outline-none focus:ring-indigo-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                onClick={toggleModal6}
                            >
                                SERVICIO ACEPTADO
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};
