import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Button from "../layout/Button";

function MyProductEdit() {
    const { id } = useParams();
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

    const getProductData = async() => {
        try {
            const res = await axios.post("http://localhost:3000/user-product-filter", { id });
            setValues({
                title: res.data[0].title,
                description: res.data[0].description,
                price: res.data[0].price,
                img_src: res.data[0].img_src
            });
        } catch(error) {
            console.error(error);
        }
    }

    useEffect(() => {
        getProductData();
    }, []);

    const request = async(formData) => {
        try {
            const res = await axios.post("http://localhost:3000/update-product", formData);
            if(res.data.status === "success") {
                navigate("/account");
                location.reload(true);
            }
        } catch(error) {
            console.error(error);
        }
    }

    const updateProduct = (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append("title", values.title);
        formData.append("description", values.description);
        formData.append("price", values.price);
        formData.append("id", id);
        formData.append("img_src", values.img_src);
        if(!file) {
            request(formData);
        } else {
            formData.append("file", file);
            request(formData);
        }
    }

    return (
        <>
            <form>
                <h1>Atualize o seu produto</h1>
                <div className="input-container">
                    <input
                        type="text"
                        className="input-answer"
                        id="title"
                        value={values.title}
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
                        value={values.description}
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
                        value={values.price}
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
                    onClick={updateProduct}
                    content={"ATUALIZAR PRODUTO"}
                    backgroundColor={"#000"}
                    hover={"#393939"}
                    color={"#fff"}
                />
            </form>
        </>
    )
}

export default MyProductEdit;