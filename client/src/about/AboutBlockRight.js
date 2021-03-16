import React from 'react';

function AboutBlockRight(props) {
  return (
    <div className='about-block'>
      <div className='about-block-desc-right'>
        <h2 className='about-block-header'>{props.title}</h2>
        <p>{props.desc}</p>
        <img className='about-block-img' alt='' src={props.image} />
      </div>
    </div>
  );
}

export default AboutBlockRight;
