import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';

import Home from './Home';
import Journal from './Journal';
import Nav from './Nav';

class App extends React.Component {
  render() {
    return (
      <div>
        <Router>
          <Nav />
          <Route exact path="/" component={Home} />
          <Route path="/journal" component={Journal} />
        </Router>
      </div>
    )
  }
}

export default App;
