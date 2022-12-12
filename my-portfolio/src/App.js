import './App.css';
import HomePage from './pages/HomePage';
import ProjectPage from './pages/ProjectPage';
import NotFoundPage from './pages/NotFoundPage';
import PersonalInformationPage from './pages/PersonalInformationPage';
import ProjectListPage from './pages/ProjectListPage';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import NavBar from './NavBar';
import React from 'react';

function App() {
  return (
    <Router>
      <div className="App">
        <NavBar />
        <div id="page-body">
          <Switch>
            <Route path="/" exact component={HomePage} />
            <Route path="/personalinformation" component={PersonalInformationPage} />
            <Route path="/projects" exact component={ProjectListPage} />
            <Route path="/projects/:name" component={ProjectPage} />
            <Route component={NotFoundPage} />
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
