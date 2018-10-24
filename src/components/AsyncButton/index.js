import React from 'react'
import { AsyncButtonStyles } from '../../styles/AsyncButton';

const AsyncButton = ({ type, onClick, loading, buttonName }) => (
  <AsyncButtonStyles
    disabled={loading}
    type={type}
    onClick={onClick}
  >
    {loading ? 'Sending...' : `${buttonName}`}
  </AsyncButtonStyles>
);

export default AsyncButton;