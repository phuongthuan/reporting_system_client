import styled, { css } from 'react-emotion';

export const TextInputStyles = styled.input`
  border: 1px solid black;
  display: block;
  width: 100%;
  max-width: 500px;
  padding: 0.3em;
  
  ${props => props.error && css`
    border: 1px solid red;
    -webkit-box-shadow: 0px 0px 6px 3px rgba(248,215,218,1);
    -moz-box-shadow: 0px 0px 6px 3px rgba(248,215,218,1);
    box-shadow: 0px 0px 6px 3px rgba(248,215,218,1);
  `}
`;

export const TextError = styled.small`
  color: red;
  margin-bottom: 1em;
`;

export const LabelStyle = styled.label`
  color: black;
  ${props => props.error && css`
    color: red;
  `}
`;

export const FormGroup = styled.div`
  margin-bottom: 1em;
`;