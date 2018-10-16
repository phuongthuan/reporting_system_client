import React from 'react'
import { AsyncButtonStyles } from '../../styles/AsyncButton';

const AsyncButton = ({ type, onClick, loading }) => (
  <AsyncButtonStyles
    disabled={loading}
    type={type}
    onClick={onClick}
  >
    {loading ? 'Submitting...' : 'Submit'}
  </AsyncButtonStyles>
);

export default AsyncButton;