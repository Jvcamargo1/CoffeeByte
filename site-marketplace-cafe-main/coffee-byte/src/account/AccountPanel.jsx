import Button from "../layout/Button";
import MyProducts from "./MyProducts";
import { Link } from "react-router-dom";
import "../assets/css/account-panel.css";
import axios from "axios";

function AccountPanel() {

    const handleDelete = async() => {
        console.log("Click");
        try {
            const res = await axios.get("http://localhost:3000/logout");
            location.reload(true);
        } catch(error) {
            console.error(error);
        }
    }

    return (
        <>
            <div className="your-products">
                <div className="your-products-title">
                    <h1>Seus produtos</h1>
                    <Link to="/product-register">
                        <Button
                            content={"CADASTRAR PRODUTO"}
                            backgroundColor={"#fff"}
                            hover={"#ccc"}
                            color={"#000"}
                        />
                    </Link>
                </div>
            </div>
            <div className="form-close">
                <Button
                    onClick={handleDelete}
                    content={"SAIR"}
                    backgroundColor={"#000"}
                    hover={"#393939"}
                    color={"#fff"}
                />
            </div>
            <MyProducts/>
        </>
    )
}

export default AccountPanel;