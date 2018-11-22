import React from 'react';
import './styles.css';
import uuidv1 from 'uuid/v1';

// This is a loader component for page level content loading.
// eg.) Create / Update form, content Listing, statictics...
// For parts level component loading, Use <Loader /> from semantic-ui-react

const Spinner = () => (
  <div className="sk-circle">
    {[...Array(12)].map((item, index) => (
      <div key={uuidv1()} className={`sk-circle${index + 1} sk-child`} />
    ))}
  </div>
);

export default Spinner;
