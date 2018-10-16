import React, { Fragment } from 'react'
import isEmpty from 'lodash/isEmpty'
import {
  TextInputStyles,
  TextError,
  FormGroup,
  LabelStyle
} from '../../styles/TextInput';

const TextInput = ({
  type,
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
      <Fragment>
        {(label) && (
          <LabelStyle
            htmlFor={id}
            {...props}
          >
            {label}
          </LabelStyle>
        )}
        <TextInputStyles
          type={type}
          autoComplete="off"
          value={value}
          onChange={onChange}
          {...props}
        />
      </Fragment>
    ) : (
      <Fragment>
        {(label) && (
          <LabelStyle
            error={error}
            htmlFor={id}
            {...props}
          >
            {label}
          </LabelStyle>
        )}
        <TextInputStyles
          error={error}
          type={type}
          autoComplete="off"
          value={value}
          onChange={onChange}
          {...props}
        />
      </Fragment>
    )}
    {error && <TextError>{error}</TextError>}
  </FormGroup>
);

export default TextInput;