import { useEffect, useState } from 'react';
import { collection, getDocs, deleteDoc, doc, getDoc } from 'firebase/firestore';
import { db, storage } from '../../firebase-config';
import { Link, useNavigate } from 'react-router-dom';
import { ref, deleteObject } from 'firebase/storage';
import { Header } from '../Header/header';
import './product-list.css';
import CTN from '../CTN/CTN';
import Footer from '../Footer/Footer';
import { LoadingComponent } from '../LoadingComponent/LoadingComponent';

function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [flippedProductId, setFlippedProductId] = useState(null);
  const [cart, setCart] = useState([]);
  const isUserAuthenticated = localStorage.getItem('isAuth') === 'true';
  const navigate = useNavigate();

  const productsCollectionRef = collection(db, 'e-commerce');

  const deleteProduct = async (id, thumbnail) => {
    const productDoc = doc(db, 'e-commerce', id);
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
        setLoading(true); // Mostrar LoadingComponent mientras se obtienen los productos
        const querySnapshot = await getDocs(productsCollectionRef);
        const productsData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setProducts(productsData);
        setLoading(false); // Indicar que se han cargado los productos correctamente
      } catch (error) {
        console.error('Error al obtener los productos:', error);
        setLoading(false); // Indicar que ha ocurrido un error al cargar los productos
      }
    };

    fetchProducts();
  }, [cart]);

  if (loading) {
    return <LoadingComponent />;
  }

  if (products.length === 0) {
    return <p>No se encontraron productos.</p>;
  }

  const handleFlipCard = (productId) => {
    setFlippedProductId(productId === flippedProductId ? null : productId);
  };

  const handleAddToCart = async (id) => {
    const querySnapshot = doc(db, 'e-commerce', id);
    const docSnapshot = await getDoc(querySnapshot);
    const productToAdd = docSnapshot.data();
    setCart((prevCart) => [...prevCart, productToAdd]);
  };

  const handleDelete = (productTitle) => {
    setCart((prevCart) => prevCart.filter((product) => product.title !== productTitle));
  };

  return (
    <div className='main-container'>
      <Header cartItem={cart} handleDelete={handleDelete} />
      <br />
      <br />
      <br />
      <br />
      <br />
      <h1>Lista de Productos</h1>
      <h2 className='our-products'>Nuestros productos</h2>

      <div className='products'>
        {products.map((product) => (
          <div className='main-product' key={product.id}>
            <div
              className={`product-inner ${flippedProductId === product.id ? 'flipped' : ''}`}
              onClick={() => handleFlipCard(product.id)}
            >
              <div className={`product-front ${flippedProductId === product.id ? 'hidden' : ''}`}>
                <img src={product.thumbnail} alt={product.title} />
              </div>
              <div className={`product-back ${flippedProductId === product.id ? '' : 'hidden'}`}>
                <p>{product.detail}</p>
              </div>
            </div>
            <div className='product-price'>
              <p className='price'>${product.price}</p>
              <p className='carrito-price' onClick={() => handleAddToCart(product.id)}>
                Agregar al carrito
              </p>
              <Link to={`/product/${product.id}`}>Ver detalles</Link>
            </div>
            {isUserAuthenticated && (
              <>
                <button onClick={() => handleEditProduct(product.id)}>Editar</button>
                <button onClick={() => deleteProduct(product.id, product.thumbnail)}>
                  Eliminar
                </button>
              </>
            )}
          </div>
        ))}
      </div>
      <div className='ctn'>
        <CTN />
      </div>
      <div className='footer-blog'>
        <Footer />
      </div>
    </div>
  );
}

export default ProductList;
