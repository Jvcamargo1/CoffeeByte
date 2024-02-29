import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const validateEmail = new RegExp(
    "^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]$"
);

const validatePassword = new RegExp(
    "^(?=.*?[A-Za-z])(?=.*?[0-9]).{6,}$"
);

function Register() {
    const [values, setValues] = useState({
        name: "",
        email: "",
        password: ""
    });

    const [emailError, setEmailError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);

    const navigate = useNavigate();

    const validate = (event) => {
        if(!validateEmail.test(values.email)) {
            setEmailError(true);
            return false;
        } else {
            setEmailError(false);
        }

        if(!validatePassword.test(values.password)) {
            setPasswordError(true);
            return false;
        } else {
            setPasswordError(false);
        }

        return true;
    }
    
    const register = async(event) => {
        event.preventDefault();
        validate(event);
        const isValid = validate();
        if(!isValid) {
        } else {
            try {
                const res = await axios.post("http://localhost:3000/register", values);
                console.log(res.data.status);
                if(res.data.status === "success") {
                    console.log("Registrado com sucesso!");
                    navigate("/login");
                    location.reload(true);
                }
            } catch(error) {
                console.error(error);
            }
        }
    }

    return (
        <div>
            <form onSubmit={register}>
                <h1>Cadastro</h1>
                <div className="input-container">
                    <input
                        type="text"
                        className="input-answer"
                        id="name"
                        required
                        onChange={e => {
                            setValues({...values, name: e.target.value});
                        }}
                    />
                    <label htmlFor="name" className="input-label">Nome de usuário</label>
                </div>
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
                {emailError && (
                    <p className="form-error">Por favor, digite um e-mail válido</p>
                )}
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
                {passwordError && (
                    <p className="form-error">Por favor, digite uma senha mais segura</p>
                )}
                <input
                    className="input-submit"
                    type="submit" value="CADASTRAR"
                />
            </form>
            <div className="form-toggle">
                <p>Já possui conta?</p>
                <Link className="button-form-toggle" to="/login">Logar</Link>
            </div>
        </div>
    )
}

export default Register;