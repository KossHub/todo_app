import {
  BrowserRouter,
  Redirect,
  Route,
  Switch
} from 'react-router-dom';
import HeaderContainer from './HeaderContainer';
import LifestyleContainer from './lifestyle/LifestyleContainer';
import LogsContainer from './logs/LogsContainer';
import NotesContainer from './notes/NotesContainer';
import ProjectsContainer from './projects/ProjectsContainer';
import React from 'react';
import ServerErrorContainer from './ServerErrorContainer';
import SpinnerContainer from './SpinnerContainer';

export default function MainView() {
  return (
    <BrowserRouter>
      <div className="bg-img">
        <HeaderContainer />
        <SpinnerContainer />
        <ServerErrorContainer />
        <Switch>
          <Redirect exact path="/" to="/logs" />
          <Route component={ProjectsContainer} path="/projects" />
          <Route component={LogsContainer} path="/logs" />
          <Route component={NotesContainer} path="/notes" />
          <Route component={LifestyleContainer} path="/lifestyle" />
        </Switch>
        <div className="footer">2019</div>
      </div>
    </BrowserRouter>
  );
}
