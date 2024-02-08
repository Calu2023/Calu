import { useEffect, useState } from 'react';
import { Header } from '../Header/header';
import './AdminCrud.css';
import { db, storage } from '../../firebase-config';
import { collection, getDocs, deleteDoc, doc, addDoc, getDoc, updateDoc } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import CreateService from './CreateService';
import EditService from './EditService';
//import EditService from './EditService';
import { useNavigate } from 'react-router-dom';
import { auth } from '../../firebase-config';
const AdminCrud = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const checkAuthentication = () => {
      const user = auth.currentUser;
      if (!user) {
        navigate('/admin-login');
      }
    };

    checkAuthentication();
  }, []);

  const [servicesList, setServicesList] = useState([]);
  const [modal, setModal] = useState(false);
  const [modalEdit, setModalEdit] = useState(false);
  const [blur, setBlur] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    sub: '',
    des_1: '',
    des_2: '',
    des_3: '',
    img: '',
  });
  const [editItemId, setEditItemId] = useState({
    id: '',
    title: '',
    sub: '',
    des_1: '',
    des_2: '',
    des_3: '',
    img: '',
  });

  const servicesCollectionRef = collection(db, 'servicios');

  useEffect(() => {
    const getServices = async () => {
      const data = await getDocs(servicesCollectionRef);
      setServicesList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getServices();
  }, [servicesList, servicesCollectionRef]);

  const closeModal = () => {
    setModal(false);
    setModalEdit(false);
    setBlur(false);
  };

  const handleAddService = async () => {
    setModal(true);
    setBlur(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const imageFile = e.target.img.files[0];
    const storageRef = ref(storage, 'images/' + imageFile.name);

    await uploadBytes(storageRef, imageFile);
    const imageUrl = await getDownloadURL(storageRef);

    const newService = {
      id: formData.id + 1,
      title: formData.title,
      sub: formData.sub,
      des_1: formData.des_1,
      des_2: formData.des_2,
      des_3: formData.des_3,
      img: imageUrl,
    };
    await addDoc(servicesCollectionRef, newService);

    setFormData({
      title: '',
      sub: '',
      des_1: '',
      des_3: '',
      img: '',
    });
    closeModal();
  };

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleDelete = async (serviceId) => {
    await deleteDoc(doc(db, 'servicios', serviceId));
  };

  const handleChangeEdit = (event) => {
    setEditItemId({
      ...editItemId,
      [event.target.name]: event.target.value,
    });
  };

  const handleEdit = async (serviceId) => {
    const servicioRef = doc(db, 'servicios', serviceId);
    const data = await getDoc(servicioRef);

    setEditItemId({
      id: serviceId,
      title: data.data().title,
      sub: data.data().sub,
      des_1: data.data().des_1,
      des_2: data.data().des_2,
      des_3: data.data().des_3,
      img: data.data().img,
    });
    setModalEdit(true);
    setBlur(true);
  };

  const handleSubmitEdit = async (event) => {
    event.preventDefault();
    const serviceId = doc(db, 'servicios', editItemId.id);
    const imageFile = event.target.img.files[0];
    if (imageFile) {
      const storageRef = ref(storage, 'images/' + imageFile.name);
      await uploadBytes(storageRef, imageFile);
      const imageUrl = await getDownloadURL(storageRef);
      const newData = {
        title: editItemId.title,
        sub: editItemId.sub,
        des_1: editItemId.des_1,
        des_2: editItemId.des_2,
        des_3: editItemId.des_3,
        img: imageUrl,
      };
      await updateDoc(serviceId, newData);
    } else {
      const newData = {
        title: editItemId.title,
        sub: editItemId.sub,
        des_1: editItemId.des_1,
        des_2: editItemId.des_2,
        des_3: editItemId.des_3,
      };
      await updateDoc(serviceId, newData);
    }

    setEditItemId({
      title: '',
      sub: '',
      des_1: '',
      des_3: '',
      img: '',
    });
    closeModal();
  };
  return (
    <div className='crud-ctn'>
      <Header />

      <div className='services'>
        <div className='crud-ctn2'>
          <div
            className={blur ? 'crudBlur' : 'crudContainer'}
            style={{ overflowY: 'scroll', maxHeight: '900px' }}
          >
            <ul className='crudTags'>
              <li>ID</li>
              <li>Titulo</li>
              <li>Descripcion</li>
              <li>Imagen</li>
            </ul>
            <ul className='crudItems'>
              {servicesList.map((servicio, index) => {
                const fullDescription = `${servicio.des_1} ${servicio.des_2} ${servicio.des_3}`;
                const words = fullDescription.split(' ');
                const truncatedWords = words.slice(0, 7);
                const truncatedDescription = truncatedWords.join(' ');
                const description =
                  words.length > 7 ? `${truncatedDescription}...` : truncatedDescription;
                return (
                  <li key={index}>
                    <div className='crudDescription'>
                      <div> {index + 1}</div>
                      <div className='crudTitle'>{servicio.title}</div>
                      <div className='crudText'>{description}</div>
                      <div className='crudImage'>
                        <img src={servicio.img} width='210px' alt={servicio.img} />
                      </div>
                      <div>
                        <button onClick={() => handleEdit(servicio.id)}>Editar</button>
                        <button onClick={() => handleDelete(servicio.id)}>Borrar</button>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
          <button onClick={handleAddService}>Agregar</button>
        </div>
        {/* MODAL AGREGAR */}
        {modal && (
          <CreateService
            closeModal={closeModal}
            handleSubmit={handleSubmit}
            formData={formData}
            handleChange={handleChange}
          />
        )}
        {/* MODAL Editar */}
        {modalEdit && (
          <EditService
            serviceId={editItemId}
            closeModal={closeModal}
            handleChange={handleChangeEdit}
            handleSubmit={handleSubmitEdit}
          />
        )}
      </div>
    </div>
  );
};
export default AdminCrud;
