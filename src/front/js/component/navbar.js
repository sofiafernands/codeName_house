import React, { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import { Searcher } from "./searcher";
import { Switchclienttoprofesional } from "./switchClientToProfesional";
import { Notification } from "./notification";
import { Accesbuttonhover } from "./accessButtonHover";
import { Myprofilehover } from "./myProfileHover";


export const Navbar = () => {

return (
<nav className="bg-white border-gray-200 dark:bg-gray-900 fixed top-0 left-0 w-full z-50">
  <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
    <Link className="flex items-center" to="/">
      <img
        src="https://cdn.discordapp.com/attachments/1103746622493577246/1117017298050486292/Pngtree_real_estate_simple_logo_design_3621497__1_-removebg-preview.png"
        className="h-14 mr-2"
        alt="HOMYO Logo"
      />
      <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white text-indigo-500">
        HOMYO
      </span>
    </Link>
      <Searcher />
      <Switchclienttoprofesional />
      <div className="flex items-center justify-end">
      <Accesbuttonhover />
      <Notification />
      <Myprofilehover />
    </div> 
  </div>
</nav>
  );
};
