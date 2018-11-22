import React from 'react'
import isEmpty from 'lodash/isEmpty';
import {
  FormGroup,
  FormFieldStyles,
  TextInputStyles,
  TextError
} from '../../styles/App';

const TextInput = ({
  type,
  id,
  label,
  value,
  error,
  onChange,
  ...props
}) => (
  <FormGroup>
    {isEmpty(error) ? (
      <FormFieldStyles>
        <TextInputStyles
          fluid
          label={label}
          type={type}
          autoComplete="off"
          value={value}
          onChange={onChange}
          {...props}
        />
      </FormFieldStyles>
    ) : (
      <FormFieldStyles>
        <TextInputStyles
          fluid
          error={!!error}
          label={label}
          type={type}
          autoComplete="off"
          value={value}
          onChange={onChange}
          {...props}
        />
      </FormFieldStyles>
    )}
    {error && <TextError>{error}</TextError>}
  </FormGroup>
);

export default TextInput;