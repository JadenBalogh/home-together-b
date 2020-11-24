import React from 'react';

function AboutBlockRight(props) {
  return (
    <div className='about-block'>
      <div>
        <img className='about-block-img' alt='' src={props.image} />
      </div>
      <div className='about-block-desc-right'>
        <h2 className='about-block-header'>{props.title}</h2>
        <p>{props.desc}</p>
      </div>
    </div>
  );
}

export default AboutBlockRight;
