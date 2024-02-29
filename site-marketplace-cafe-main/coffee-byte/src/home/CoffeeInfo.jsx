import "../assets/css/coffee-info.css";

const priceValue = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL"
}).format;

function CoffeeInfo({ title, img_src, description, price, email }) {
    const url = `http://localhost:3000/${img_src}`;

    const formattedPrice = priceValue(price);
    
    return (
        <>
            <div className="product-coffee-info">
                <div className="product-coffee">
                    <div className="coffee-info-img">
                        <img src={url} />
                    </div>
                    <div className="coffee-info">
                        <p>{title}</p>
                        <p>{description}</p>
                        <p>{formattedPrice}</p>
                        <p><em>E-mail</em> de contato do fornecedor: {email}</p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CoffeeInfo;