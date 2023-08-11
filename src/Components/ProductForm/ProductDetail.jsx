import React, { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase-config";
import { useParams } from "react-router-dom";
import { Header } from "../Header/header";
import "./product-detail.css";
import cart from "../Resources/Card_resources/cart.svg";
import elipse from "../Resources/Card_resources/elipse.svg";

function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isDescriptionExpanded, setDescriptionExpanded] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const productDoc = doc(db, "e-commerce", id);
        const productSnapshot = await getDoc(productDoc);

        if (productSnapshot.exists()) {
          setProduct({ id: productSnapshot.id, ...productSnapshot.data() });
        } else {
          console.log("No se encontró el producto");
        }

        setLoading(false);
      } catch (error) {
        console.error("Error al obtener el producto:", error);
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return <p>Cargando producto...</p>;
  }

  if (!product) {
    return <p>No se encontró el producto.</p>;
  }

  const handleDownload = () => {
    // Lógica para descargar el archivo .rar
    if (product.compressed !== 0 && product.compressed !== null) {
      const a = document.createElement("a");
      a.href = product.compressed;
      a.download = `${product.title}.rar`;
      a.target = "_blank"; // Agregar esta línea para abrir en nueva pestaña
      a.click();
    }
  };

  const handleBuy = () => {
    // Lógica para comprar el e-book
    console.log("Comprando el e-book:", product.title);
  };

  const handleDescriptionToggle = () => {
    setDescriptionExpanded(!isDescriptionExpanded);
  };

  return (
    <div className="main-detail-container">
      <Header />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <h1>DETALLE DEL PRODUCTO</h1>
      <div className="main-detail">
        <div className="img-container">
          <div className="title-mobile">
            <h3 title-mobile>{product.title}</h3>
          </div>
          <img src={product.thumbnail} alt={product.title} />
        </div>

        <div className="detail-content">
          <div className="title-tablet">
            <h3>{product.title}</h3>
          </div>

          <p className="price-detail">{product.detail}</p>
          <p className="e-book">E-book</p>
          {product.price !== "Gratis" && product.price !== null ? (
            <div className="buying">
              <p className="price-p">Precio: ${product.price}</p>
              <button onClick={handleBuy}>Comprar</button>
            </div>
          ) : (
            <button className="download-button" onClick={handleDownload}>
              Descargar Archivo
            </button>
          )}
        </div>

        <div className="extra"></div>
        <div className="disponibilty">
          <p className="disponibilidad">Disponible inmediatamente</p>
        </div>
        <hr />
        <div className="book-description">
          <span>
            {isDescriptionExpanded
              ? "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Molestias corporis repellat deleniti? Similique autem eius dolore totam ratione harum obcaecati voluptatem enim quo ipsum accusamus nobis suscipit animi, quod laboriosam, assumenda tempora, magnam eveniet reprehenderit ea! Rem maiores explicabo dolorum. Optio ratione veritatis in obcaecati? Cupiditate dignissimos vel exercitationem enim."
              : "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Molestias corporis repellat deleniti? Similique autem eius dolore totam ratione harum obcaecati voluptatem enim quo ipsum accusamus nobis suscipit animi, quod laboriosam, assumenda tempora, magnam eveniet reprehenderit ea!"}
          </span>
          <br />

          <div className="dropdown-button">
            <p onClick={handleDescriptionToggle}>
              {isDescriptionExpanded ? "Ver menos" : "Ver más"}
            </p>
          </div>
        </div>

        <div className="recomendation">
          {/* Resto del contenido de recomendación */}
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
