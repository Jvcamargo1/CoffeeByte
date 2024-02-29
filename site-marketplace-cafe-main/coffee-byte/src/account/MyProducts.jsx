import axios from "axios";
import { useEffect, useState } from "react";
import UserCoffees from "./UserCoffees";
import Loader from "../layout/Loader";

function MyProducts() {
    const [userProducts, setUserProducts] = useState([]);
    const [removeLoading, setRemoveLoading] = useState(false);

    axios.defaults.withCredentials = true;

    const getUserData = async() => {
        try {
            const res = await axios.get("http://localhost:3000/user-products");
            setUserProducts(res.data);
            setRemoveLoading(true);
        } catch(error) {
            console.error(error);
        }
    }

    useEffect(() => {
        getUserData();
    }, [])

    return (
        <div className="main-content">
            <div className="container">
                {
                    userProducts.length > 0 ?
                    (
                        userProducts.map((product, index) => {
                            return <UserCoffees
                                key={index}
                                id={product.id}
                                title={product.title}
                                description={product.description}
                                src={product.img_src}
                                price={product.price}
                            />
                        })
                    ) : (
                        <div style={{ width: "100%" }}>
                            <p style={{ textAlign: "center" }}>Não há nenhum produto cadastrado.</p>
                        </div>
                    )
                }
                {!removeLoading && <Loader color={"#000"}/>}
            </div>
        </div>
    )
}

export default MyProducts;