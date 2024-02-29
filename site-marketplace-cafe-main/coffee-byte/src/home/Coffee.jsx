import "../assets/css/coffee.css";
import { Link } from "react-router-dom";
import Button from "../layout/Button";

const priceValue = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL"
}).format;

function Coffee({ id, title, description, src, price }) {
    const url = `http://localhost:3000/${src}`;

    const formattedPrice = priceValue(price);

    return (
        <div className="container-coffee">
            <div className="coffee">
                <h1>{title}</h1>
                <img className="img-container" src={url}/>
                <p>{description}</p>
                <div className="price">
                    <p>{formattedPrice}</p>
                </div>
                <Link to={`/product/${id}`}>
                    <Button
                        content={"COMPRAR"}
                        backgroundColor={"#fff"}
                        hover={"#ccc"}
                        color={"#000"}
                    />
                </Link>
            </div>
        </div>
    )
}

export default Coffee;