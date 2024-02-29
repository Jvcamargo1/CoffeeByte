import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Login() {
    const [values, setValues] = useState({
        email: "",
        password: ""
    });

    const navigate = useNavigate();

    axios.defaults.withCredentials = true;

    const login = async(event) => {
        event.preventDefault();
        try {
            const res = await axios.post("http://localhost:3000/login", values);
            if(res.data.status === "success") {
                navigate("/account");
                location.reload(true);
            }
        } catch(error) {
            console.error(error);
        }
    }

    return (
        <div>
            <form onSubmit={login}>
                <h1>Login</h1>
                <div className="input-container">
                    <input
                        type="text"
                        className="input-answer"
                        id="email"
                        required
                        onChange={e => {
                            setValues({...values, email: e.target.value});
                        }}
                    />
                    <label htmlFor="email" className="input-label">E-mail</label>
                </div>
                <div className="input-container">
                    <input
                        type="password"
                        className="input-answer"
                        id="password"
                        required
                        onChange={e => {
                            setValues({...values, password: e.target.value});
                        }}
                    />
                    <label htmlFor="password" className="input-label">Senha</label>
                </div>
                <input
                    className="input-submit"
                    type="submit" value="ENTRAR"
                />
            </form>
            <div className="form-toggle">
                <p>Não possui conta?</p>
                <Link className="button-form-toggle" to="/register">Registrar</Link>
            </div>
        </div>
        
    )
}

export default Login;