import "../assets/css/header.css"
import { Link } from "react-router-dom";

const headerImg = "./src/assets/mug-hot-solid.svg";

function Header() {
    return (
        <header>
            <div className="title">
                <img src={headerImg} alt="Logo" />
                <h1>Coffee Byte</h1>
            </div>
            <div className="navigation-bar">
                <ul>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/account">Cadastro</Link>
                    </li>
                </ul>
            </div>
        </header>
    );
}

export default Header;