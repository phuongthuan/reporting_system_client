import styled from 'react-emotion';
import {Input} from 'semantic-ui-react';

export const CreateTaskFormWrapper = styled.div`
  width: 100%;
  max-width: 900px;
  margin-bottom: 1em;
`;

export const TaskContainerWrapper = styled.div`
  margin-bottom: 0.5em;
`;

export const TaskItem = styled.div`
  display: flex;
`;

export const SelectProject = styled.select`
  width: 100% !important;
  max-width: 200px !important;
  margin-right: 0.5em;
`;

export const TaskInput = styled(Input)`
  width: 100% !important;
  max-width: ${props => props.width || '500px'} !important;
  margin-right: 0.5em !important;
`;



