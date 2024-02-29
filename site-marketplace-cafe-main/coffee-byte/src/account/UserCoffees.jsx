import "../assets/css/coffee.css";
import Button from "../layout/Button";
import { Link } from "react-router-dom";
import axios from "axios";

const priceValue = new Intl.NumberFormat("pt-BR", { 
    style: "currency", 
    currency: "BRL" 
}).format;

function Coffee({ id, title, description, src, price }) {
    const url = `http://localhost:3000/${src}`;

    const formattedPrice = priceValue(price);

    const deleteProduct = async() => {
        try {
            const res = await axios.delete(`http://localhost:3000/delete-product/${id}`);
            if(res.data.status === "success") {
                location.reload(true);
            }
        } catch(error) {
            console.error(error);
        }
    }

    return (
        <div className="container-coffee">
            <div className="coffee" style={{ border: "1px solid #000" }}>
                <h1>{title}</h1>
                <img className="img-container" src={url}/>
                <p>{description}</p>
                <div className="price">
                    <p>{formattedPrice}</p>
                </div>
                <Link to={`/product-edit/${id}`}>
                    <Button
                        content={"EDITAR"}
                        backgroundColor={"#000"}
                        hover={"#393939"}
                        color={"#fff"}
                    />
                </Link>
                <br/>
                <Button
                    onClick={deleteProduct}
                    content={"DELETAR PRODUTO"}
                    backgroundColor={"#000"}
                    hover={"#393939"}
                    color={"#fff"}
                />
            </div>
        </div>
    )
}

export default Coffee;