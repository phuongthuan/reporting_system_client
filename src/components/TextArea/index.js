import React, { Fragment } from 'react'
import isEmpty from 'lodash/isEmpty'
import {
  TextAreaStyles,
  TextError,
  FormGroup,
  LabelStyle
} from '../../styles/TextArea';

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
      <Fragment>
        {(label) && (
          <LabelStyle htmlFor={id} {...props}>{label}</LabelStyle>
        )}
        <TextAreaStyles
          id={id}
          rows="5"
          cols="30"
          autoComplete="off"
          value={value}
          onChange={onChange}
          {...props}
        />
      </Fragment>
    ) : (
      <Fragment>
        {(label) && (
          <LabelStyle error={error} htmlFor={id} {...props}>{label}</LabelStyle>
        )}
        <TextAreaStyles
          error={error}
          id={id}
          rows="5"
          cols="30"
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

export default TextArea;