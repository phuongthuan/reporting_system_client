import React, { Fragment } from 'react';
import { Form } from 'semantic-ui-react';
import { TextError } from '../../styles/App';

const RadioInput = ({
  id,
  label,
  children,
  error,
  touched
}) => (
  <Fragment>
    <Form.Group inline>
      <label htmlFor={id}>{label}</label>
      {children}
    </Form.Group>
    {touched && <TextError>{error}</TextError>}
  </Fragment>
);

export default RadioInput;