import React from 'react';
import { Route, Switch } from 'react-router-dom';
import SideBar from 'components/SideBar';
import CreateProjectContainer from './CreateProjectContainer';
import NoMatch from '../../utils/NoMatch';
import { MainWrapper, RightContent, LeftContent } from '../../styles/App';

const ProjectPage = ({ match }) => (
  <MainWrapper>
    <LeftContent>
      <SideBar />
    </LeftContent>
    <RightContent>
      <Switch>
        <Route exact path={`${match.path}/new`} component={CreateProjectContainer} />
        <Route component={NoMatch} />
      </Switch>
    </RightContent>
  </MainWrapper>
);

export default ProjectPage;
