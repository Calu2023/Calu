import React, { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase-config";
import { useParams } from "react-router-dom";
import { Header } from "../Header/header";
import './product-detail.css'
import Star from './star.svg'
import StarEmpty from './star-empty.svg'
import Heart from './heart.svg'
import ShareNode from './shared-node.svg'
import Carrito from './carrito.svg'
import CTN from '../CTN/CTN';
import Footer from '../Footer/Footer';
import { LoadingComponent } from "../LoadingComponent/LoadingComponent";

function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isDescriptionExpanded, setDescriptionExpanded] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true); // Mostrar LoadingComponent mientras se obtiene el producto
        const productDoc = doc(db, "e-commerce", id);
        const productSnapshot = await getDoc(productDoc);

        if (productSnapshot.exists()) {
          setProduct({ id: productSnapshot.id, ...productSnapshot.data() });
        } else {
          console.log("No se encontró el producto");
        }

        setLoading(false); // Indicar que se ha cargado el producto correctamente
      } catch (error) {
        console.error("Error al obtener el producto:", error);
        setLoading(false); // Indicar que ha ocurrido un error al cargar el producto
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return <LoadingComponent />;
  }

  if (!product) {
    return <p>No se encontró el producto.</p>;
  }

  const handleDownload = () => {
    // Lógica para descargar el e-book
    if (product.pdf !== 0 && product.pdf !== null) {
      const a = document.createElement("a");
      a.href = product.pdf;
      a.download = `${product.title}.pdf`;
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

      <Header/>
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <h2>DETALLE DEL PRODUCTO</h2>
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
          {product.price !== 'Gratis' && product.price !== null ? (
            <div className="buying">
              <p className="price-p">Precio: ${product.price}</p>
              <button onClick={handleBuy}>Comprar</button>
            </div>
          ) : (
            <button className="download-button" onClick={handleDownload}>Descargar</button>
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
          <h3>Mas de esta serie</h3>
          <div className="book-recomendation">

            <div className="book">

              <div className="book-content">

              </div>
              <div className="title-autor">
                <h4>Titulo</h4>
                <h6>Autor</h6>
              </div>
              <div className="type-price">
                <p>Tipo de libro</p>
                <p>$0000</p>
              </div>
              <div className="carrito-button">

                <img src={Carrito} alt="" />
              </div>
            </div>

            <div className="book">

              <div className="book-content">

              </div>
              <div className="title-autor">
                <h4>Titulo</h4>
                <h6>Autor</h6>
              </div>
              <div className="type-price">
                <p>Tipo de libro</p>
                <p>$0000</p>
              </div>
              <div className="carrito-button">

                <img src={Carrito} alt="" />
              </div>
            </div>
            <div className="book">

              <div className="book-content">

              </div>
              <div className="title-autor">
                <h4>Titulo</h4>
                <h6>Autor</h6>
              </div>
              <div className="type-price">
                <p>Tipo de libro</p>
                <p>$0000</p>
              </div>
              <div className="carrito-button">

                <img src={Carrito} alt="" />
              </div>
            </div>


          </div>
        </div>
      </div>
      <div className="ctn">
        <CTN />
      </div>
      <div className="footer-blog">
        <Footer />
      </div>
    </div>
  );
}

export default ProductDetail;
