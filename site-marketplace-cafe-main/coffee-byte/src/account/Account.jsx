import "../assets/css/formulario.css";
import Register from "./Register";
import Login from "./Login";
import ProductRegister from "./ProductRegister";
import { useEffect, useState } from "react";
import axios from "axios";
import AccountPanel from "./AccountPanel";

function Formulario() {
    const [auth, setAuth] = useState(false);

    axios.defaults.withCredentials = true;

    const getInfo = async() => {
        try {
            const res = await axios.get("http://localhost:3000/validation");
            if(res.data.status === "success") setAuth(true);
        } catch(error) {
            setAuth(false);
            console.error(error);
        }
    }
    
    useEffect(() => {
        getInfo();
    }, []);

    return (
        <div>
            {
                auth ?
                <AccountPanel/>
                :
                <Login/>
            }
        </div>
    );
}

export default Formulario;