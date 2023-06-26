import React from 'react';
import loading from './Image/Spinner-1s-264px.gif'

const Spinner=()=> {
    return (
      <div className='text-center'>
        <img src={loading} alt="loading" />
      </div>
    )
  }

export default Spinner