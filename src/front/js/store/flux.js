import axios from "axios"

const getState = ({

    getStore,
    getActions,
    setStore
}) => {
    return {
        store: {
            message: null,
            token: "", //guardamos el token como un string vacio 
            isLoggedIn: false,
            role: 'cliente', // 
            publications: [],
            homePost: [],
            user: {},
            pro_profile: {},
            cmr_profile: {},
            all_professionals: [],
            skill_name: {},
            skills: [],
            last_post_id: null,
            myHomes: null,
            myContracts: null
        },
        actions: {

            getMyContractsPro: async () => {
                const token = localStorage.getItem("token");
                try {
                    const response = await fetch(`${process.env.BACKEND_URL}/api/my_contracts_pro`, {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": `Bearer ${token}`,
                        },
                    })
                    const data = await response.json()
                    setStore({
                        myContracts: data.results
                    })
                    console.log("datos pro");
                    console.log(data);
                } catch (error) {
                    console.error(error)
                }
            },

            getMyContracts: async () => {
                const token = localStorage.getItem("token");
                try {
                    const response = await fetch(`${process.env.BACKEND_URL}/api/my_contracts_cmr`, {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": `Bearer ${token}`,
                        },
                    })
                    const data = await response.json()
                    setStore({
                        myContracts: data.results
                    })
                    console.log(data);
                    console.log(response);
                } catch (error) {
                    console.error(error)
                }
            },

            deleteOffer: async (id) => {
                const token = localStorage.getItem("token");
                try {
                    const response = await fetch(`${process.env.BACKEND_URL}/api/contract/` + id, {
                        method: "DELETE",
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": `Bearer ${token}`,
                        },
                    })
                    const data = await response.json()
                } catch (error) {
                    console.error(error)
                }
            },

            updateContract: async (contract, id) => {
                try {
                    const response = await fetch(
                        process.env.BACKEND_URL + "/api/contract/" + id, {
                        method: "PUT",
                        body: JSON.stringify(contract),
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": `Bearer ${localStorage.getItem("token")}`
                        },
                    }
                    );

                    const data = await response.json();
                    if (response.status === 200) {
                        getActions().getMyContracts()
                    }
                } catch (error) {
                    console.log("error loading message from backend", error);
                }
            },
            updateHomePost: async (homePost, id) => {
                try {
                    const response = await fetch(
                        process.env.BACKEND_URL + "/api/home_post/" + id, {
                        method: "PUT",
                        body: JSON.stringify(homePost),
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": `Bearer ${localStorage.getItem("token")}`
                        },
                    }
                    );
                    const data = await response.json();
                } catch (error) {
                    console.log("error loading message from backend", error);
                }
            },

            submitOffer: async (pro_offer) => {
                const token = localStorage.getItem("token");
                console.log("enviando oferta:")
                console.log(pro_offer);
                try {
                    const response = await fetch(process.env.BACKEND_URL + "/api/contract_pro_to_cmr", {
                        method: "POST",
                        body: JSON.stringify(pro_offer),
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": `Bearer ${token}`
                        },
                    });
                    const data = await response.json();

                } catch (error) {
                    console.log("error loading message from backend", error);
                }
            },




            submitPost: async (homePost) => {
                const token = localStorage.getItem("token");
                console.log(homePost);
                try {
                    const response = await fetch(process.env.BACKEND_URL + "/api/home_post", {
                        method: "POST",
                        body: JSON.stringify(homePost),
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": `Bearer ${token}`
                        },
                    });
                    const data = await response.json();
                    console.log(data.your_new_post.id);
                    setStore({
                        last_post_id: data.your_new_post.id // se almacena el ultimo id de un home_post
                    })
                } catch (error) {
                    console.log("error loading message from backend", error);
                }
            },

            getPostsOn: async () => {
                const token = localStorage.getItem("token");
                try {
                    const response = await fetch(`${process.env.BACKEND_URL}/api/home_post`, {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": `Bearer ${token}`,
                        },
                    })
                    const data = await response.json()
                    setStore({
                        homePost: data.results
                    })
                    console.log(data);
                    console.log(response);
                } catch (error) {
                    console.error(error)
                }
            },
            //ruta para que cliente envie peticion de servicio a un profesional 
            contract_cmr_to_pro: async (contract) => {
                const token = localStorage.getItem("token");
                try {
                    const response = await fetch(process.env.BACKEND_URL + "/api/contract_cmr_to_pro", {
                        method: "POST",
                        body: JSON.stringify(contract),
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": `Bearer ${token}`
                        },
                    });
                    const data = await response.json();
                    console.log("contract cmr to pro")
                    console.log(data);
                } catch (error) {
                    console.log("error loading message from backend", error);
                }
            },

            //RECIBE LAS SKILLS EN LOS POSTS
            getSkills: async () => {
                const token = localStorage.getItem("token");
                try {
                    const response = await fetch(`${process.env.BACKEND_URL}/api/skill`, {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": `Bearer ${token}`,
                        },
                    })
                    const data = await response.json()
                    setStore({
                        skills: data.results
                    })
                    console.log(data);
                    console.log(response);
                } catch (error) {
                    console.error(error)
                }
            },
            getMyHomes: async () => {
                const token = localStorage.getItem("token");
                try {
                    const response = await fetch(`${process.env.BACKEND_URL}/api/homes`, {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": `Bearer ${token}`,
                        },
                    })
                    const data = await response.json()
                    setStore({
                        myHomes: data.results
                    })
                    console.log(data);
                    console.log(response);
                } catch (error) {
                    console.error(error)
                }
            },
            // Función para obtener posts filtrados por ciudad
            getPostsByCity: async (city) => {
                const token = localStorage.getItem("token");

                try {
                    const response = await fetch(`${process.env.BACKEND_URL}/api/home_post/${city}`, {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": `Bearer ${token}`,
                        },
                    })
                    const data = await response.json()
                    setStore({
                        homePost: data.results
                    })
                    // console.log(data);
                    // console.log(response);
                } catch (error) {
                    console.error(error)
                }
            },

            //NEW USER REGISTRATION => FALTA IMPLEMENTARLO POR PARTE DEL BACK
            addUser: async (user) => {
                console.log(user);
                try {
                    const response = await fetch(process.env.BACKEND_URL + "/api/user", {
                        method: "POST",
                        body: JSON.stringify(user),
                        headers: {
                            "Content-Type": "application/json",
                        },
                    });
                    const data = await response.json();
                    console.log(data);
                } catch (error) {
                    console.log("error loading message from backend", error);
                }
            },

            //LOGIN USER
            login: async (email, password) => {
                try {
                    const resp = await fetch(process.env.BACKEND_URL + "/api/login", {
                        method: "POST",
                        body: JSON.stringify({
                            email: email,
                            password: password
                        }),
                        headers: {
                            "Content-Type": "application/json",
                        },
                    });
                    const data = await resp.json();
                    if (resp.status === 200) {
                        console.log(data);

                        let homeNames = [];
                        if (
                            data.user &&
                            data.user.cmr_profile &&
                            data.user.cmr_profile.length > 0 &&
                            data.user.cmr_profile[0].homes &&
                            data.user.cmr_profile[0].homes.length > 0
                        ) {
                            // Obtener los nombres de todas las casas en la lista
                            homeNames = data.user.cmr_profile[0].homes.map(home => home.name);
                        }
                        console.log(data.user);
                        localStorage.setItem("token", data.token);
                        localStorage.setItem("id", data.user.id);
                        localStorage.setItem("home", JSON.stringify(homeNames));

                        setStore({
                            ...getStore(),
                            isLoggedIn: true,
                            user: data.user
                        });

                        return true;
                    }
                } catch (error) {
                    console.log("Error loading message from backend", error);
                    return false;
                }
            },

            //AGREGAR INFORMACION DE PERFIL CON SUS SKILL DEL USUARIO-PROFESIONAL (INPUTS A LLENAR)
            profile_professional: async (
                //surname1,
                email,
                name,
                dni,
                description,
                address,
                city,
                postal_code,
                km_radius,
                phone_number,
                hourly_rate,
                seleccionados
            ) => {
                const userId = localStorage.getItem("id");
                console.log(description)
                try {

                    const response = await fetch(
                        process.env.BACKEND_URL + "/api/pro_profile/", {
                        method: "PUT",
                        body: JSON.stringify({
                            user_id: userId,
                            email: email,
                            username: name,
                            dni: dni,
                            description: description,
                            address: address,
                            city: city,
                            postal_code: postal_code,
                            km_radius: km_radius,
                            phone_number: phone_number,
                            hourly_rate: hourly_rate,
                            seleccionados: seleccionados
                        }),
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": `Bearer ${localStorage.getItem("token")}`

                        },
                    }
                    );
                    const data = await response.json();
                } catch (error) {
                    console.log("error loading message from backend", error);
                }
            },

            //GET PARA OBTENER TODA LA LISTA DE PROFESIONALES.
            get_all_professionals: async () => {
                const token = localStorage.getItem("token");

                try {
                    const response = await fetch(
                        process.env.BACKEND_URL + "/api/pro_profile_list", {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": `Bearer ${token}`,
                        },
                    }
                    );
                    const data = await response.json();
                    setStore({
                        all_professionals: data.results
                    })
                    console.log("datos")
                    console.log(data.results);
                } catch (error) {
                    console.log("error loading message from backend", error);
                }
            },

            //GET PARA OBTENER LA INFORMACION DEL PERFIL USUARIO-PROFESIONAL (INDIVIDUALMENTE)
            get_profile_info: async (id) => {
                const token = localStorage.getItem("token");

                try {
                    const response = await fetch(
                        process.env.BACKEND_URL + "/api/pro_profile/", {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": `Bearer ${token}`,
                        },
                    }
                    );
                    const data = await response.json();
                    setStore({
                        pro_profile: data.result
                    })
                    console.log(data);
                } catch (error) {
                    console.log("error loading message from backend", error);
                }
            },


            //AGREGAR INFORMACION DE PERFIL DEL USUARIO-CLIENTE(INPUTS A LLENAR) 
            profile_customer: async (phone_number) => {
                const userId = localStorage.getItem("id");
                console.log(phone_number)
                try {

                    const response = await fetch(
                        process.env.BACKEND_URL + "/api/cmr_profile", {
                        method: "PUT",
                        body: JSON.stringify({
                            user_id: userId,

                            phone_number: phone_number,
                        }),
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": `Bearer ${localStorage.getItem("token")}`
                        },
                    }
                    );
                    const data = await response.json();
                    console.log(data);
                } catch (error) {
                    console.log("error loading message from backend", error);
                }
            },

            //GET PARA OBTENER LA INFORMACION DEL PERFIL USUARIO-CLIENTE (INDIVIDUALMENTE)
            get_profile_customer_info: async (id) => {
                const token = localStorage.getItem("token");

                try {
                    const response = await fetch(
                        process.env.BACKEND_URL + "/api/cmr_profile", {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": `Bearer ${token}`,
                        },
                    }
                    );
                    const data = await response.json();
                    setStore({ cmr_profile: data.result })
                    console.log(data);
                } catch (error) {
                    console.log("error loading message from backend", error);
                }
            },


            // PETICIÓN PARA AGREGAR UNA HABILIDAD AL PERFIL DEL USUARIO-PROFESIONAL
            addSkillToProfile: async (skillName) => {
                const token = localStorage.getItem("token");

                try {
                    const response = await fetch(`${process.env.BACKEND_URL}/api/pro_profile_skill`, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": `Bearer ${token}`,
                        },
                        body: JSON.stringify({ skill_name: skillName }),
                    });

                    if (response.ok) {
                        const data = await response.json();
                        console.log(data)
                    } else {
                        throw new Error("Error en la solicitud");
                    }
                } catch (error) {
                    console.error("Error:", error);
                }
            },

            //FETCH PARA CREAR UN ESPACIO/HOME
            addHome: async (newHome) => {
                console.log(newHome);
                try {
                    console.log("Data being sent to the endpoint:", {
                        nameSpace: newHome.nameSpace,
                        nameCity: newHome.nameCity,
                        DescriptionSpace: newHome.DescriptionSpace,
                        addressSpace: newHome.addressSpace,
                        postalCodeSpace: newHome.postalCodeSpace
                    });

                    const response = await fetch(process.env.BACKEND_URL + "/api/home", {
                        method: "POST",
                        body: JSON.stringify({
                            nameSpace: newHome.nameSpace,
                            nameCity: newHome.nameCity,
                            DescriptionSpace: newHome.DescriptionSpace,
                            addressSpace: newHome.addressSpace,
                            postalCodeSpace: newHome.postalCodeSpace
                        }),
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": `Bearer ${localStorage.getItem("token")}`,
                        },
                    });

                    const data = await response.json();
                    console.log(data);
                } catch (error) {
                    console.log("error loading message from backend", error);
                }
            },










            //VALIDACION DE TOKEN 
            valide_token: async () => {
                const token = localStorage.getItem("token");
                console.log(token);
                try {
                    const data = await axios.get(
                        process.env.BACKEND_URL + "/api/valide-token", {
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": `Bearer ${token}`,
                        },
                    }
                    );
                    if (data.status === 200) {
                        console.log(data);
                        setStore({
                            isLoggedIn: data.data.isLogged,
                        });
                    }
                    return true;
                    //}
                } catch (error) {
                    console.log()
                    if (error.status == 422) {
                        getActions().logged_out()
                    }
                }
            },

            //FUNCION CERRAR SESION 
            logged_out: () => {
                localStorage.removeItem("token")
                localStorage.removeItem("id")
                setStore({
                    isLoggedIn: false,
                });
            },

            // establecer rol
            setRole: (role) => {
                const store = getStore();
                let updatedRole = "";

                switch (role) {
                    case "profesional":
                        updatedRole = "profesional";
                        break;
                    case "cliente":
                    default:
                        updatedRole = "cliente";
                        break;
                }

                setStore({
                    ...store,
                    role: updatedRole,
                });
            },
        },
    };
};

export default getState;