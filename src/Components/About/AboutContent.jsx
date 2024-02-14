const AboutContent = ({ info }) => {
  return (
    <div className='about_container'>
      <div className='about_items'>
        <div className='edit'>
          <h1 className='title_about'>{info.title}</h1>
        </div>

        <div>
          <div className='edit'>
            <h2 className='sub_1'>{info.t1}</h2>
          </div>
          <div className='edit'>
            <h2 className='sub_2'>{info.t2}</h2>
          </div>
        </div>
        <div>
          <div className='edit'>
            <p>{info.t3}</p>
          </div>
          <div className='edit'>
            <p>{info.t4}</p>
          </div>
        </div>
        <div className='edit'>
          <p className='text_last'>{info.t5}</p>
        </div>
      </div>
    </div>
  );
};
export default AboutContent;
