import React, { useState, useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import "../../styles/profile.css";
import { Acceptedcontractprofesionaldcard } from "../component/acceptedContractProfesionalCard";
import { Contractofferclienttoprofesionaldcard } from "../component/contractOfferClientToProfesionalCard";

export const Profileproshowcontracts = () => {
    const { store, actions } = useContext(Context);

    useEffect(() => {
        actions.getMyContractsPro()
        console.log("contratos pro")

    }, [])
    return (

        <div className="h-screen pt-2 pb-24 pl-2 pr-2 overflow-auto md:pt-0 md:pr-0 md:pl-0 custom-scrollbar">
            <div className="mx-0 mb-4 ">
                <p className="p-4 font-bold text-black text-md text-center dark:text-white">Tus Contratos</p>
                {store.myContracts && store.myContracts.map((contract, index) => {
                    if (contract.posted_by == localStorage.getItem("id") || contract.job_status.toLowerCase() !== "pendiente") {
                        return (
                            <div>
                                <Acceptedcontractprofesionaldcard contract={contract} />
                            </div>
                        )
                    }
                })}
                <p className="p-4 font-bold text-black text-md text-center dark:text-white">Tus Ofertas</p>
                {store.myContracts && store.myContracts.map((contract, index) => {
                    if (!(contract.posted_by == localStorage.getItem("id") || contract.job_status.toLowerCase() !== "pendiente")){
                        return (
                            <div>
                                <Contractofferclienttoprofesionaldcard
                                    start={contract.starting_time}
                                    end={contract.finishing_time}
                                    name={contract.cmr_profile_id.name}
                                    total_price={contract.total_price}
                                    home_post_id={contract.home_post.id}
                                    contract_id={contract.id}
                                    comment={contract.comment} />
                            </div>
                        )
                    }
                })}











            </div>
        </div >
    );
};
