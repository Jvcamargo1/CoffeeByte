import "../assets/css/banner.css"

function Banner() {
    return (
        <div className="banner">
            <div className="text">
                <h1>Anuncie aqui!</h1>
                <p>
                    Explore um mundo de opções de café em um só lugar! No Latte, reunimos os melhores produtos e cafeterias de café de todo o mundo em um único marketplace. É o seu destino para descobrir cafés excepcionais, de grãos especiais a blends únicos.
                </p>
            </div>
            <div className="banner-img">
                {/* café PNG foi desenvolvido por tree e vem de https://pt.pngtree.com/freepng/coffee-cup-aroma-container_6373241.html?sol=downref&id=bef */}
                <img src="./src/assets/cafe.png" alt="Banner"/>
            </div>
        </div>
    )
}

export default Banner;