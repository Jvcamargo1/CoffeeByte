import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import CoffeeInfo from "./CoffeeInfo";
import Content from "./Content";

function ProductInfo() {
    const { id } = useParams();
    const [product, setProduct] = useState([]);

    const getData = async() => {
        try {
            const res = await axios.post("http://localhost:3000/product-filter-id", { id });
            setProduct(res.data[0]);
        } catch(error) {
            console.error(error);
        }
    }

    useEffect(() => {
        getData();
    }, [id]);

    return (
        <>
            {
                <CoffeeInfo
                    key={product.id}
                    title={product.title}
                    img_src={product.img_src}
                    description={product.description}
                    price={product.price}
                    email={product.email}
                />
            }
            <Content/>
        </>
    )
}

export default ProductInfo;