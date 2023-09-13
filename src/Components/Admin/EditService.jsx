import { useEffect } from 'react';

const EditService = ({ serviceId, closeModal, handleChange, handleSubmit }) => {
  useEffect(() => {}, [serviceId]);

  return (
    <div className='modal'>
      <h2 onClick={closeModal}>X</h2>
      <form action='' method='Post' encType='multipart/form-data' onSubmit={handleSubmit}>
        <label htmlFor='title'>Titulo </label>
        <input
          type='text'
          name='title'
          id='title'
          value={serviceId.title}
          onChange={handleChange}
        />
        <label htmlFor='sub'>Subtitulo </label>
        <input type='text' name='sub' id='' value={serviceId.sub} onChange={handleChange} />
        <label htmlFor='des_1'>Descripcion 1 </label>
        <textarea
          name='des_1'
          id=''
          cols='10'
          rows='10'
          value={serviceId.des_1}
          onChange={handleChange}
        ></textarea>
        <label htmlFor='des_2'>Descripcion 2 </label>
        <textarea
          name='des_2'
          id=''
          cols='10'
          rows='10'
          value={serviceId.des_2}
          onChange={handleChange}
        ></textarea>
        <label htmlFor='des_3'>Descripcion 3</label>
        <textarea
          name='des_3'
          id=''
          cols='10'
          rows='10'
          value={serviceId.des_3}
          onChange={handleChange}
        ></textarea>
        <label htmlFor='img'>Imagen </label>
        <input type='file' name='img' id='img' onChange={handleChange} />
        {/* <img src={serviceId.img} alt='IMAGEN' /> */}
        <button type='submit'>Editar Servicio</button>
        <button type='reset'>Reiniciar</button>
      </form>
    </div>
  );
};
export default EditService;
