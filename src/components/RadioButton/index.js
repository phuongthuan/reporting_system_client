import React from 'react';
import { Form } from 'semantic-ui-react';
import { Emoji } from 'emoji-mart';

const RadioButton = ({
  field: { name, value, onChange },
  id,
  label,
  defaultChecked,
  className,
  ...props
}) => (
  <Form.Radio
    id={id}
    name={name}
    label={(
      // eslint-disable-next-line
      <label htmlFor={id} {...props}>
        <Emoji
          emoji={label}
          size={24}
        />
      </label>
    )}
    value={id}
    checked={id === value}
    className={className}
    onChange={onChange}
    {...props}
  />
);

export default RadioButton;