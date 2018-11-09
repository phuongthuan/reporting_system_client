import styled from 'react-emotion';
import { Form } from 'semantic-ui-react';

export const MainWrapper = styled.div`
  display: flex;
`;

export const LeftContent = styled.div`
  width: 15%;
  position: fixed;
`;

export const RightContent = styled.div`
  margin-left: 15%;
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
  width: 900px;
`;

export const TextInputStyles = styled(Form.Input)`
  width: 900px;
`;

export const SpinnerWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: ${props => props.bgColor || '#3a405a'};
`;
