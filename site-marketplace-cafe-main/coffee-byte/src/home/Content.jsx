import { useEffect, useState } from "react";
import "../assets/css/content.css";
import Coffee from "./Coffee";
import Loader from "../layout/Loader";
import axios from "axios";

function Content() {
  const [coffees, setCoffees] = useState([]);
  const [removeLoading, setRemoveLoading] = useState(false);
  
  const getData = async() => {
    try {
      const res = await axios.get("http://localhost:3000/products");
      setCoffees(res.data);
      setRemoveLoading(true);
    } catch(error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <main>
      <div className="main-content">
        <div className="container">
          {
            coffees.length > 0 ?
            (
              coffees.map((coffee, index) => {
                return <Coffee
                  key={index}
                  id={coffee.id}
                  title={coffee.title}
                  description={coffee.description}
                  src={coffee.img_src}
                  price={coffee.price}
                />
              })
            ) : (
              <div style={{ width: "100%" }}>
                <br/>
                <p style={{ textAlign: "center" }}>Não há nenhum café cadastrado.</p>
                <br/>
              </div>
            )
          }
          {!removeLoading && <Loader color={"#fff"}/>}
        </div>
      </div>
    </main>
  )
}

export default Content