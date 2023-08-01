const CreateService = ({ closeModal, handleSubmit, formData, handleChange }) => {
  return (
    <div className='modal'>
      <h2 onClick={closeModal}>X</h2>

      <form action='' method='POST' encType='multipart/form-data' onSubmit={handleSubmit}>
        <label htmlFor='title'>Titulo </label>
        <input type='text' name='title' id='title' value={formData.title} onChange={handleChange} />
        <label htmlFor='sub'>Subtitulo </label>
        <input type='text' name='sub' id='' value={formData.sub} onChange={handleChange} />
        <label htmlFor='des_1'>Descripcion 1 </label>
        <textarea
          name='des_1'
          id=''
          cols='10'
          rows='10'
          value={formData.des_1}
          onChange={handleChange}
        ></textarea>
        <label htmlFor='des_2'>Descripcion 2 </label>
        <textarea
          name='des_2'
          id=''
          cols='10'
          rows='10'
          value={formData.des_2}
          onChange={handleChange}
        ></textarea>
        <label htmlFor='des_3'>Descripcion 3</label>
        <textarea
          name='des_3'
          id=''
          cols='10'
          rows='10'
          value={formData.des_3}
          onChange={handleChange}
        ></textarea>
        <label htmlFor='img'>Imagen </label>
        <input type='file' name='img' id='img' onChange={handleChange} />
        <button type='submit'>Agregar nuevo Servicio</button>
        <button type='reset'>Reiniciar</button>
      </form>
    </div>
  );
};
export default CreateService;
