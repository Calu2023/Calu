import { useEffect, useState, useRef } from "react";
import {
  collection,
  getDocs,
  deleteDoc,
  doc,
  getDoc,
} from "firebase/firestore";
import { db, storage, auth } from "../../firebase-config";
import { Link, useNavigate } from "react-router-dom";
import { ref, deleteObject } from "firebase/storage";
import { Header } from "../Header/header";
import "./product-list.css";
import { useCustomContext } from "../../Hooks/Context/Context";
import Contact_button from "../Home/Contact_button/Contact_button";
import arrow_L from "../Home/icon_arrow_left.svg";

function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [flippedProductId, setFlippedProductId] = useState(null);
  const [user, setUser] = useState(null); // Add user state
  const navigate = useNavigate();
  const { cart, addToCart, removeFromCart } = useCustomContext();

  const productsCollectionRef = collection(db, "e-commerce");
  const firstSection = useRef(null);

  const scrollToTop = () => {
    firstSection.current?.scrollIntoView({ behavior: "smooth" });
  };

  const deleteProduct = async (id, thumbnail) => {
    const productDoc = doc(db, "e-commerce", id);
    await deleteDoc(productDoc);

    if (thumbnail) {
      const thumbnailRef = ref(storage, thumbnail);
      await deleteObject(thumbnailRef);
    }

    // Update the product list after deleting
    setProducts((prevList) => prevList.filter((product) => product.id !== id));
  };

  const handleEditProduct = (productId) => {
    const productToEdit = products.find((product) => product.id === productId);
    navigate(`/product-form`, { state: { productToEdit } });
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const querySnapshot = await getDocs(productsCollectionRef);
        const productsData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setProducts(productsData);
        setLoading(false);
      } catch (error) {
        console.error("Error al obtener los productos:", error);
        setLoading(false);
      }
    };

    fetchProducts();

    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });

    return () => {
      unsubscribe();
    };
  }, [cart]);

  const handleFlipCard = (productId) => {
    setFlippedProductId(productId === flippedProductId ? null : productId);
  };

  const handleAddToCart = async (id) => {
    const querySnapshot = doc(db, "e-commerce", id);
    const docSnapshot = await getDoc(querySnapshot);
    const productToAdd = docSnapshot.data();
    addToCart(productToAdd);
  };

  return (
    <div>
      <Header cartItem={cart} handleDelete={removeFromCart} />
      <button className="arrow_up12" onClick={scrollToTop}>
        <img className="arrow_up" src={arrow_L} alt="Arrow Up" />
      </button>
      <Contact_button />

      <br ref={firstSection} />
      <br />
      <br />
      <br />
      <br />

      <div className="main-container">
        <h1 className="products_title">Lista de Productos</h1>
        <h2 className="our-products">Nuestro productos</h2>
        <div className="products">
          {products.map((product) => (
            <div className="main-product" key={product.id}>
              <div
                className={`product-inner ${
                  flippedProductId === product.id ? "flipped" : ""
                }`}
                onClick={() => handleFlipCard(product.id)}
              >
                <div
                  className={`product-front ${
                    flippedProductId === product.id ? "hidden" : ""
                  }`}
                >
                  <img
                    src={product.thumbnail}
                    alt={product.title}
                    width="140px"
                    height="140px"
                  />
                </div>
                <div
                  className={`product-back ${
                    flippedProductId === product.id ? "" : "hidden"
                  }`}
                >
                  <p>{product.detail}</p>
                </div>
              </div>
              <div className="product-price">
                <p className="price">${product.price}</p>
                <p
                  className="carrito-price"
                  onClick={() => handleAddToCart(product.id)}
                >
                  Agregar al carrito
                </p>
                <Link
                  className="link_"
                  to={`/product/${product.id}`}
                  onClick={() => {
                    window.scroll({
                      top: 0,
                    });
                  }}
                >
                  Ver Detalles
                </Link>
                {/* Botones de editar y eliminar */}
                {user && (
                  <div>
                    <button
                      className="edit-button"
                      onClick={() => handleEditProduct(product.id)}
                    >
                      Editar
                    </button>
                    <button
                      className="delete-button"
                      onClick={() =>
                        deleteProduct(product.id, product.thumbnail)
                      }
                    >
                      Eliminar
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ProductList;
