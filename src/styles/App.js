import styled from 'react-emotion';
import { Form } from 'semantic-ui-react';

export const MainWrapper = styled.div`
  display: flex;
`;

export const LeftContent = styled.div`
  width: 15%;
`;

export const RightContent = styled.div`
  width: 85%;
  padding: 1em;
`;

export const ContentWrapper = styled.div`
  width: 100%;
`;

export const CenterWrapper = styled.div`
  display: flex;
  height: 100vh;
`;

export const FormGroup = styled.div`
  margin-bottom: 1em;
  width: 100%;
  max-width: 1000px;
`;

export const TextError = styled.small`
  color: red;
  margin-bottom: 1em;
`;

export const FormFieldStyles = styled(Form.Field)`
  margin: 0 !important;
`;

export const TextAreaStyles = styled(Form.TextArea)`
  width: 720px;
`;

export const TextInputStyles = styled(Form.Input)`
  width: 720px;
`;