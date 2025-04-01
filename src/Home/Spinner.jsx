import React from 'react';
import Spinner1 from 'react-bootstrap/Spinner';
function Spinner() {
  return (
    <div className='spinner'>
      <Spinner1 animation="grow" variant="primary" />
      <Spinner1 animation="grow" variant="secondary" />
      <Spinner1 animation="grow" variant="success" />
      <Spinner1 animation="grow" variant="danger" />
      <Spinner1 animation="grow" variant="warning" />
    </div>
  )
}
export default Spinner;