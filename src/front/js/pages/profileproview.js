import { Cardvaloracionesporusuario } from "../component/cardvaloracionesporusuario";
import "../../styles/home.css";
import avatar from "../../img/avatar.png";
import limpieza from "../../img/limpieza.png";
import animales from "../../img/animales.png";
import jardineria from "../../img/jardineria.png";
import niños from "../../img/niños.png";
import chef from "../../img/chef.png";
import React, { useEffect, useState } from "react";
import { format, addMonths, subMonths, startOfMonth, endOfMonth, eachWeekOfInterval, isSameMonth, startOfWeek, endOfWeek, eachDayOfInterval, getDay } from "date-fns";
import { es } from "date-fns/locale"; // Importar la configuración local en español

export const Profileproview = () => {
  const [isModalOpen8, setIsModalOpen8] = useState(false);

  const toggleModal8 = () => {
    setIsModalOpen8(!isModalOpen8);
  };

  const hideModal8 = () => {
    setIsModalOpen8(false);
  };

  const [currentDate, setCurrentDate] = useState(new Date());
  const [showModal, setShowModal] = useState(false);
  const [selectedDay, setSelectedDay] = useState(1);
  const [selectedMonth, setSelectedMonth] = useState(0);
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [reservations, setReservations] = useState([]);

  const [hourDifference, setHourDifference] = useState(0);

  const handleStartingTimeChange = (event) => {
    const time = event.target.value;
    setStartTime(time);
  };

  const handleEndTimeChange = (event) => {
    const time = event.target.value;
    setEndTime(time);
  };

  useEffect(() => {
    calculateHourDifference(startTime, endTime);
  }, [startTime, endTime]);

  const calculateHourDifference = (start, end) => {
    const startDateTime = new Date(start);
    const endDateTime = new Date(end);
    const differenceInMilliseconds = endDateTime - startDateTime;
    const hourDifference = Math.abs(differenceInMilliseconds / (1000 * 60 * 60));
    setHourDifference(hourDifference);
  };

  const months = [
    { value: 0, label: "Enero" },
    { value: 1, label: "Febrero" },
    { value: 2, label: "Marzo" },
    { value: 3, label: "Abril" },
    { value: 4, label: "Mayo" },
    { value: 5, label: "Junio" },
    { value: 6, label: "Julio" },
    { value: 7, label: "Agosto" },
    { value: 8, label: "Septiembre" },
    { value: 9, label: "Octubre" },
    { value: 10, label: "Noviembre" },
    { value: 11, label: "Diciembre" },
  ];

  const previousMonth = () => {
    setCurrentDate((prevDate) => subMonths(prevDate, 1));
  };

  const nextMonth = () => {
    setCurrentDate((prevDate) => addMonths(prevDate, 1));
  };

  const startOfCurrentMonth = startOfMonth(currentDate);
  const endOfCurrentMonth = endOfMonth(currentDate);
  const weeksOfMonth = eachWeekOfInterval(
    {
      start: startOfCurrentMonth,
      end: endOfCurrentMonth,
    },
    { weekStartsOn: 0 } // Comenzar la semana en domingo
  );

  const weekDays = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"]; // Domingo como primer día

  const addReservation = () => {
    const newReservation = {
      day: selectedDay,
      month: selectedMonth,
      startTime: startTime,
      endTime: endTime,
    };
    setReservations([...reservations, newReservation]);
    setShowModal(false);
    setSelectedDay(1);
    setSelectedMonth(0);
    setStartTime("");
    setEndTime("");
  };

  const [homeNames, setHomeNames] = useState([]);
  const [selectedHome, setSelectedHome] = useState("");

  useEffect(() => {
    // Obtén los nombres de las casas almacenados en el localStorage
    const storedHomeNames = JSON.parse(localStorage.getItem("home"));
    setHomeNames(storedHomeNames);
  }, []);

  const handleHomeSelection = (event) => {
    const selectedHome = event.target.value;
    setSelectedHome(selectedHome);
    // Hacer lo que necesites con el nombre de la casa seleccionada
    console.log("Casa seleccionada:", selectedHome);
  };


  return (
    <div className="grid grid-cols-2  max-w-screen-xl flex items-start justify-center py-12 px-4 mx-auto mt-20">
      <div className="bg-white grid place-items-center">
        <img src={avatar} className="rounded-full" />
        <div className="flex items-center justify-center">
          {/* Calendario */}
          <div className="flex justify-between font-medium text-sm pb-2">
            <div className="flex flex-col w-full pl-0 md:space-y-4">
              <div className="flex flex-col">
                <div className="flex justify-center mt-4">
                  <button
                    onClick={() => setShowModal(true)}
                    className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    style={{ transition: 'transform 0.2s ease-in-out', willChange: 'transform' }}
                    onMouseOver={(e) => (e.target.style.transform = 'scale(1.3)')}
                    onMouseOut={(e) => (e.target.style.transform = 'scale(1)')}
                    >
                    Añadir Reserva
                  </button>
                </div>

                {showModal && (
                  <div className="fixed inset-0 flex items-center justify-center z-10">
                    <div className="bg-gray-900 opacity-50" />
                    <div className="bg-white w-1/2 p-6 rounded shadow-lg">
                      <h2 className="text-lg font-semibold text-gray-800 mb-4">Añadir Reserva</h2>
                      <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Fecha:</label>
                        <div className="flex items-center">
                          <select value={selectedHome} onChange={handleHomeSelection}>
                            <option value="">Seleccionar casa</option>
                            {homeNames.map((homeName) => (
                              <option key={homeName} value={homeName}>
                                {homeName}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                      <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Hora de inicio:</label>
                        <input
                          type="datetime-local"
                          id="starting-time"
                          className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          value={startTime}
                          onChange={handleStartingTimeChange}
                        />
                      </div>
                      <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Hora de fin:</label>
                        <input
                          type="datetime-local"
                          id="end-time"
                          className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          value={endTime}
                          onChange={handleEndTimeChange}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Diferencia en horas:</label>
                        <input
                          type="text"
                          className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          value={hourDifference}
                          readOnly
                        />
                      </div>

                      <div className="mt-6 flex justify-end">
                        <button
                          onClick={addReservation}
                          className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                          Añadir Reserva
                        </button>
                        <button
                          onClick={() => setShowModal(false)}
                          className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-gray-700 bg-gray-200 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 ml-3"
                        >
                          Cancelar
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

          </div>
        </div>
      </div>
      <div className="ml-3">
        <div className="border-b border-gray-200 pb-6 flex flex-col items-center justify-center">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white mt-2">
            Antonio
          </h1>
          <div className="flex justify-between items-center mt-2">
            <div className="flex items-center mr-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-10 w-10 text-yellow-500"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <p className="text-gray-600 font-bold text-m ml-1">
                4.96
                <span className="text-gray-500 font-normal">(76 reviews)</span>
              </p>
            </div>
            <div className="bg-gray-200 px-3 py-1 rounded-full text-xl font-medium text-gray-800 hidden md:block">
              13€/hora
            </div>
          </div>
        </div>

        <div className="py-4 border-b border-gray-200">
          <div className="flex justify-center">
            <ul className="grid grid-cols-3 gap-4">
              <li className="mr-2 mb-2">
                <div className="flex-row gap-4 flex justify-center items-center">
                  <div className="flex-shrink-0">
                    <a className="relative block">
                      <img
                        alt="limpieza"
                        src={limpieza}
                        className="mx-auto object-fit rounded-full h-8 w-8"
                      />
                    </a>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-lg font-medium text-gray-600 dark:text-white">
                      Limpieza
                    </span>
                  </div>
                </div>
              </li>
              <li className="mr-2 mb-2">
                <div className="flex-row gap-4 flex justify-center items-center">
                  <div className="flex-shrink-0">
                    <a className="relative block">
                      <img
                        alt="cocina"
                        src={chef}
                        className="mx-auto object-fit rounded-full h-8 w-8"
                      />
                    </a>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-lg font-medium text-gray-600 dark:text-white">
                      Cocina
                    </span>
                  </div>
                </div>
              </li>
              <li className="mr-2 mb-2">
                <div className="flex-row gap-4 flex justify-center items-center">
                  <div className="flex-shrink-0">
                    <a className="relative block">
                      <img
                        alt="cuidad de niños"
                        src={niños}
                        className="mx-auto object-fit rounded-full h-8 w-8 "
                      />
                    </a>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-lg font-medium text-gray-600 dark:text-white">
                      Cuidado de niños
                    </span>
                  </div>
                </div>
              </li>
              <li className="mr-2 mb-2">
                <div className="flex-row gap-4 flex justify-center items-center">
                  <div className="flex-shrink-0">
                    <a className="relative block">
                      <img
                        alt="cuidado de animales"
                        src={animales}
                        className="mx-auto object-fit rounded-full h-8 w-8 "
                      />
                    </a>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-lg font-medium text-gray-600 dark:text-white">
                      Cuidado de animales
                    </span>
                  </div>
                </div>
              </li>
              <li className="mr-2 mb-2">
                <div className="flex-row gap-4 flex justify-center items-center">
                  <div className="flex-shrink-0">
                    <a className="relative block">
                      <img
                        alt="jardineria"
                        src={jardineria}
                        className="mx-auto object-fit rounded-full h-8 w-8 "
                      />
                    </a>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-lg font-medium text-gray-600 dark:text-white">
                      Jardineria
                    </span>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div>
          <p className="xl:pr-48 text-base lg:leading-tight leading-normal text-gray-600 dark:text-gray-300 mt-7">
            Descripción de Antonio
          </p>
        </div>

      </div>
      <div className="col-start-1 col-end-3 ">
        <p className="text-center text-3xl font-bold text-gray-800  lg:leading-tight leading-normal text-gray-600 dark:text-gray-300 mt-7">
          Valoraciones
        </p>
        <Cardvaloracionesporusuario />
      </div>
    </div>
  );
};
