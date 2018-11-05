import React from 'react';
import { Message, Icon } from 'semantic-ui-react';

const ErrorMessage = ({ error }) => (
  <Message
    error={!!error}
    header='Error'
  >
    <Icon name='bug' />
    {error.message}
  </Message>
);

export default ErrorMessage;