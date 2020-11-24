import React from 'react';

function AboutBlockLeft(props) {
  return (
    <div className='about-block'>
      <div className='about-block-desc-left'>
        <h2 className='about-block-header'>{props.title}</h2>
        <p>{props.desc}</p>
        <p>{props.desc2}</p>
      </div>
      <div>
        <img className='about-block-img' alt='' src={props.image} />
      </div>
    </div>
  );
}

export default AboutBlockLeft;
