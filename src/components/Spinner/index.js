import React from 'react';
import './styles.css';
import uuidv1 from 'uuid/v1';

const Spinner = () => (
  <div className="sk-circle">
    {[...Array(12)].map((item, index) => <div key={uuidv1()} className={`sk-circle${index + 1} sk-child`} />)}
  </div>
);

export default Spinner;