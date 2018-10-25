import React from 'react';
import './styles.css';

const Spinner = () => (
  <div className="sk-circle">
    {[...Array(12)].map((item, index) => <div className={`sk-circle${index + 1} sk-child`} />)}
  </div>
);

export default Spinner;