import React from 'react'
import isEmpty from 'lodash/isEmpty';
import {
  TextError,
  FormGroup,
  FormFieldStyles,
  TextAreaStyles
} from '../../styles/App';

const TextArea = ({
  id,
  label,
  value,
  error,
  onChange,
  className,
  initStates,
  ...props
}) => (
  <FormGroup className={className}>
    {isEmpty(error) ? (
      <FormFieldStyles>
        <TextAreaStyles
          autoHeight
          label={label}
          id={id}
          rows="5"
          cols="30"
          autoComplete="off"
          value={value}
          onChange={onChange}
          {...props}
        />
      </FormFieldStyles>
    ) : (
      <FormFieldStyles>
        <TextAreaStyles
          autoHeight
          error={!!error}
          label={label}
          id={id}
          rows="5"
          cols="30"
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

export default TextArea;