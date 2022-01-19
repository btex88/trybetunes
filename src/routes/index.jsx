import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import * as PP from '../pages';

class Routes extends React.Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={ PP.Login } />
          <Route exact path="/album/:id" component={ PP.Album } />
          <Route exact path="/favorites" component={ PP.Favorites } />
          <Route exact path="/profile" component={ PP.Profile } />
          <Route exact path="/search" component={ PP.Search } />
          <Route path="*" component={ PP.NotFound } />
        </Switch>
      </Router>
    );
  }
}

export default Routes;
