import React from 'react'
import isEmpty from 'lodash/isEmpty'
import {
  TextError,
  FormGroup,
  FormFieldStyles,
  TextInputStyles
} from '../../styles/App';

const TextInput = ({
  type,
  id,
  label,
  value,
  defaultValue,
  error,
  onChange,
  className,
  required,
  initStates,
  ...props
}) => (
  <FormGroup className={className}>
    {isEmpty(error) ? (
      <FormFieldStyles>
        <TextInputStyles
          fluid
          size="small"
          label={label}
          type={type}
          autoComplete="off"
          value={value}
          defaultValue={defaultValue}
          onChange={onChange}
          {...props}
        />
      </FormFieldStyles>
    ) : (
      <FormFieldStyles>
        <TextInputStyles
          fluid
          error={!!error}
          size="small"
          label={label}
          type={type}
          autoComplete="off"
          value={value}
          defaultValue={defaultValue}
          onChange={onChange}
          {...props}
        />
      </FormFieldStyles>
    )}
    {error && <TextError>{error}</TextError>}
  </FormGroup>
);

export default TextInput;