import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Button from "../layout/Button";

function ProductRegister() {
    const [values, setValues] = useState({
        title: "",
        description: "",
        price: ""
    });
    const [file, setFile] = useState();

    const navigate = useNavigate();

    const validate = async() => {
        try {
            const res = await axios.get("http://localhost:3000/validation");
            if(res.data.status !== "success") navigate("/login");
        } catch(error) {
            console.error(error);
            navigate("/login")
        }
    }
    
    useEffect(() => {
        validate();
    }, []);

    const registerProduct = async(event) => {
        event.preventDefault();
        if(!file && values.title && values.description && values.price) return;
        const formData = new FormData();
        formData.append("file", file);
        formData.append("title", values.title);
        formData.append("description", values.description);
        formData.append("price", values.price);
        try {
            const res = await axios.post("http://localhost:3000/register-product", formData);
            if(res.data.status === "success") {
                navigate("/account");
                location.reload(true);
            }
        } catch(error) {
            console.error(error);
        }
    }
    
    const handleDelete = async() => {
        try {
            const res = await axios.get("http://localhost:3000/logout");
            location.reload(true);
        } catch(error) {
            console.error(error);
        }
    }

    return (
        <>
            <form>
                <h1>Cadastre o seu produto</h1>
                <div className="input-container">
                    <input
                        type="text"
                        className="input-answer"
                        id="title"
                        required
                        onChange={e => {
                            setValues({...values, title: e.target.value});
                        }}
                    />
                    <label htmlFor="title" className="input-label">Título</label>
                </div>
                <div className="input-container">
                    <input
                        type="text"
                        className="input-answer"
                        id="description"
                        required
                        onChange={e => {
                            setValues({...values, description: e.target.value});
                        }}
                    />
                    <label htmlFor="description" className="input-label">Descrição</label>
                </div>
                <div className="input-container">
                    <input
                        type="number"
                        className="input-answer"
                        id="price"
                        step="0.01"
                        required
                        onChange={e => {
                            setValues({...values, price: e.target.value});
                        }}
                    />
                    <label htmlFor="title" className="input-label">Preço</label>
                </div>
                <div className="input-container">
                    <label className="input-file" htmlFor="file">SELECIONE UM ARQUIVO</label>
                    <input
                        type="file"
                        id="file"
                        onChange={e => {
                            setFile(e.target.files[0]);
                        }}
                    />
                </div>
                <Button
                    onClick={registerProduct}
                    content={"CADASTRAR PRODUTO"}
                    backgroundColor={"#000"}
                    hover={"#393939"}
                    color={"#fff"}
                />
            </form>
        </>
    )
}

export default ProductRegister;