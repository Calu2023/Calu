import React, { useEffect, useState, useRef, Suspense } from 'react';
import { addDoc, collection, doc, getDoc, getDocs } from 'firebase/firestore';
import { db } from '../../firebase-config';
import { useParams } from 'react-router-dom';
import { Header } from '../Header/header';
import './product-detail.css';
import cart_img from '../Resources/Card_resources/carrito.webp';
import elipse from '../Resources/Card_resources/elipse.webp';
import { useCustomContext } from '../../Hooks/Context/Context';
import { Link } from 'react-router-dom';
import Contact_button from '../Home/Contact_button/Contact_button';
import arrow_L from '../Home/icon_arrow_left.webp';
import Slider from '../Slider/Slider';

function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isDescriptionExpanded, setDescriptionExpanded] = useState(false);

  const [modal, setModal] = useState(false);

  const { cart, addToCart, removeFromCart, handleBlur } = useCustomContext();
  const [similarProducts, setSimilarProducts] = useState([]);
  const firstSection = useRef(null);
  const scrollToTop = () => {
    firstSection.current?.scrollIntoView({ behavior: 'smooth' });
  };
  const [width, setWidth] = React.useState(window.innerWidth);
  const breakpoint = 1200;
  React.useEffect(() => {
    const handleResizeWindow = () => setWidth(window.innerWidth);

    window.addEventListener('resize', handleResizeWindow);
    return () => {
      window.removeEventListener('resize', handleResizeWindow);
    };
  }, []);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const productDoc = doc(db, 'e-commerce', id);
        const productSnapshot = await getDoc(productDoc);

        if (productSnapshot.exists()) {
          const fetched = { id: productSnapshot.id, ...productSnapshot.data() };
          setProduct(fetched);
          similars(fetched);
        } else {
          console.log('No se encontró el producto');
        }
        setLoading(false);
      } catch (error) {
        console.error('Error al obtener el producto:', error);
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const similars = async (fetched) => {
    const productsSimilars = collection(db, 'e-commerce');
    const similarsSnapshot = await getDocs(productsSimilars);
    if (similarsSnapshot) {
      const products = similarsSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      const similars = products.filter(
        (category) => category.category === fetched.category && category.id !== fetched.id
      );
      setSimilarProducts(similars);
    }
  };

  if (loading) {
    return <p>Cargando producto...</p>;
  }

  if (!product) {
    return <p>No se encontró el producto.</p>;
  }

  const handleDescriptionToggle = () => {
    setDescriptionExpanded(!isDescriptionExpanded);
  };

  const handleAddToCart = async (id) => {
    const querySnapshot = doc(db, 'e-commerce', id);
    const docSnapshot = await getDoc(querySnapshot);
    const productToAdd = docSnapshot.data();
    addToCart(productToAdd);
  };

  const handleDownloadAndBuy = (id) => {
    handleAddToCart(id);
    setModal(true);
    alert('Producto Agregado');
    handleBlur();
    //handleDownload();
  };

  const saveEmailToFirebase = async (email) => {
    try {
      const emailsCollectionRef = collection(db, 'email'); // Cambiar al nombre correcto de la colección
      await addDoc(emailsCollectionRef, {
        email,
        timestamp: new Date(),
      });
      console.log('Correo electrónico guardado en Firebase exitosamente');
    } catch (error) {
      console.error('Error al guardar el correo electrónico en Firebase:', error);
    }
  };

  return (
    <Suspense>
      <Header cartItem={cart} handleDelete={removeFromCart} />
      <button className='arrow_up12' onClick={scrollToTop}>
        <img className='arrow_up' src={arrow_L} alt='Arrow Up' />
      </button>
      <Contact_button />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />

      <div className={`main-detail-container `} ref={firstSection}>
        <h1>DETALLE DEL PRODUCTO</h1>
        <div className='main-detail'>
          <div className='img-container'>
            <div className='title-mobile'>
              <h3 className='title-mobile>'>{product.title}</h3>
            </div>
            <img src={product.thumbnail} alt={product.title} />
          </div>

          <div className='detail-content'>
  <div className='title-tablet'>
    <h3>{product.title}</h3>
  </div>

  <p className='price-detail'>{product.detail}</p>
  <p className='e-book'>E-book</p>
  {product.price !== null ? (
    <div className='buying'>
      <p className='price-p'>Precio: {isNaN(product.price) ? 'Gratis' : `$${product.price}`}</p>
      <button
        className='download-button'
        onClick={() => handleDownloadAndBuy(product.id)}
      >
        Agregar al carrito
      </button>
    </div>
  ) : (
    <>
      <button
        className='download-button'
        onClick={() => handleDownloadAndBuy(product.id)}
      >
        Agregar al carrito
      </button>
    </>
  )}
</div>


          <div className='extra'></div>
          <div className='book-description'>
            <div className='disponibilty'>
              <p className='disponibilidad'>Disponible inmediatamente</p>
            </div>
            <hr />
            <span>
              {isDescriptionExpanded
                ? 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Molestias corporis repellat deleniti? Similique autem eius dolore totam ratione harum obcaecati voluptatem enim quo ipsum accusamus nobis suscipit animi, quod laboriosam, assumenda tempora, magnam eveniet reprehenderit ea! Rem maiores explicabo dolorum. Optio ratione veritatis in obcaecati? Cupiditate dignissimos vel exercitationem enim.'
                : 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Molestias corporis repellat deleniti? Similique autem eius dolore totam ratione harum obcaecati voluptatem enim quo ipsum accusamus nobis suscipit animi, quod laboriosam, assumenda tempora, magnam eveniet reprehenderit ea!'}
            </span>
            <br />

            <div className='dropdown-button'>
              <p onClick={handleDescriptionToggle}>
                {isDescriptionExpanded ? 'Ver menos' : 'Ver más'}
              </p>
            </div>
          </div>

          <div className='recomendation'>
            {width <= breakpoint || similarProducts.length > 3 ? (
              <>
                <h3>Más de esta serie</h3>
                <Slider>
                  {similarProducts.map((similarProduct, index) => (
                    <div className='book' key={index}>
                      <Link
                        className='link_'
                        to={`/product/${similarProduct.id}`}
                        onClick={scrollToTop}
                      >
                        <div>
                          <img src={similarProduct.thumbnail} alt='' width='150px' height='150px' />
                        </div>
                        <div className='title-autor'>
                          <h4>{similarProduct.title}</h4>
                          <h6>Autor</h6>
                        </div>
                      </Link>
                      <div className='type-price'>
  <p>Tipo de libro</p>
  <p>{!isNaN(similarProduct.price) ? `$${similarProduct.price}` : similarProduct.price}</p>
</div>
                      <div
                        className='product_cart'
                        onClick={() => handleAddToCart(similarProduct.id)}
                      >
                        <img src={elipse} alt=' ' className='elipse_product' />
                        <img src={cart_img} alt=' ' className='cart_product' />
                      </div>
                    </div>
                  ))}
                </Slider>
              </>
            ) : width > breakpoint && similarProducts.length >= 1 ? (
              <>
                <h3>Más de esta serie</h3>
                <div className='book-recomendation'>
                  {similarProducts.map((similarProduct, index) => (
                    <div className='book' key={index}>
                      <Link
                        className='link_'
                        to={`/product/${similarProduct.id}`}
                        onClick={scrollToTop}
                      >
                        <div>
                          <img src={similarProduct.thumbnail} alt='' width='150px' height='150px' />
                        </div>
                        <div className='title-autor'>
                          <h4>{similarProduct.title}</h4>
                          <h6>Autor</h6>
                        </div>
                      </Link>
                      <div className='type-price'>
  <p>Tipo de libro</p>
  <p>{!isNaN(similarProduct.price) ? `$${similarProduct.price}` : similarProduct.price}</p>
</div>
                      <div
                        className='product_cart'
                        onClick={() => handleAddToCart(similarProduct.id)}
                      >
                        <img src={elipse} alt=' ' className='elipse_product' />
                        <img src={cart_img} alt=' ' className='cart_product' />
                      </div>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <h3>Por el momento no hay productos similares</h3>
            )}
          </div>
        </div>
      </div>
    </Suspense>
  );
}

export default ProductDetail;
